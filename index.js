const sequelize = require('sequelize');
const config = require('./config.js');
const fs = require('fs');
const models_manager = require('./src/load-models.js');
const result_handler = require('./src/result-handler.js');
const log_update = require('log-update');
const clui = require('clui');

const sqlite_orm = new sequelize('newcastlex_research.db', '', '', {
  dialect: 'sqlite',
  storage: './db/newcastlex_research.db',
  operatorsAliases: false,
  logging: false
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
  operatorsAliases: false,
  logging: false
});

const Progress = clui.Progress;
const _progress = {};

const chunkSize = 1000;
let prevPointer = 0;
let outputStr = "";
let startStr = 0, endStr = 0;
const processChunk = function(result, pointer, _model, mysql_model, model_list, transaction) {
  const chunk = result.collection.slice(prevPointer, pointer);



  mysql_model.bulkCreate(chunk, {
      updateOnDuplicate: true,
      logging: false,
      transaction: transaction
  }).then((response) => {

    if (result.collection.length > (pointer + chunkSize)) {
          pointer = pointer + chunkSize + 1;
    } else {
          pointer = result.collection.length;
    }

    outputStr = outputStr.replace(/Processing [\[0-9 to\]]+/, "Processing ["+(prevPointer-1) + " to " + pointer +"]");

    if (pointer > prevPointer) {
        log_update(outputStr + "\n\n" + _progress[_model['key']].update(prevPointer / result.collection.length));
        processChunk(result, pointer, _model, mysql_model, model_list, transaction);
    } else {
        outputStr = "\n\n----------\n\nTransfer to MySQL table " + result.path + " complete.\nSQLite tables remaining: " + String(Number(model_list.length)+"\n");
        prevPointer = 0;
        _process_table_records(model_list);
    }
  }).catch((err) => {
    console.error("ERROR on model " + _model['key']);
    console.error(err);
    process.exit(1);
  });

  prevPointer = pointer;
}

const process_sqlite_tables = (result, _model, model_list) => {
  const length = result.length;

  result_handler.map_to_mysql(result, mysql_orm, _model['key'], _model,
    (result) => {
        const t = null;
        const collection = [];

        const inc = result.collection.length > 1000 ? 1000 : result.collection.length;

        const path = result.path;

        let len = result.collection.length;
        let pointer = 1000;

        if (result.count == 0) {
          //console.log("SQLite table is empty.");
          _process_table_records(model_list);
          return;
        }

        outputStr += length + " records to be transferred\n";
        outputStr += "Cleaned length: " + result.count + "\n";

        if (!fs.existsSync(path)) {
          console.log(path + "does not exist.");
          return false;
        }

        const mysql_model_base = require(path);
        const mysql_model = mysql_model_base(mysql_orm, sequelize.DataTypes);

        _progress[_model.key] = new Progress(60);
        outputStr += "Processing ["+prevPointer + " to " + pointer +"]\n";

        processChunk(result, pointer, _model, mysql_model, model_list, t);
    });
};

const _process_table_records = function(model_list) {

  let _model = model_list.pop();

  if (typeof _model === 'undefined') {
    outputStr += "Processing complete\n";
    process.exit(0);
    return false;
  }

  _model['fn'](sqlite_orm, sequelize.DataTypes)
    .findAll().then((result) => {
      process_sqlite_tables(result, _model, model_list);
    });
};

sqlite_orm.authenticate().then(() => {

  models_manager.load_sqlite_models((model_list) => {

    mysql_orm.authenticate().then(() => {

      result_handler.init_courses(() => {
        _process_table_records(model_list);
      }, mysql_orm);

    }).catch(err => {
      console.error('Unable to connect to the mySQL database:', err);
      process.exit(1);
    });
  });
}).catch(err => {
  console.error('Unable to connect to the SQLite database:', err);
  process.exit(1);
});
