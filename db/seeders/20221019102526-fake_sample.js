'use strict';

const { faker } = require('@faker-js/faker');

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.bulkInsert(
      'samples',
      [
        {
          name: "sample 1",
          image: faker.image.image(),
          created_at: faker.date.between('2020-01-01T00:00:00.000Z', '2022-01-01T00:00:00.000Z'),
          updated_at: faker.date.between('2020-01-01T00:00:00.000Z', '2022-01-01T00:00:00.000Z'),
        }, {
          name: "sample 2",
          image: faker.image.image(),
          created_at: faker.date.between('2020-01-01T00:00:00.000Z', '2022-01-01T00:00:00.000Z'),
          updated_at: faker.date.between('2020-01-01T00:00:00.000Z', '2022-01-01T00:00:00.000Z'),
        }, {
          name: "sample 3",
          image: faker.image.image(),
          created_at: faker.date.between('2020-01-01T00:00:00.000Z', '2022-01-01T00:00:00.000Z'),
          updated_at: faker.date.between('2020-01-01T00:00:00.000Z', '2022-01-01T00:00:00.000Z'),
        }
        // ,{
        //   name: "sample 4",
        //   image: faker.image.image(),
        //   created_at: faker.date.between('2020-01-01T00:00:00.000Z', '2022-01-01T00:00:00.000Z'),
        //   updated_at: faker.date.between('2020-01-01T00:00:00.000Z', '2022-01-01T00:00:00.000Z'),
        // }, {
        //   name: "sample 5",
        //   image: faker.image.image(),
        //   created_at: faker.date.between('2020-01-01T00:00:00.000Z', '2022-01-01T00:00:00.000Z'),
        //   updated_at: faker.date.between('2020-01-01T00:00:00.000Z', '2022-01-01T00:00:00.000Z'),
        // }, {
        //   name: "sample 6",
        //   image: faker.image.image(),
        //   created_at: faker.date.between('2020-01-01T00:00:00.000Z', '2022-01-01T00:00:00.000Z'),
        //   updated_at: faker.date.between('2020-01-01T00:00:00.000Z', '2022-01-01T00:00:00.000Z'),
        // }, {
        //   name: "sample 7",
        //   image: faker.image.image(),
        //   created_at: faker.date.between('2020-01-01T00:00:00.000Z', '2022-01-01T00:00:00.000Z'),
        //   updated_at: faker.date.between('2020-01-01T00:00:00.000Z', '2022-01-01T00:00:00.000Z'),
        // }, {
        //   name: "sample 8",
        //   image: faker.image.image(),
        //   created_at: faker.date.between('2020-01-01T00:00:00.000Z', '2022-01-01T00:00:00.000Z'),
        //   updated_at: faker.date.between('2020-01-01T00:00:00.000Z', '2022-01-01T00:00:00.000Z'),
        // }, {
        //   name: "sample 9",
        //   image: faker.image.image(),
        //   created_at: faker.date.between('2020-01-01T00:00:00.000Z', '2022-01-01T00:00:00.000Z'),
        //   updated_at: faker.date.between('2020-01-01T00:00:00.000Z', '2022-01-01T00:00:00.000Z'),
        // }, {
        //   name: "sample 10",
        //   image: faker.image.image(),
        //   created_at: faker.date.between('2020-01-01T00:00:00.000Z', '2022-01-01T00:00:00.000Z'),
        //   updated_at: faker.date.between('2020-01-01T00:00:00.000Z', '2022-01-01T00:00:00.000Z'),
        // }, {
        //   name: "sample 11",
        //   image: faker.image.image(),
        //   created_at: faker.date.between('2020-01-01T00:00:00.000Z', '2022-01-01T00:00:00.000Z'),
        //   updated_at: faker.date.between('2020-01-01T00:00:00.000Z', '2022-01-01T00:00:00.000Z'),
        // }, {
        //   name: "sample 12",
        //   image: faker.image.image(),
        //   created_at: faker.date.between('2020-01-01T00:00:00.000Z', '2022-01-01T00:00:00.000Z'),
        //   updated_at: faker.date.between('2020-01-01T00:00:00.000Z', '2022-01-01T00:00:00.000Z'),
        // }, {
        //   name: "sample 13",
        //   image: faker.image.image(),
        //   created_at: faker.date.between('2020-01-01T00:00:00.000Z', '2022-01-01T00:00:00.000Z'),
        //   updated_at: faker.date.between('2020-01-01T00:00:00.000Z', '2022-01-01T00:00:00.000Z'),
        // }, {
        //   name: "sample 14",
        //   image: faker.image.image(),
        //   created_at: faker.date.between('2020-01-01T00:00:00.000Z', '2022-01-01T00:00:00.000Z'),
        //   updated_at: faker.date.between('2020-01-01T00:00:00.000Z', '2022-01-01T00:00:00.000Z'),
        // }, {
        //   name: "sample 3",
        //   image: faker.image.image(),
        //   created_at: faker.date.between('2020-01-01T00:00:00.000Z', '2022-01-01T00:00:00.000Z'),
        //   updated_at: faker.date.between('2020-01-01T00:00:00.000Z', '2022-01-01T00:00:00.000Z'),
        // }, {
        //   name: "sample 1",
        //   image: faker.image.image(),
        //   created_at: faker.date.between('2020-01-01T00:00:00.000Z', '2022-01-01T00:00:00.000Z'),
        //   updated_at: faker.date.between('2020-01-01T00:00:00.000Z', '2022-01-01T00:00:00.000Z'),
        // }, {
        //   name: "sample 2",
        //   image: faker.image.image(),
        //   created_at: faker.date.between('2020-01-01T00:00:00.000Z', '2022-01-01T00:00:00.000Z'),
        //   updated_at: faker.date.between('2020-01-01T00:00:00.000Z', '2022-01-01T00:00:00.000Z'),
        // }, {
        //   name: "sample 3",
        //   image: faker.image.image(),
        //   created_at: faker.date.between('2020-01-01T00:00:00.000Z', '2022-01-01T00:00:00.000Z'),
        //   updated_at: faker.date.between('2020-01-01T00:00:00.000Z', '2022-01-01T00:00:00.000Z'),
        // }, {
        //   name: "sample 1",
        //   image: faker.image.image(),
        //   created_at: faker.date.between('2020-01-01T00:00:00.000Z', '2022-01-01T00:00:00.000Z'),
        //   updated_at: faker.date.between('2020-01-01T00:00:00.000Z', '2022-01-01T00:00:00.000Z'),
        // }, {
        //   name: "sample 2",
        //   image: faker.image.image(),
        //   created_at: faker.date.between('2020-01-01T00:00:00.000Z', '2022-01-01T00:00:00.000Z'),
        //   updated_at: faker.date.between('2020-01-01T00:00:00.000Z', '2022-01-01T00:00:00.000Z'),
        // }, {
        //   name: "sample 3",
        //   image: faker.image.image(),
        //   created_at: faker.date.between('2020-01-01T00:00:00.000Z', '2022-01-01T00:00:00.000Z'),
        //   updated_at: faker.date.between('2020-01-01T00:00:00.000Z', '2022-01-01T00:00:00.000Z'),
        // }, {
        //   name: "sample 1",
        //   image: faker.image.image(),
        //   created_at: faker.date.between('2020-01-01T00:00:00.000Z', '2022-01-01T00:00:00.000Z'),
        //   updated_at: faker.date.between('2020-01-01T00:00:00.000Z', '2022-01-01T00:00:00.000Z'),
        // }, {
        //   name: "sample 2",
        //   image: faker.image.image(),
        //   created_at: faker.date.between('2020-01-01T00:00:00.000Z', '2022-01-01T00:00:00.000Z'),
        //   updated_at: faker.date.between('2020-01-01T00:00:00.000Z', '2022-01-01T00:00:00.000Z'),
        // }, {
        //   name: "sample 3",
        //   image: faker.image.image(),
        //   created_at: faker.date.between('2020-01-01T00:00:00.000Z', '2022-01-01T00:00:00.000Z'),
        //   updated_at: faker.date.between('2020-01-01T00:00:00.000Z', '2022-01-01T00:00:00.000Z'),
        // }, {
        //   name: "sample 1",
        //   image: faker.image.image(),
        //   created_at: faker.date.between('2020-01-01T00:00:00.000Z', '2022-01-01T00:00:00.000Z'),
        //   updated_at: faker.date.between('2020-01-01T00:00:00.000Z', '2022-01-01T00:00:00.000Z'),
        // }, {
        //   name: "sample 2",
        //   image: faker.image.image(),
        //   created_at: faker.date.between('2020-01-01T00:00:00.000Z', '2022-01-01T00:00:00.000Z'),
        //   updated_at: faker.date.between('2020-01-01T00:00:00.000Z', '2022-01-01T00:00:00.000Z'),
        // }, {
        //   name: "sample 3",
        //   image: faker.image.image(),
        //   created_at: faker.date.between('2020-01-01T00:00:00.000Z', '2022-01-01T00:00:00.000Z'),
        //   updated_at: faker.date.between('2020-01-01T00:00:00.000Z', '2022-01-01T00:00:00.000Z'),
        // }, {
        //   name: "sample 1",
        //   image: faker.image.image(),
        //   created_at: faker.date.between('2020-01-01T00:00:00.000Z', '2022-01-01T00:00:00.000Z'),
        //   updated_at: faker.date.between('2020-01-01T00:00:00.000Z', '2022-01-01T00:00:00.000Z'),
        // }, {
        //   name: "sample 2",
        //   image: faker.image.image(),
        //   created_at: faker.date.between('2020-01-01T00:00:00.000Z', '2022-01-01T00:00:00.000Z'),
        //   updated_at: faker.date.between('2020-01-01T00:00:00.000Z', '2022-01-01T00:00:00.000Z'),
        // }, {
        //   name: "sample 3",
        //   image: faker.image.image(),
        //   created_at: faker.date.between('2020-01-01T00:00:00.000Z', '2022-01-01T00:00:00.000Z'),
        //   updated_at: faker.date.between('2020-01-01T00:00:00.000Z', '2022-01-01T00:00:00.000Z'),
        // }, {
        //   name: "sample 1",
        //   image: faker.image.image(),
        //   created_at: faker.date.between('2020-01-01T00:00:00.000Z', '2022-01-01T00:00:00.000Z'),
        //   updated_at: faker.date.between('2020-01-01T00:00:00.000Z', '2022-01-01T00:00:00.000Z'),
        // }, {
        //   name: "sample 2",
        //   image: faker.image.image(),
        //   created_at: faker.date.between('2020-01-01T00:00:00.000Z', '2022-01-01T00:00:00.000Z'),
        //   updated_at: faker.date.between('2020-01-01T00:00:00.000Z', '2022-01-01T00:00:00.000Z'),
        // }, {
        //   name: "sample 3",
        //   image: faker.image.image(),
        //   created_at: faker.date.between('2020-01-01T00:00:00.000Z', '2022-01-01T00:00:00.000Z'),
        //   updated_at: faker.date.between('2020-01-01T00:00:00.000Z', '2022-01-01T00:00:00.000Z'),
        // }, {
        //   name: "sample 1",
        //   image: faker.image.image(),
        //   created_at: faker.date.between('2020-01-01T00:00:00.000Z', '2022-01-01T00:00:00.000Z'),
        //   updated_at: faker.date.between('2020-01-01T00:00:00.000Z', '2022-01-01T00:00:00.000Z'),
        // }, {
        //   name: "sample 2",
        //   image: faker.image.image(),
        //   created_at: faker.date.between('2020-01-01T00:00:00.000Z', '2022-01-01T00:00:00.000Z'),
        //   updated_at: faker.date.between('2020-01-01T00:00:00.000Z', '2022-01-01T00:00:00.000Z'),
        // }, {
        //   name: "sample 3",
        //   image: faker.image.image(),
        //   created_at: faker.date.between('2020-01-01T00:00:00.000Z', '2022-01-01T00:00:00.000Z'),
        //   updated_at: faker.date.between('2020-01-01T00:00:00.000Z', '2022-01-01T00:00:00.000Z'),
        // }, {
        //   name: "sample 1",
        //   image: faker.image.image(),
        //   created_at: faker.date.between('2020-01-01T00:00:00.000Z', '2022-01-01T00:00:00.000Z'),
        //   updated_at: faker.date.between('2020-01-01T00:00:00.000Z', '2022-01-01T00:00:00.000Z'),
        // }, {
        //   name: "sample 2",
        //   image: faker.image.image(),
        //   created_at: faker.date.between('2020-01-01T00:00:00.000Z', '2022-01-01T00:00:00.000Z'),
        //   updated_at: faker.date.between('2020-01-01T00:00:00.000Z', '2022-01-01T00:00:00.000Z'),
        // }, {
        //   name: "sample 3",
        //   image: faker.image.image(),
        //   created_at: faker.date.between('2020-01-01T00:00:00.000Z', '2022-01-01T00:00:00.000Z'),
        //   updated_at: faker.date.between('2020-01-01T00:00:00.000Z', '2022-01-01T00:00:00.000Z'),
        // }, {
        //   name: "sample 1",
        //   image: faker.image.image(),
        //   created_at: faker.date.between('2020-01-01T00:00:00.000Z', '2022-01-01T00:00:00.000Z'),
        //   updated_at: faker.date.between('2020-01-01T00:00:00.000Z', '2022-01-01T00:00:00.000Z'),
        // }, {
        //   name: "sample 2",
        //   image: faker.image.image(),
        //   created_at: faker.date.between('2020-01-01T00:00:00.000Z', '2022-01-01T00:00:00.000Z'),
        //   updated_at: faker.date.between('2020-01-01T00:00:00.000Z', '2022-01-01T00:00:00.000Z'),
        // }, {
        //   name: "sample 3",
        //   image: faker.image.image(),
        //   created_at: faker.date.between('2020-01-01T00:00:00.000Z', '2022-01-01T00:00:00.000Z'),
        //   updated_at: faker.date.between('2020-01-01T00:00:00.000Z', '2022-01-01T00:00:00.000Z'),
        // }
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
