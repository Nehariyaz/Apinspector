const { sequelize } = require('../models');

module.exports = {
  initializeDB: async () => {
    try {
      await sequelize.authenticate();
      await sequelize.sync({ force: true });
    } catch (error) {
      console.error('Test DB setup failed:', error);
      throw error;
    }
  },
  cleanupDB: async () => {
    await sequelize.close();
  }
};