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
          name: "Samsung RB37A52N0SA",
          description: "Двухкамерный холодильник с No Frost, 367 л",
          price: 69999.99,
          image:
            "https://static.eldorado.ru/img1/p/b/327764003.jpg/resize/720x720/",
          stock: 5,
          categoryId: categories[0].id,
        },
        {
          name: "LG GA-B459CQCL",
          description:
            "Холодильник с инверторным компрессором и зоной свежести",
          price: 54999.99,
          image:
            "https://static.eldorado.ru/img1/p/b/865044004.jpg/resize/720x720/",
          stock: 8,
          categoryId: categories[0].id,
        },
        {
          name: "Bosch KGN39VL35R",
          description: "Холодильник с системой VitaFresh Plus, 351 л",
          price: 79999.99,
          image:
            "https://static.eldorado.ru/img1/p/b/535114003.jpg/resize/720x720/",
          stock: 4,
          categoryId: categories[0].id,
        },
        {
          name: "Haier C2F636CWMG",
          description: "Холодильник с технологией Total No Frost, 360 л",
          price: 64999.99,
          image:
            "https://static.eldorado.ru/photos/71/715/140/78/new_71514078_l_1556061461.jpeg/resize/720x720/",
          stock: 6,
          categoryId: categories[0].id,
        },
        {
          name: "Indesit ITR 5200 W",
          description: "Холодильник с системой No Frost, 320 л",
          price: 45999.99,
          image:
            "https://static.eldorado.ru/img1/p/b/505604004.jpg/resize/720x720/",
          stock: 7,
          categoryId: categories[0].id,
        },
        // Стиральные машины
        {
          name: "Bosch WAN28263BY",
          description: "Стиральная машина с фронтальной загрузкой, 8 кг",
          price: 44999.99,
          image:
            "https://static.eldorado.ru/img1/b/bb/399054003.jpg/resize/720x720/",
          stock: 10,
          categoryId: categories[1].id,
        },
        {
          name: "LG F2V5GS0W",
          description:
            "Стиральная машина с функцией пара и инверторным мотором",
          price: 39999.99,
          image:
            "https://static.eldorado.ru/img1/p/b/825124001.jpg/resize/720x720/",
          stock: 7,
          categoryId: categories[1].id,
        },
        {
          name: "Samsung WW80T554DAX",
          description: "Стиральная машина с технологией EcoBubble, 8 кг",
          price: 49999.99,
          image:
            "https://static.eldorado.ru/img1/b/bb/88038200.jpg/resize/720x720/",
          stock: 5,
          categoryId: categories[1].id,
        },
        {
          name: "Whirlpool FWSG 61083",
          description: "Стиральная машина с 6-м движением, 8 кг",
          price: 37999.99,
          image:
            "https://static.eldorado.ru/img1/p/b/784284000.jpg/resize/720x720/",
          stock: 8,
          categoryId: categories[1].id,
        },
        {
          name: "Candy CS4 1061D1/2",
          description: "Стиральная машина с технологией Smart Touch, 6 кг",
          price: 29999.99,
          image:
            "https://static.eldorado.ru/photos/71/715/261/65/new_71526165_l_1570027870.jpeg/resize/720x720/",
          stock: 12,
          categoryId: categories[1].id,
        },
        // Телевизоры
        {
          name: "Sony KD-55X85TJ",
          description: '55" 4K HDR LED телевизор с Android TV',
          price: 79999.99,
          image:
            "https://static.eldorado.ru/img1/p/b/747464001.jpg/resize/720x720/",
          stock: 4,
          categoryId: categories[2].id,
        },
        {
          name: "LG OLED55C1RLA",
          description: '55" 4K OLED телевизор с процессором α9',
          price: 129999.99,
          image:
            "https://static.eldorado.ru/img1/p/b/082724004.jpg/resize/720x720/",
          stock: 3,
          categoryId: categories[2].id,
        },
        {
          name: "Samsung QE55QN90A",
          description: '55" 4K QLED телевизор с Neo Quantum Processor',
          price: 149999.99,
          image:
            "https://static.eldorado.ru/img1/p/b/747464001.jpg/resize/720x720/",
          stock: 2,
          categoryId: categories[2].id,
        },
        {
          name: "Philips 55PUS8506",
          description: '55" 4K UHD телевизор с Ambilight',
          price: 69999.99,
          image:
            "https://static.eldorado.ru/img1/b/bb/249594001.jpg/resize/720x720/",
          stock: 5,
          categoryId: categories[2].id,
        },
        {
          name: "TCL 55C725",
          description: '55" 4K QLED телевизор с Google TV',
          price: 59999.99,
          image:
            "https://static.eldorado.ru/img1/b/bb/655944003.jpg/resize/720x720/",
          stock: 6,
          categoryId: categories[2].id,
        },
        // Пылесосы
        {
          name: "Dyson V15 Detect",
          description: "Беспроводной пылесос с лазерным датчиком пыли",
          price: 49999.99,
          image:
            "https://static.eldorado.ru/img1/p/b/980104004.jpg/resize/720x720/",
          stock: 6,
          categoryId: categories[3].id,
        },
        {
          name: "Samsung VS20R9048T3",
          description: "Вертикальный пылесос с системой фильтрации HEPA",
          price: 34999.99,
          image:
            "https://static.eldorado.ru/img1/p/b/88558200.jpg/resize/720x720/",
          stock: 9,
          categoryId: categories[3].id,
        },
        {
          name: "Xiaomi Mi Robot Vacuum-Mop 2 Pro",
          description: "Робот-пылесос с лазерной навигацией",
          price: 29999.99,
          image:
            "https://static.eldorado.ru/img1/p/b/945624002.jpg/resize/720x720/",
          stock: 7,
          categoryId: categories[3].id,
        },
        {
          name: "Bosch BGL8AIM1",
          description: "Робот-пылесос с Wi-Fi и голосовым управлением",
          price: 39999.99,
          image:
            "https://static.eldorado.ru/img1/p/b/363694003.jpg/resize/720x720/",
          stock: 4,
          categoryId: categories[3].id,
        },
        {
          name: "LG CordZero A9",
          description: "Беспроводной пылесос с двумя аккумуляторами",
          price: 44999.99,
          image:
            "https://static.eldorado.ru/img1/p/b/2645042.jpg/resize/720x720/",
          stock: 5,
          categoryId: categories[3].id,
        },
        // Микроволновые печи
        {
          name: "Panasonic NN-GT261W",
          description: "Микроволновая печь с грилем, 20л",
          price: 12999.99,
          image:
            "https://static.eldorado.ru/img1/p/b/155664003.jpg/resize/720x720/",
          stock: 12,
          categoryId: categories[4].id,
        },
        {
          name: "Samsung MC32K7055CT",
          description: "Микроволновая печь с конвекцией и грилем, 32л",
          price: 24999.99,
          image:
            "https://static.eldorado.ru/img1/p/b/13148200.jpg/resize/720x720/",
          stock: 6,
          categoryId: categories[4].id,
        },
        {
          name: "LG MS2042DB",
          description: "Микроволновая печь с функцией разморозки, 20л",
          price: 8999.99,
          image:
            "https://static.eldorado.ru/photos/74/new_74118631_l_1574961321.jpeg/resize/720x720/",
          stock: 15,
          categoryId: categories[4].id,
        },
        {
          name: "Bosch HMT84G451",
          description: "Микроволновая печь с сенсорным управлением, 25л",
          price: 17999.99,
          image:
            "https://static.eldorado.ru/img1/p/b/951774002.jpg/resize/720x720/",
          stock: 8,
          categoryId: categories[4].id,
        },
        {
          name: "BBK 20MWC-800S/W",
          description: "Микроволновая печь с 6 уровнями мощности, 20л",
          price: 7999.99,
          image:
            "https://static.eldorado.ru/img1/b/bb/623104004.jpg/resize/720x720/",
          stock: 10,
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
