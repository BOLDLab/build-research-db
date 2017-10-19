const fs = require('fs');
const sequelize = require('sequelize');

module.exports = {
    sqlite_folder: "../model_schemas/sqlite/",
    mysql_folder: "../model_schemas/mysql/",
    mysql_models: [],
    sqlite_models: [],
    load_sqlite_models: function(callback)  {
        fs.readdir(
            this.sqlite_folder, (err, files) => {
              files.forEach((file, i) => {
                    const a = file.split('.');
                    const table_name = a[0];

                    this.sqlite_models[i] = { key: table_name, fn: require(this.sqlite_folder+file) };
                })
                  callback(this.sqlite_models);
              }
        );
    },
    load_mysql_models: function() {
      fs.readdir(
          this.mysql_folder, (err, files) => {
            files.forEach(file => {
                  const a = file.split('.');
                  const table_name = a[0];

                  this.mysql_models[table_name] = require(this.mysql_folder+file);
              });
          }
      );
    }
}
