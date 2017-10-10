/* jshint indent: 2 */

module.exports = function(sequelize, DataTypes) {
  return sequelize.define('student_courseenrollment', {
    id: {
      type: DataTypes.INTEGER,
      allowNull: true
    },
    user_id: {
      type: DataTypes.INTEGER,
      allowNull: true
    },
    course_id: {
      type: DataTypes.TEXT,
      allowNull: true
    },
    created: {
      type: DataTypes.TEXT,
      allowNull: true
    },
    is_active: {
      type: DataTypes.INTEGER,
      allowNull: true
    },
    mode: {
      type: DataTypes.TEXT,
      allowNull: true
    }
    },
    {
      freezeTableName: true,
      tableName:'student_courseenrollment'
    }
  );
};
