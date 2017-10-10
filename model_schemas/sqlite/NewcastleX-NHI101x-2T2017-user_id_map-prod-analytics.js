/* jshint indent: 2 */

module.exports = function(sequelize, DataTypes) {
  return sequelize.define('NewcastleX-NHI101x-2T2017-user_id_map-prod-analytics', {
    hash_id: {
      type: DataTypes.TEXT,
      allowNull: true
    },
    id: {
      type: DataTypes.INTEGER,
      allowNull: true
    },
    username: {
      type: DataTypes.TEXT,
      allowNull: true
    }
  }, {
    tableName: 'NewcastleX-NHI101x-2T2017-user_id_map-prod-analytics'
  });
};
