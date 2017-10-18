/* jshint indent: 2 */

module.exports = function(sequelize, DataTypes) {
  return sequelize.define('student_courseenrollment', {
    id: {
      type: DataTypes.STRING(16),
      allowNull: true,
      primaryKey: true
    },
    user_id: {
      type: DataTypes.STRING(16),
      allowNull: true
    },
    course_id: {
      type: DataTypes.STRING(70),
      allowNull: true
    },
    created: {
      type: DataTypes.STRING(38),
      allowNull: true
    },
    is_active: {
      type: DataTypes.INTEGER,
      allowNull: true
    },
    mode: {
      type: DataTypes.STRING(16),
      allowNull: true
    }
    },
    {
      timestamps: false,
      paranoid: false,
      freezeTableName: true,
      tableName:'student_courseenrollment'
    }
  );
};
