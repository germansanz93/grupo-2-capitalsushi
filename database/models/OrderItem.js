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

  return OrderItem;
}