const Sequelize = require('sequelize');
const config = require('./config.js');

const sqlite_db = new Sequelize('test.db', '', '', {
  dialect: 'sqlite',
  storage: 'db/test.db'
});

sqlite_db.authenticate().then(() => {
    console.log('Connection to sqlite file has been established successfully.');
  })
  .catch(err => {
    console.error('Unable to connect to the database:', err);
});

const mysql_db = new Sequelize('edx_research', 'edx_research', 'wN4Q5m2a', {
                        host: config.mysql_host,
                        port: config.mysql_port ? config.mysql_port : 3306,
                        dialect: 'mysql',
                        pool: { maxConnections: 5, maxIdleTime: 30}
                  }
                );

mysql_db.authenticate().then(() => {
    console.log('Connection to remote MySQL server has been established successfully.');
  })
  .catch(err => {
    console.error('Unable to connect to the database:', err);
});
