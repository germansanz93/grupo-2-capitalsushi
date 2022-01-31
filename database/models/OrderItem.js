module.exports = (sequelize, DataTypes) => {

  const OrderItem = sequelize.define(
    'OrderItem',
    {
      id: {
        type: DataTypes.STRING,
        primaryKey: true,
      },
      order_id: {
        type: DataTypes.STRING,
        allowNull: false,
        foreignKey: true
      },
      product_id: {
        type: DataTypes.STRING,
        allowNull: false,
        foreignKey: true
      },
      qty: {
        type: DataTypes.STRING,
        allowNull: false
      }
    },
    {
      timestamps: false,
      tableName: 'order_item'
    }
  )

  OrderItem.associate = function(models){
    OrderItem.belongsTo(models.Product, {
      as: "product",
      foreignKey: "product_id"
    })
    OrderItem.belongsTo(models.OrderList, {
      as: "order_list",
      foreignKey: "order_id"
    })
  }

  return OrderItem;
}