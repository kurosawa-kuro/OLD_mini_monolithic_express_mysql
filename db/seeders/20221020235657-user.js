'use strict';

const { faker } = require('@faker-js/faker');

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.bulkInsert(
      'users',
      [
        {
          id: 1,
          name: "銭湯太郎",
          email: "test@test.test",
          password: "$2b$10$17mLYhsx1BUMIrH5vF4r.OuJg2jhG/3zw/CI6XAokwQ7edqnotbay",
          img_path: "https://res.cloudinary.com/dzorivc9n/image/upload/v1667725017/Develope/avator001_dvnfcj.png",
          created_at: faker.date.between('2020-01-01T00:00:00.000Z', '2022-01-01T00:00:00.000Z'),
          updated_at: faker.date.between('2020-01-01T00:00:00.000Z', '2022-01-01T00:00:00.000Z'),
        },
        {
          id: 2,
          name: "サウナ娘",
          email: "test@test.test",
          password: "$2b$10$17mLYhsx1BUMIrH5vF4r.OuJg2jhG/3zw/CI6XAokwQ7edqnotbay",
          img_path: "https://res.cloudinary.com/dzorivc9n/image/upload/v1667725017/Develope/avator002_kbzla4.png",
          created_at: faker.date.between('2020-01-01T00:00:00.000Z', '2022-01-01T00:00:00.000Z'),
          updated_at: faker.date.between('2020-01-01T00:00:00.000Z', '2022-01-01T00:00:00.000Z'),
        },
        {
          id: 3,
          name: "温泉女",
          email: "test@test.test",
          password: "$2b$10$17mLYhsx1BUMIrH5vF4r.OuJg2jhG/3zw/CI6XAokwQ7edqnotbay",
          img_path: "https://res.cloudinary.com/dzorivc9n/image/upload/v1667725017/Develope/avator004_yxu385.png",
          created_at: faker.date.between('2020-01-01T00:00:00.000Z', '2022-01-01T00:00:00.000Z'),
          updated_at: faker.date.between('2020-01-01T00:00:00.000Z', '2022-01-01T00:00:00.000Z'),
        }
      ],
      {}
    )
  },

  async down(queryInterface, Sequelize) {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
  }
};
