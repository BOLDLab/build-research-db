/* jshint indent: 2 */

module.exports = function(sequelize, DataTypes) {
  return sequelize.define('user_id_map', {
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
    },
    {
        freezeTableName: true,
        tableName: 'user_id_map'
    });
};
