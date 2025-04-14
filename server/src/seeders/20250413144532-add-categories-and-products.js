"use strict";

const { Category, Product } = require("../models");

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  up: async (queryInterface, Sequelize) => {
    try {
      // Создаем категории
      const categories = await Category.bulkCreate([
        {
          name: "Холодильники",
          description:
            "Холодильники и морозильные камеры различных размеров и конфигураций",
        },
        {
          name: "Стиральные машины",
          description: "Стиральные и сушильные машины для дома",
        },
        {
          name: "Телевизоры",
          description: "Smart TV, LED и OLED телевизоры различных размеров",
        },
        {
          name: "Пылесосы",
          description: "Пылесосы для сухой и влажной уборки",
        },
        {
          name: "Микроволновые печи",
          description: "Микроволновые печи и мини-духовки",
        },
      ]);

      // Создаем продукты
      await Product.bulkCreate([
        // Холодильники
        {
          name: "Samsung RF50K5960S8",
          description:
            "Двухдверный холодильник с системой NoFrost и диспенсером для воды",
          price: 89999.99,
          image: "samsung-rf50.jpg",
          stock: 5,
          categoryId: categories[0].id,
        },
        {
          name: "LG GA-B459CQCL",
          description:
            "Холодильник с инверторным компрессором и зоной свежести",
          price: 54999.99,
          image: "lg-ga-b459.jpg",
          stock: 8,
          categoryId: categories[0].id,
        },
        // Стиральные машины
        {
          name: "Bosch WAN28263BY",
          description: "Стиральная машина с фронтальной загрузкой, 8 кг",
          price: 44999.99,
          image: "bosch-wan28.jpg",
          stock: 10,
          categoryId: categories[1].id,
        },
        {
          name: "LG F2V5GS0W",
          description:
            "Стиральная машина с функцией пара и инверторным мотором",
          price: 39999.99,
          image: "lg-f2v5.jpg",
          stock: 7,
          categoryId: categories[1].id,
        },
        // Телевизоры
        {
          name: "Sony KD-55X85TJ",
          description: '55" 4K HDR LED телевизор с Android TV',
          price: 79999.99,
          image: "sony-kd55.jpg",
          stock: 4,
          categoryId: categories[2].id,
        },
        {
          name: "LG OLED55C1RLA",
          description: '55" 4K OLED телевизор с процессором α9',
          price: 129999.99,
          image: "lg-oled55.jpg",
          stock: 3,
          categoryId: categories[2].id,
        },
        // Пылесосы
        {
          name: "Dyson V15 Detect",
          description: "Беспроводной пылесос с лазерным датчиком пыли",
          price: 49999.99,
          image: "dyson-v15.jpg",
          stock: 6,
          categoryId: categories[3].id,
        },
        {
          name: "Samsung VS20R9048T3",
          description: "Вертикальный пылесос с системой фильтрации HEPA",
          price: 34999.99,
          image: "samsung-vs20.jpg",
          stock: 9,
          categoryId: categories[3].id,
        },
        // Микроволновые печи
        {
          name: "Panasonic NN-GT261W",
          description: "Микроволновая печь с грилем, 20л",
          price: 12999.99,
          image: "panasonic-nn.jpg",
          stock: 12,
          categoryId: categories[4].id,
        },
        {
          name: "Samsung MC32K7055CT",
          description: "Микроволновая печь с конвекцией и грилем, 32л",
          price: 24999.99,
          image: "samsung-mc32.jpg",
          stock: 6,
          categoryId: categories[4].id,
        },
      ]);
    } catch (error) {
      console.error("Error seeding categories and products:", error);
    }
  },

  down: async (queryInterface, Sequelize) => {
    try {
      await Product.destroy({ where: {} });
      await Category.destroy({ where: {} });
    } catch (error) {
      console.error("Error removing categories and products:", error);
    }
  },
};
