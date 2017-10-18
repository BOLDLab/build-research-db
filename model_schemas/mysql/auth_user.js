/* jshint indent: 2 */

module.exports = function(sequelize, DataTypes) {
  return sequelize.define('auth_user', {
    id: {
      type: DataTypes.STRING(16),
      allowNull: true,
      primaryKey: true
    },
    course_id: {
      type: DataTypes.STRING(80),
      allowNull: false,
    },
    username: {
      type: DataTypes.STRING(40),
      allowNull: true
    },
    first_name: {
      type: DataTypes.STRING(26),
      allowNull: true
    },
    last_name: {
      type: DataTypes.STRING(36),
      allowNull: true
    },
    email: {
      type: DataTypes.STRING(70),
      allowNull: true
    },
    password: {
      type: DataTypes.STRING(255),
      allowNull: false
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
      type: DataTypes.STRING(52),
      allowNull: true
    },
    date_joined: {
      type: DataTypes.STRING(38),
      allowNull: true
    },
    status: {
      type: DataTypes.STRING(255),
      allowNull: false
    },
    email_key: {
      type: DataTypes.STRING(255),
      allowNull: true
    },
    avatar_type: {
      type: DataTypes.STRING(255),
      allowNull: true
    },
    country: {
      type: DataTypes.STRING(255),
      allowNull: true
    },
    show_country: {
      type: DataTypes.INTEGER,
      allowNull: true
    },
    date_of_birth: {
      type: DataTypes.STRING(255),
      allowNull: true
    },
    interesting_tags: {
      type: DataTypes.STRING(255),
      allowNull: true
    },
    ignored_tags: {
      type: DataTypes.STRING(255),
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
    timestamps: false,
    paranoid: false,
      freezeTableName: true,
    tableName: 'auth_user'
  });
};
