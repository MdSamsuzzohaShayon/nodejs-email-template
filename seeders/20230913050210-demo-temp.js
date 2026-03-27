'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    /**
     * Add seed commands here.
     *
     * Example:
     * await queryInterface.bulkInsert('People', [{
     *   name: 'John Doe',
     *   isBetaMember: false
     * }], {});
    */
    const seededTemp = await queryInterface.bulkInsert('temptabs', [{
      make_id: 2,
      active_date: new Date(),
      publish_date: new Date(),
      embargo_date: new Date(),
      title: "Title Example",
      status: "PENDING",
      bg_img: "https://c.pxhere.com/photos/22/11/zen_garden_meditation_monk_stones_bamboo_rest_relaxation-1190057.jpg",
      bg_color: "red",
      link_color: "green",
      layout: JSON.stringify({}),
      content: JSON.stringify({}),
      sibling: JSON.stringify({}),
      createdAt: new Date(),
      updatedAt: new Date()
    }], {});
    return seededTemp;
  },

  async down (queryInterface, Sequelize) {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
  }
};
