/* jshint indent: 2 */

module.exports = function(sequelize, DataTypes) {
  return sequelize.define('NewcastleX-NHI101x-3T2016-student_languageproficiency-prod-analytics', {
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
    tableName: 'NewcastleX-NHI101x-3T2016-student_languageproficiency-prod-analytics'
  });
};
