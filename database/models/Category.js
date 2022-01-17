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

  return Category;
}