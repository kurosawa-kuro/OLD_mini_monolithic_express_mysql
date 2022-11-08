'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    /**
     * Add seed commands here.
     *
     * Example:
     * await queryInterface.bulkInsert('People', [{
     *   name: 'John Doe',
     *   isBetaMember: false
     * }], {});
    */

    await queryInterface.bulkInsert('micropost_images', [
      {
        micropost_id: 1,
        filename: 'dummy filename',
        path: 'https://res.cloudinary.com/dzorivc9n/image/upload/v1667883362/Develope/sentou003_mx73hs.jpg'
      }, {
        micropost_id: 1,
        filename: 'dummy filename',
        path: 'https://res.cloudinary.com/dzorivc9n/image/upload/v1667889921/Develope/sauna_food/sauna_food009_cxhphj.jpg'
      }, {
        micropost_id: 1,
        filename: 'dummy filename',
        path: 'https://res.cloudinary.com/dzorivc9n/image/upload/v1667889919/Develope/sauna/sauna001_txeks1.jpg'
      }, {
        micropost_id: 2,
        filename: 'dummy filename',
        path: 'https://res.cloudinary.com/dzorivc9n/image/upload/v1667883362/Develope/sentou004_aafuu6.jpg'
      }, {
        micropost_id: 2,
        filename: 'dummy filename',
        path: 'https://res.cloudinary.com/dzorivc9n/image/upload/v1667889921/Develope/sauna_food/sauna_food009_cxhphj.jpg'
      }, {
        micropost_id: 2,
        filename: 'dummy filename',
        path: 'https://res.cloudinary.com/dzorivc9n/image/upload/v1667883362/Develope/sentou004_aafuu6.jpg'
      }
      , {
        micropost_id: 3,
        filename: 'dummy filename',
        path: 'https://res.cloudinary.com/dzorivc9n/image/upload/v1667883362/Develope/sentou005_llfcmu.jpg'
      }, {
        micropost_id: 4,
        filename: 'dummy filename',
        path: 'https://res.cloudinary.com/dzorivc9n/image/upload/v1667889919/Develope/sauna/sauna004_drihm5.jpg'
      }, {
        micropost_id: 5,
        filename: 'dummy filename',
        path: 'https://res.cloudinary.com/dzorivc9n/image/upload/v1667889919/Develope/sauna/sauna003_yghhay.jpg'
      }
    ], {});
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
