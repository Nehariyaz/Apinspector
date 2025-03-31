'use strict';

'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.addColumn('TestCases', 'headers', {
      type: Sequelize.JSONB,  // ✅ Use JSONB for structured data
      allowNull: true,
    });

    await queryInterface.addColumn('TestCases', 'queryParams', {
      type: Sequelize.JSONB,
      allowNull: true,
    });
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.removeColumn('TestCases', 'headers');
    await queryInterface.removeColumn('TestCases', 'queryParams');
  }
};
