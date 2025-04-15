const { Sequelize } = require("sequelize");
const path = require("path");

const sequelize = new Sequelize({
  dialect: "sqlite",
  storage: path.join(__dirname, "../database.sqlite"),
  logging: false,
});

const User = require("./User")(sequelize);
const Category = require("./Category")(sequelize);
const Product = require("./Product")(sequelize);
const Cart = require("./Cart")(sequelize);
const Order = require("./Order")(sequelize);

Product.belongsTo(Category);
Category.hasMany(Product);

Cart.belongsTo(User);
User.hasMany(Cart);
Cart.belongsTo(Product);
Product.hasMany(Cart);

Order.belongsTo(User);
User.hasMany(Order);
Order.belongsTo(Product);
Product.hasMany(Order);

module.exports = {
  sequelize,
  User,
  Category,
  Product,
  Cart,
  Order,
};
