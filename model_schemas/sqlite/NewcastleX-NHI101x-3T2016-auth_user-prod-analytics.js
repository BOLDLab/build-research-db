/* jshint indent: 2 */

module.exports = function(sequelize, DataTypes) {
  return sequelize.define('NewcastleX-NHI101x-3T2016-auth_user-prod-analytics', {
    id: {
      type: DataTypes.INTEGER,
      allowNull: true
    },
    username: {
      type: DataTypes.TEXT,
      allowNull: true
    },
    first_name: {
      type: DataTypes.TEXT,
      allowNull: true
    },
    last_name: {
      type: DataTypes.TEXT,
      allowNull: true
    },
    email: {
      type: DataTypes.TEXT,
      allowNull: true
    },
    password: {
      type: DataTypes.TEXT,
      allowNull: true
    },
    is_staff: {
      type: DataTypes.INTEGER,
      allowNull: true
    },
    is_active: {
      type: DataTypes.INTEGER,
      allowNull: true
    },
    is_superuser: {
      type: DataTypes.INTEGER,
      allowNull: true
    },
    last_login: {
      type: DataTypes.TEXT,
      allowNull: true
    },
    date_joined: {
      type: DataTypes.TEXT,
      allowNull: true
    },
    status: {
      type: DataTypes.TEXT,
      allowNull: true
    },
    email_key: {
      type: DataTypes.TEXT,
      allowNull: true
    },
    avatar_type: {
      type: DataTypes.TEXT,
      allowNull: true
    },
    country: {
      type: DataTypes.TEXT,
      allowNull: true
    },
    show_country: {
      type: DataTypes.INTEGER,
      allowNull: true
    },
    date_of_birth: {
      type: DataTypes.TEXT,
      allowNull: true
    },
    interesting_tags: {
      type: DataTypes.TEXT,
      allowNull: true
    },
    ignored_tags: {
      type: DataTypes.TEXT,
      allowNull: true
    },
    email_tag_filter_strategy: {
      type: DataTypes.INTEGER,
      allowNull: true
    },
    display_tag_filter_strategy: {
      type: DataTypes.INTEGER,
      allowNull: true
    },
    consecutive_days_visit_count: {
      type: DataTypes.INTEGER,
      allowNull: true
    }
  }, {
    tableName: 'NewcastleX-NHI101x-3T2016-auth_user-prod-analytics'
  });
};
