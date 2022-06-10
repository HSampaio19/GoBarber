'use strict';

const sequelize = require("sequelize");

module.exports = {
  async up (queryInterface, Sequelize) {
    return queryInterface.createTable('users', {
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
      email: {
        type: Sequelize.STRING,
        alloeNull: false,
        unique: true,
      },
      password_hash: {
        type: Sequelize.STRING,
        alloeNull: false,
      },
      provider: {
        type: Sequelize.BOOLEAN,
        defaultValue: false,
        alloeNull: false,
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
    return queryInterface.dropTable('users');
  }
};
