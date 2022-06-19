'use strict';

const sequelize = require("sequelize");

module.exports = {
  async up (queryInterface, Sequelize) {
    return queryInterface.createTable('appointments', {
      id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
      },
      date: {
        type: Sequelize.DATE,
        allowNull: false,
      },
      user_id: {
        type: Sequelize.INTEGER,
        references: {model: 'users', key: 'id'},
        onUptade: 'CASCADE',
        onDelete: 'SET NULL',
        AllowNull:false
      },
      provider_id: {
        type: Sequelize.INTEGER,
        references: {model: 'users', key: 'id'},
        onUptade: 'CASCADE',
        onDelete: 'SET NULL',
        AllowNull:false
      },
      canceled_at: {
        type: Sequelize.DATE,
        allowNull: true,
      },
      created_at: {
        type: Sequelize.DATE,
        allowNull: false,
      },
      updated_at: {
        type: Sequelize.DATE,
        allowNull: false,
      },

    })
  },

  async down (queryInterface ) {
    return queryInterface.dropTable('appointments');
  }
};
