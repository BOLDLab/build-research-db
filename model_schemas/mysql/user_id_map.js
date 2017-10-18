/* jshint indent: 2 */

module.exports = function(sequelize, DataTypes) {
  return sequelize.define('user_id_map', {
        hash_id: {
          type: DataTypes.TEXT,
          allowNull: true
        },
        id: {
          type: DataTypes.INTEGER,
          allowNull: true,
          primaryKey: true
        },
        username: {
          type: DataTypes.TEXT,
          allowNull: true
        },
        course_id: {
          type: DataTypes.TEXT,
          allowNull: true
        },
    },
    {
      timestamps: false,
      paranoid: false,
        freezeTableName: true,
        tableName: 'user_id_map'
    });
};
