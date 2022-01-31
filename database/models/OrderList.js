module.exports = (sequelize, DataTypes) => {

  const OrderList = sequelize.define(
    'OrderList',
    {
      id: {
        type: DataTypes.STRING,
        primaryKey: true,
      },
      user_id: {
        type: DataTypes.STRING,
        allowNull: false,
        foreignKey: true
      }
    },
    {
      timestamps: false,
      tableName: 'order_list'
    }
  )

  OrderList.associate = function(models){
    OrderList.hasMany(models.OrderItem, {
      as: "order_items",
      foreignKey: "order_id"
    }),
    OrderList.belongsTo(models.User, {
      as: "user",
      foreignKey: "user_id"
    })
  }

  return OrderList;
}