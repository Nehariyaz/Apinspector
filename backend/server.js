const express = require("express");
const dotenv = require("dotenv");
const cookieParser = require("cookie-parser");
const session = require("express-session");
const cors = require("cors");
const authRoutes = require("./routes/authRoutes");
const requestRoutes = require("./routes/requestRoutes");
const { sequelize, User, Request } = require("./models");
//const sequelize = require("./config/database");
const SequelizeStore = require("connect-session-sequelize")(session.Store);


dotenv.config();

const app = express();

// CORS Configuration
app.use(cors({ 
    origin: process.env.FRONTEND_URL, 
    credentials: true 
}));

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

// Session store setup
const sessionStore = new SequelizeStore({ db: sequelize });

app.use(session({
  secret: process.env.SESSION_SECRET || "your-secret-key",
  resave: false,
  saveUninitialized: false,
  store: sessionStore,
}));

// API Routes
app.use("/", authRoutes);
app.use("/api", requestRoutes);

app.use((err, req, res, next) => {
  console.error("Internal Server Error:", err);
  res.status(500).json({ error: "Internal Server Error", details: err.message });
});

app.get("/health", (req, res) => {
  res.status(200).json({ status: "ok" });
});

// Database Connection
async function startServer() {
  try {
    await sequelize.authenticate();
    console.log("Database connected successfully.");

    await sequelize.sync(); 
    console.log("Tables synced successfully.");

    await sessionStore.sync();
    console.log("Session store synced successfully.");

    // Start server only if NOT in test environment
    if (process.env.NODE_ENV !== "test") {
      const PORT = process.env.PORT || 3000;
      app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
    }
  } catch (err) {
    console.error("Database connection failed:", err);
  }
}

// Start server only in non-test environments
if (process.env.NODE_ENV !== "test") {
  startServer();
}

// Export app for testing
module.exports = app;
