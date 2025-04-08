const express = require("express");
const dotenv = require("dotenv");
const cookieParser = require("cookie-parser");
const session = require("express-session");
const cors = require("cors");
const path = require("path");

const envFile = process.env.NODE_ENV === "test" ? ".env.test" : ".env";
dotenv.config({ path: path.resolve(__dirname, envFile) });

const { sequelize, User, Request } = require("./models");

const authRoutes = require("./routes/authRoutes");
const requestRoutes = require("./routes/requestRoutes");
const testCaseRoute = require("./routes/testCaseRoute");
const assertionRoutes = require("./routes/assertionRoutes");
const reportRoute = require("./routes/reportRoutes");

const SequelizeStore = require("connect-session-sequelize")(session.Store);

const DB_HOST = process.env.DB_HOST || "localhost";


const isDocker = process.env.DOCKER_ENV === "true";
const databaseHost = isDocker ? "postgres_db" : DB_HOST;

console.log(`Connecting to database at: ${databaseHost}`);

if (process.env.NODE_ENV !== "test") {
  sequelize
    .authenticate()
    .then(() =>
      console.log(`Connecting to database at: ${sequelize.config.host}`)
    )
    .catch((err) => console.error("Database connection failed:", err));
}

const app = express();

// CORS Configuration
app.use(
  cors({
    origin: process.env.FRONTEND_URL,
    credentials: true,
  })
);

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

// Session store setup
const sessionStore = new SequelizeStore({ db: sequelize });

app.use(
  session({
    secret: process.env.SESSION_SECRET || "your-secret-key",
    resave: false,
    saveUninitialized: false,
    store: sessionStore,
  })
);

// API Routes
app.use("/", authRoutes);
app.use("/", requestRoutes);
app.use("/test-cases", testCaseRoute);
app.use("/", assertionRoutes);
app.use("/", reportRoute);

app.use((err, req, res, next) => {
  console.error("Internal Server Error:", err);
  res
    .status(500)
    .json({ error: "Internal Server Error", details: err.message });
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
      const HOST = '0.0.0.0';
      app.listen(PORT, HOST, () =>
        console.log(`Server running on http://${HOST}:${PORT}`)
      );
    }
  } catch (err) {
    console.error("Database connection failed:", err);
  }
}


app.get("/health", async (req, res) => {
  try {
    await sequelize.authenticate();

    res.status(200).json({
      status: "OK",
      database: "connected",
      timestamp: new Date().toISOString(),
    });
  } catch (err) {
    console.error("Health check failed:", err);
    res.status(500).json({
      status: "ERROR",
      database: "disconnected",
      error: err.message,
    });
  }
});

// Start server only in non-test environments
if (process.env.NODE_ENV !== "test") {
  startServer();
}

// Export app for testing
module.exports = app;
