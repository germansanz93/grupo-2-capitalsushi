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

  return OrderList;
}