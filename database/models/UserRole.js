module.exports = (sequelize, DataTypes) => {

  const UserRole = sequelize.define(
    'UserRole',
    {
      id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
      },
      name: {
        type: DataTypes.STRING,
        allowNull: false
      }
    },
    {
      timestamps: false,
      tableName: 'user_role'
    }
  )

  UserRole.associate = function(models){
    UserRole.hasMany(models.User, {
      as: "users",
      foreignKey: "role_id"
    })
  }

  return UserRole;
}