'use strict';

const { faker } = require('@faker-js/faker');

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.bulkInsert(
      'campgrounds',
      [
        {
          title: faker.commerce.productName(),
          image: faker.image.image(),
          price: faker.commerce.price(),
          description: faker.lorem.sentence(),
          location: faker.address.county() + ' ' + faker.address.city(),
          created_at: faker.date.between('2020-01-01T00:00:00.000Z', '2022-01-01T00:00:00.000Z'),
          updated_at: faker.date.between('2020-01-01T00:00:00.000Z', '2022-01-01T00:00:00.000Z'),
        }, {
          title: faker.commerce.productName(),
          image: faker.image.image(),
          price: faker.commerce.price(),
          description: faker.lorem.sentence(),
          location: faker.address.county() + ' ' + faker.address.city(),
          created_at: faker.date.between('2020-01-01T00:00:00.000Z', '2022-01-01T00:00:00.000Z'),
          updated_at: faker.date.between('2020-01-01T00:00:00.000Z', '2022-01-01T00:00:00.000Z'),
        }, {
          title: faker.commerce.productName(),
          image: faker.image.image(),
          price: faker.commerce.price(),
          description: faker.lorem.sentence(),
          location: faker.address.county() + ' ' + faker.address.city(),
          created_at: faker.date.between('2020-01-01T00:00:00.000Z', '2022-01-01T00:00:00.000Z'),
          updated_at: faker.date.between('2020-01-01T00:00:00.000Z', '2022-01-01T00:00:00.000Z'),
        }, {
          title: faker.commerce.productName(),
          image: faker.image.image(),
          price: faker.commerce.price(),
          description: faker.lorem.sentence(),
          location: faker.address.county() + ' ' + faker.address.city(),
          created_at: faker.date.between('2020-01-01T00:00:00.000Z', '2022-01-01T00:00:00.000Z'),
          updated_at: faker.date.between('2020-01-01T00:00:00.000Z', '2022-01-01T00:00:00.000Z'),
        }, {
          title: faker.commerce.productName(),
          image: faker.image.image(),
          price: faker.commerce.price(),
          description: faker.lorem.sentence(),
          location: faker.address.county() + ' ' + faker.address.city(),
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
