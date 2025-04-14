const { DataTypes } = require("sequelize");

module.exports = (sequelize) => {
  const Order = sequelize.define("Order", {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    quantity: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    totalPrice: {
      type: DataTypes.DECIMAL(10, 2),
      allowNull: false,
    },
    orderDate: {
      type: DataTypes.DATE,
      defaultValue: DataTypes.NOW,
    },
    productId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: "Products",
        key: "id",
      },
    },
    userId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: "Users",
        key: "id",
      },
    },
  });

  Order.associate = (models) => {
    Order.belongsTo(models.User, {
      foreignKey: "userId",
      as: "User",
    });
    Order.belongsTo(models.Product, {
      foreignKey: "productId",
      as: "Product",
    });
  };

  return Order;
};
