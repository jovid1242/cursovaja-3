const { User } = require("../models");

module.exports = {
  up: async (queryInterface, Sequelize) => {
    try {
      await User.create({
        username: "jovid12",
        email: "jovid12@example.com",
        password: "admin123",
        role: "admin",
      });
    } catch (error) {
      console.error("Error creating admin user:", error);
    }
  },

  down: async (queryInterface, Sequelize) => {
    try {
      await User.destroy({ where: { username: "jovid12" } });
    } catch (error) {
      console.error("Error removing admin user:", error);
    }
  },
};
