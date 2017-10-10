/* jshint indent: 2 */

module.exports = function(sequelize, DataTypes) {
  return sequelize.define('NewcastleX-SWL101x-1T2017-auth_userprofile-prod-analytics', {
    id: {
      type: DataTypes.INTEGER,
      allowNull: true
    },
    user_id: {
      type: DataTypes.INTEGER,
      allowNull: true
    },
    name: {
      type: DataTypes.TEXT,
      allowNull: true
    },
    language: {
      type: DataTypes.TEXT,
      allowNull: true
    },
    location: {
      type: DataTypes.TEXT,
      allowNull: true
    },
    meta: {
      type: DataTypes.TEXT,
      allowNull: true
    },
    courseware: {
      type: DataTypes.TEXT,
      allowNull: true
    },
    gender: {
      type: DataTypes.TEXT,
      allowNull: true
    },
    mailing_address: {
      type: DataTypes.TEXT,
      allowNull: true
    },
    year_of_birth: {
      type: DataTypes.TEXT,
      allowNull: true
    },
    level_of_education: {
      type: DataTypes.TEXT,
      allowNull: true
    },
    goals: {
      type: DataTypes.TEXT,
      allowNull: true
    },
    allow_certificate: {
      type: DataTypes.TEXT,
      allowNull: true
    },
    country: {
      type: DataTypes.TEXT,
      allowNull: true
    },
    city: {
      type: DataTypes.TEXT,
      allowNull: true
    },
    bio: {
      type: DataTypes.TEXT,
      allowNull: true
    },
    profile_image_uploaded_at: {
      type: DataTypes.TEXT,
      allowNull: true
    }
  }, {
    tableName: 'NewcastleX-SWL101x-1T2017-auth_userprofile-prod-analytics'
  });
};
