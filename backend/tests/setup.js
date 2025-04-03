// Add this before sequelize.authenticate()
console.log("Testing DB connection with:", {
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  database: process.env.DB_NAME
});

// Add this after sync
const [results] = await sequelize.query("SELECT 1+1 AS result");
console.log("Database test query result:", results[0].result);