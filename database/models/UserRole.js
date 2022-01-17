module.exports = (sequelize, DataTypes) => {

  const UserRole = sequelize.define(
    'UserRole',
    {
      id: {
        type: DataTypes.STRING,
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

  return UserRole;
}