'use strict';

const sequelize = require("sequelize");

module.exports = {
  async up (queryInterface, Sequelize) {
    return queryInterface.createTable('files', {
      id: {
        type: Sequelize.INTEGER,
        alloeNull: false,
        autoIncrement: true,
        primaryKey: true,
      },
      name: {
        type: Sequelize.STRING,
        alloeNull: false,
      },
      path: {
        type: Sequelize.STRING,
        alloeNull: false,
        unique: true,
      },
      created_at: {
        type: Sequelize.DATE,
        alloeNull: false,
      },
      updated_at: {
        type: Sequelize.DATE,
        alloeNull: false,
      },

    })
  },

  async down (queryInterface ) {
    return queryInterface.dropTable('files');
  }
};
