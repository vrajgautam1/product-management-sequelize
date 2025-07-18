module.exports = (sequelize, DataTypes) => {
  const Product = sequelize.define("Product", {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
      allowNull: false
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false
    },
    description: {
      type: DataTypes.STRING,
      allowNull: true
    },
    price: {
      type: DataTypes.FLOAT,
      allowNull: false
    },
    quantity: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    categoryId: {
      type: DataTypes.INTEGER,
      allowNull: false
    }
  }, {
    timestamps: false
  });

  // 🔁 Association
  Product.associate = (models) => {
    Product.belongsTo(models.Category, {
      foreignKey: "categoryId",
      onDelete: "CASCADE"
    });
  };

  return Product;
};


// Product.belongsToMany(models.ingredients, {
//   onDelete: "CASCADE",
//   onUpdate: "",
//   through: "ingredients", 
//   foreignKey: "productId",
// })

// ingredients.belongsToMany(models.Product, {
//   onDelete: "CASCADE",
//   onUpdate: "",
//   through: "Products", 
//   foreignKey: "ingredientId",
// })

// User.associate = (models)=>{
//   User.hasMany(models.post, {
//     primaryKey: "userId",
//     as: "articles"
//   })
// }

// post.associate = (models) =>{
//   post.belongsTo(models.User,{
//     foreignKey: "postId",
//     as: "authon"
//   })
// }

// const user = await user.findOne(
// {
//   where: {email},
//   include: [{model: Post, as: articles}]
// }
// )