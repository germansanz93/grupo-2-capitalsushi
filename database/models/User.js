module.exports = (sequelize, DataTypes) => {

  const User = sequelize.define(
    'User',
    {
      id: {
        type: DataTypes.STRING,
        primaryKey: true,
      },
      role_id: {
        type: DataTypes.STRING,
        allowNull: false,
        foreignKey: true,
        defaultValue: 2
      },
      name: {
        type: DataTypes.STRING,
        allowNull: false
      },
      last_name: {
        type: DataTypes.STRING,
        allowNull: false
      },
      address: {
        type: DataTypes.STRING,
        allowNull: false
      },
      email: {
        type: DataTypes.STRING,
        allowNull: false
      },
      phone: {
        type: DataTypes.STRING,
        allowNull: false
      },
      password: {
        type: DataTypes.STRING,
        allowNull: false
      },
      profile_pic: {
        type: DataTypes.STRING,
        allowNull: false
      }
    },
    {
      timestamps: false,
      tableName: 'user'
    }
  )

  User.associate = function(models){
    User.hasMany(models.OrderList, {
      as: "orders",
      foreignKey: "user_id"
    }),
    User.belongsTo(models.UserRole, {
      as: "role",
      foreignKey: "role_id"
    })
  }

  return User;
}