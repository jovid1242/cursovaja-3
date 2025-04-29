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

// Initialize model associations
const models = {
  User,
  Category,
  Product,
  Cart,
  Order,
};

Object.values(models).forEach((model) => {
  if (model.associate) {
    model.associate(models);
  }
});

module.exports = {
  sequelize,
  User,
  Category,
  Product,
  Cart,
  Order,
};
