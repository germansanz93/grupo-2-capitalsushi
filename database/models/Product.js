module.exports = (sequelize, DataTypes) => {

  const Product = sequelize.define(
    'Product',
    {
      id: {
        type: DataTypes.STRING,
        primaryKey: true,
      },
      title: {
        type: DataTypes.STRING,
        allowNull: false
      },
      category_id: {
        type: DataTypes.STRING,
        allowNull: false,
        foreignKey: true
      },
      prod_description: {
        type: DataTypes.STRING
      },
      picture: {
        type: DataTypes.STRING
      },
      price: {
        type: DataTypes.DOUBLE,
        allowNull: false
      }
    },
    {
      timestamps: false,
      tableName: 'product'
    }
  )

  Product.associate = function(models){
    Product.belongsTo(models.Category, {
      as: "category",
      foreignKey: "category_id"
    }),
    Product.hasMany(models.OrderItem, {
      as: "orderItems",
      foreignKey: "product_id"
    })
  }

  return Product;
}