"use strict";

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.addColumn("Orders", "status", {
      type: Sequelize.ENUM("pending", "processing", "completed"),
      defaultValue: "pending",
      allowNull: false,
    });

    await queryInterface.addColumn("Orders", "cardNumber", {
      type: Sequelize.STRING,
      allowNull: false,
    });

    await queryInterface.addColumn("Orders", "cardHolder", {
      type: Sequelize.STRING,
      allowNull: false,
    });

    await queryInterface.addColumn("Orders", "cardExpiry", {
      type: Sequelize.STRING,
      allowNull: false,
    });

    await queryInterface.addColumn("Orders", "shippingAddress", {
      type: Sequelize.STRING,
      allowNull: false,
    });
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.removeColumn("Orders", "status");
    await queryInterface.removeColumn("Orders", "cardNumber");
    await queryInterface.removeColumn("Orders", "cardHolder");
    await queryInterface.removeColumn("Orders", "cardExpiry");
    await queryInterface.removeColumn("Orders", "shippingAddress");
  },
};
