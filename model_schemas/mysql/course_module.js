/* jshint indent: 2 */

module.exports = function(sequelize, DataTypes) {
  return sequelize.define('course_module', {
        id: {
          type: DataTypes.STRING(255),
          allowNull: false,
          primaryKey: true
        },
        category: {
          type: DataTypes.STRING(255),
          allowNull: true
        },
        display_name: {
          type: DataTypes.STRING(255),
          allowNull: true
        },
        start_date: {
          type: DataTypes.DATEONLY,
          allowNull: true
        },
        end_date: {
          type: DataTypes.DATEONLY,
          allowNull: true
        },
        due_date: {
          type: DataTypes.DATEONLY,
          allowNull: true
        },
        format: {
          type: DataTypes.STRING(255),
          allowNull: true
        },
        parent_course_module_id: {
          type: DataTypes.STRING(255),
          allowNull: false,
        }
    },
    {
      timestamps: false,
      paranoid: false,
        freezeTableName: true,
        tableName: 'course_module'
    });
};
