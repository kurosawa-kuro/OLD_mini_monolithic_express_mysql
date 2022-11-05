'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert(
      'followers',
      [
        {
          id: 1,
          user_id: 1,
          follower_id: 2,
        },
        {
          id: 2,
          user_id: 1,
          follower_id: 3,
        },
        {
          id: 3,
          user_id: 2,
          follower_id: 1,
        },
        {
          id: 4,
          user_id: 2,
          follower_id: 3,
        }
      ],
      {}
    );
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('followers', null, {});
  },
};
