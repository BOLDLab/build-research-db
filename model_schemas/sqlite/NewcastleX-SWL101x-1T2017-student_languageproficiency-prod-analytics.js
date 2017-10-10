/* jshint indent: 2 */

module.exports = function(sequelize, DataTypes) {
  return sequelize.define('NewcastleX-SWL101x-1T2017-student_languageproficiency-prod-analytics', {
    id: {
      type: DataTypes.INTEGER,
      allowNull: true
    },
    user_profile_id: {
      type: DataTypes.INTEGER,
      allowNull: true
    },
    code: {
      type: DataTypes.TEXT,
      allowNull: true
    }
  }, {
    tableName: 'NewcastleX-SWL101x-1T2017-student_languageproficiency-prod-analytics'
  });
};
