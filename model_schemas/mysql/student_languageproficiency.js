/* jshint indent: 2 */

module.exports = function(sequelize, DataTypes) {
  return sequelize.define('student_languageproficiency', {
    id: {
      type: DataTypes.INTEGER,
      allowNull: true,
      primaryKey: true
    },
    user_profile_id: {
      type: DataTypes.INTEGER,
      allowNull: true
    },
    code: {
      type: DataTypes.TEXT,
      allowNull: true
    },

  },
  {
    timestamps: false,
    paranoid: false,
    freezeTableName: true,
    tableName: 'student_languageproficiency'
  });
};
