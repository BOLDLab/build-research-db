const sequelize = require('sequelize');
const fs = require('fs');

const isDate = function(date) {
    return (new Date(date) !== "Invalid Date") && !isNaN(new Date(date));
};

const column_base = {
      type: sequelize.DataTypes.TEXT,
      allowNull: true
};

const _courses = [];

const path = "../model_schemas/mysql/courses.js";

module.exports = {
      model_base: {
        id: {
          type: sequelize.DataTypes.INTEGER,
          allowNull: false,
          primaryKey: true
        }
      },
      init_courses: (callback, mysql_orm) => {
          const courses = require(path);
          const courses_model = courses(mysql_orm, sequelize.DataTypes);

            courses_model.findAll().then(result => {
                result.forEach((v) => {
                    _courses.push(v.id);
                    console.log(courses);
                });
                callback();
            });
      },
      create_course: (entry, courses_model) => {
        courses_model.create(entry, {updateOnDuplicate: true, logging: false})
        .then((result)=> {
            console.log("Course entered");
        }).catch((err) => {
            console.error(err);
            process.exit();
        });
      },
      ifIdUniqueDo: (id, callback) => {
            if(!_courses.includes(id)) {
                callback();
            } else {
                console.log("+++ Course "+id+" exists already.");
                return false;
            }
      },
      map_to_mysql: (result, mysql_orm, sqlite_table, parent_model, callback) => {
          let model = Object.assign({}, this.model_base);
          const collection = [];
          const keys_used = [];
          console.log("Consolidating "+sqlite_table+" to MySQL...")

          const a = sqlite_table.split('_');
          let course_id = "course-v1:"+a[0]+"+"+a[1]+"+"+a[2];
          course_id = course_id.toLowerCase();

          let mysql_table = sqlite_table.replace(a[0]+"_"+a[1]+"_"+a[2]+"_", '');
          mysql_table = mysql_table.replace("_prod", '');

          let courses = require(path);
          let courses_model = courses(mysql_orm, sequelize.DataTypes);

          module.exports.ifIdUniqueDo(course_id, () => {
                  console.log("Creating course entry for "+course_id);
                  _courses.push(course_id);
                  module.exports.create_course({
                        id: course_id,
                        code: a[1],
                        term: a[2]
                  }, courses_model);
          });

          const tb_path = './model_schemas/mysql/'+mysql_table + '.js';

          console.log("Processing for "+course_id);
          console.log("MYSQL table: "+mysql_table);

          console.log("RES LENGTH: "+result.length);
        //  let count = 0;
          result.forEach((val) =>
              {
                const fields = {};
                let uid = null;

                const record = val.dataValues;

                    Object.keys(record).forEach((_i_key) =>
                      {
                        if(_i_key != "primKey") {
                              fields[_i_key] = record[_i_key];
                        }
                        if(_i_key == "id") {
                            if(! record[_i_key] || record[_i_key].toLowerCase().trim() == 'null' || String(record[_i_key]).trim() == '0') {
                              console.log("Removing non-UID'd record ");
                              console.log(record);
                            //  bad_record = true;
                            } else {
                              uid = record[_i_key];
                            }

                        }
                      }
                    );

                  fields['course_id'] = course_id;

                  if(uid) {
                    if(fields.id && !(uid in keys_used)) {
                        collection.push(fields);
                        keys_used.push(uid);
                    }
                  }
              }
          );

          const obj = {
              collection: collection,
              path: tb_path,
              count: keys_used.length
          }

          callback(obj);
      }
};
