'use strict';

const { faker } = require('@faker-js/faker');

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.bulkInsert(
      'campgrounds',
      [
        {
          user_id: 1,
          title: '湯の郷絢ほのか',
          image: faker.image.image(),
          price: faker.commerce.price(),
          description: faker.lorem.sentence(),
          location: '北海道札幌市清田区清田2条3丁目2-26',
          geometry: '{ "type": "Point", "coordinates": [141.4357252, 43.0012096] }',
          created_at: faker.date.between('2020-01-01T00:00:00.000Z', '2022-01-01T00:00:00.000Z'),
          updated_at: faker.date.between('2020-01-01T00:00:00.000Z', '2022-01-01T00:00:00.000Z'),
        }, {
          user_id: 1,
          title: 'THE SPA 西新井',
          image: faker.image.image(),
          price: faker.commerce.price(),
          description: faker.lorem.sentence(),
          location: '東京都足立区西新井栄町１丁目１７−１０ ウェルネスタウン西新井 3階 セントラル',
          geometry: '{ "type": "Point", "coordinates": [139.7877017,35.7747844] }',
          created_at: faker.date.between('2020-01-01T00:00:00.000Z', '2022-01-01T00:00:00.000Z'),
          updated_at: faker.date.between('2020-01-01T00:00:00.000Z', '2022-01-01T00:00:00.000Z'),
        }, {
          title: '草加健康センター',
          image: faker.image.image(),
          price: faker.commerce.price(),
          description: faker.lorem.sentence(),
          location: '埼玉県草加市北谷２丁目２３−２３',
          geometry: '{ "type": "Point", "coordinates": [139.77859,35.8411846] }',
          created_at: faker.date.between('2020-01-01T00:00:00.000Z', '2022-01-01T00:00:00.000Z'),
          updated_at: faker.date.between('2020-01-01T00:00:00.000Z', '2022-01-01T00:00:00.000Z'),
        }, {
          title: 'かるまる',
          image: faker.image.image(),
          price: faker.commerce.price(),
          description: faker.lorem.sentence(),
          location: '東京都豊島区池袋２丁目７−７ ロビー会館',
          geometry: '{ "type": "Point", "coordinates": [139.706449,35.7324297] }',
          created_at: faker.date.between('2020-01-01T00:00:00.000Z', '2022-01-01T00:00:00.000Z'),
          updated_at: faker.date.between('2020-01-01T00:00:00.000Z', '2022-01-01T00:00:00.000Z'),
        }, {
          title: faker.commerce.productName(),
          image: faker.image.image(),
          price: faker.commerce.price(),
          description: faker.lorem.sentence(),
          location: faker.address.county() + ' ' + faker.address.city(),
          geometry: '{ "type": "Point", "coordinates": [40, 5] }',
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
