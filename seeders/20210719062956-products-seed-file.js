// 引入 faker：Fake Data
const faker = require("faker")

'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    // bulkInsert()：Insert records into a table.
    // 用 Array 形式，將 Products 物件傳入 MySQL DB。
    await queryInterface.bulkInsert("Products",
      // Array.from({ length: 200 })：建立長度為 200 的 Array[]。
      Array.from({ length: 200 })
        // map(item, index, array)：建新 Array[]，長度 200，其中每一元素皆對應一個 "product 物件{Data}"。
        .map((item, index, array) => (
          {
            // faker：產生 fake Data，如 name、tel、address、description。
            name: faker.name.findName(),
            price: faker.commerce.price(),
            description: faker.lorem.text(),
            image: `https://loremflickr.com/320/240/female,kimono?random=${Math.random() * 100}`,
            quantity: Math.floor(Math.random() * 11) * 10,
            // 對應 Category Seeders
            CategoryId: Math.floor(Math.random() * 7) * 10 + 1,

            createdAt: new Date(),
            updatedAt: new Date(),
          }
        )
        ), {})
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete("Products", null, {});
  }
};
