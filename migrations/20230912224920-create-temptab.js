'use strict';
/** @type {import('sequelize-cli').Migration} */

module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('temptabs', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      make_id: {
        type: Sequelize.INTEGER
      },
      active_date: {
        type: Sequelize.DATE,
        allowNull: false,
        defaultValue: new Date()
      },
      publish_date: {
        type: Sequelize.DATE,
        allowNull: false,
        defaultValue: new Date()
      },
      embargo_date: {
        type: Sequelize.DATE,
        allowNull: false,
        defaultValue: new Date()
      },
      title: {
        type: Sequelize.STRING
      },
      status: {
        type: Sequelize.STRING
      },
      bg_img: {
        type: Sequelize.STRING
      },
      bg_color: {
        type: Sequelize.STRING
      },
      link_color: {
        type: Sequelize.STRING
      },
      layout: {
        type: Sequelize.JSON,
        allowNull: true,
      },
      content: {
        type: Sequelize.JSON,
        allowNull: true,
      },
      sibling: {
        type: Sequelize.JSON,
        allowNull: true,
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE,
        defaultValue: new Date()
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE,
        defaultValue: new Date()
      }
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('temptabs');
  }
};