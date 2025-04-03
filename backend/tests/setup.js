const { app, initialize } = require('../server');
const { sequelize } = require('../models');

module.exports = async () => {
  // Configure test database connection
  await sequelize.authenticate();
  
  // Force sync only the tables we need for tests
  await sequelize.sync({ force: true });
  
  return app;
};