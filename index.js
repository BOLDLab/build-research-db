const sequelize = require('sequelize');
const config = require('./config.js');
const fs = require('fs');
const models_manager = require('./src/load-models.js')
const result_handler = require('./src/result-handler.js');

const sqlite_orm = new sequelize('newcastlex_research.db', '', '', {
  dialect: 'sqlite',
  storage: './db/newcastlex_research.db',
  operatorsAliases: false
});
const mysql_orm = new sequelize('edx_research', 'edx_research', 'wN4Q5m2a', {
  host: config.mysql_host,
  port: config.mysql_port ? config.mysql_port : 3306,
  dialect: 'mysql',
  pool: {
    max: 5,
    min: 1,
    idle: 30,
    //acquire: 0
  },
  operatorsAliases: false
});

const chunkSize = 1000;
let prevPointer = 0;

const processChunk = function(result, pointer, _model, mysql_model, model_list) {
const chunk = result.collection.slice(prevPointer, pointer);


console.log("Records "+pointer);
      mysql_orm.transaction(transaction => {
            mysql_model.bulkCreate(chunk, {
            updateOnDuplicate: true,
            logging: false,
            //  transaction: transaction
            }).then((response) => {
              console.log("Transfer to MySQL table " + result.path + " complete.");
              console.log("Tables remaining: " + String(Number(model_list.length)));

            }).catch((err) => {
                console.log("ERROR on model " + _model['key']);
                console.log(Object.keys(err));
                console.log(err.sql.substring(0, 1024));
                console.log(".....");
                console.log(err.sql.substring(err.sql.length-1024, err.sql.length));
            });
          }).then(response => {
            console.log("Transaction committed");

             if(result.collection.length > (pointer + chunkSize)) {
                   pointer = pointer + chunkSize + 1;
             } else {
                 pointer = result.collection.length;
             }

            if(pointer > prevPointer) {
                console.log("Processing records from "+prevPointer+" to "+pointer);

                processChunk(result, pointer, _model, mysql_model, model_list);

            }
            else {
              prevPointer = 0;
              _process_table_records(model_list);
            }

        }).catch(commit => {
              console.log("Commit failed");
            //  console.log(commit);
        });
        prevPointer = pointer;
}

const process_sqlite_tables = (result, _model, model_list) => {
    const length = result.length;

    result_handler.map_to_mysql(result, mysql_orm, _model['key'], _model,
    (result) => {
      const collection = [];

      const inc = result.collection.length > 1000 ? 1000 : result.collection.length;

      const path = result.path;

      let len = result.collection.length;
      let pointer = 1000;

      if (result.count == 0) {
        console.log("SQLite table is empty.");
        _process_table_records(model_list);
        return;
      }

      console.log(length + " records to be transferred");
      console.log("Filtered length: " + result.count);

      if (!fs.existsSync(path)) {
        console.log(path+ "does not exist.");
        return false;
      }

      const mysql_model_base = require(path);
      const mysql_model = mysql_model_base(mysql_orm, sequelize.DataTypes);

      console.log("Starting at "+prevPointer);
      processChunk(result, pointer, _model, mysql_model, model_list);
    });
};

const _process_table_records = function(model_list) {

  let _model = model_list.pop();

  if (typeof _model === 'undefined') {
    console.log("Processing complete");
    process.exit(0);
    return false;
  }

  _model['fn'](sqlite_orm, sequelize.DataTypes)
    .findAll().then((result) => {
        process_sqlite_tables(result, _model, model_list);
    });
};

sqlite_orm.authenticate().then(() => {
  console.log('Connection to sqlite file has been established successfully.');

  models_manager.load_sqlite_models((model_list) => {

    mysql_orm.authenticate().then(() => {

        console.log('Connection to MySQL server has been established successfully.');

        result_handler.init_courses(() => {
        //const ml_len = model_list.length;
        //let ml_count = 0;

        _process_table_records(model_list);

        } , mysql_orm);

        }).catch(err => {
          console.error('Unable to connect to the database:', err);
        });
    });
}).catch(err => {
  console.error('Unable to connect to the database:', err);
});
