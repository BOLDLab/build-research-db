/* jshint indent: 2 */

module.exports = function(sequelize, DataTypes) {
  return sequelize.define('courses', {
        id: {
          type: DataTypes.STRING(255),
          allowNull: false,
          primaryKey: true
        },
        offering: {
          type: DataTypes.INTEGER(4),
          allowNull: true
        },
        code: {
          type: DataTypes.STRING(20),
          allowNull: true
        },
        title: {
          type: DataTypes.STRING(255),
          allowNull: true
        },
        term: {
          type: DataTypes.STRING(200),
          allowNull: true
        },
        startDate: {
          type: DataTypes.DATE,
          allowNull: true
        },
        endDate: {
          type: DataTypes.DATE,
          allowNull: true
        }
    },
    {
      timestamps: false,
      paranoid: false,
        freezeTableName: true,
        tableName: 'courses'
    });
};
