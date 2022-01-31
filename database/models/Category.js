module.exports = (sequelize, DataTypes) => {

  const Category = sequelize.define(
    'Category',
    {
      id: {
        type: DataTypes.STRING,
        primaryKey: true
      },
      cat_name: {
        type: DataTypes.STRING,
        allowNull: false
      }
    },
    {
      timestamps: false,
      tableName: 'category'
    }
  )

  Category.associate = function(models){
    Category.hasMany(models.Product, {
      as: "products",
      foreignKey: "category_id"
    })
  }
  
  return Category;
}