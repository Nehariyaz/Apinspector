const { sequelize } = require('../models');

module.exports = {
  setupDB: async () => {
    try {
      await sequelize.authenticate();
      // Only force sync in test environment
      if (process.env.NODE_ENV === 'test') {
        await sequelize.sync({ force: true });
      }
    } catch (error) {
      console.error('Database setup failed:', error);
      throw error;
    }
  },
  teardownDB: async () => {
    await sequelize.close();
  }
};