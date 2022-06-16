'use strict';

module.exports = {
  async up (queryInterface, Sequelize) {
    return queryInterface.addColumn('users','avatar_id',{
        type: Sequelize.INTEGER,
        references: {model: 'files', key: 'id'},
        onUptade: 'CASCADE',
        onDelete: 'SET NULL',
        AllowNull:true
      }
    )
  },

  async down (queryInterface, Sequelize) {
    return queryInterface.removeColumn('users', 'avatar_id')
  }
};
