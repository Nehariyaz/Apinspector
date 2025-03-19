const express = require("express");
const dotenv = require("dotenv");
const cookieParser = require("cookie-parser");
const session = require("express-session");
const bodyParser = require("body-parser");
const cors = require("cors");
const authRoutes = require("./routes/authRoutes");
const sequelize = require("./config/database"); 
const SequelizeStore = require("connect-session-sequelize")(session.Store);

dotenv.config();

const app = express();

app.use(cors({ 
    origin: process.env.FRONTEND_URL, 
    credentials: true 
}));

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
//app.use(requestMiddleware);
app.use("/", authRoutes);


const sessionStore = new SequelizeStore({ db: sequelize });

sequelize.authenticate()
  .then(() => {
    console.log("Database connected successfully.");

    return sequelize.sync(); 
  })
  .then(() => {
    return sessionStore.sync(); 
  })
  .then(() => {
    console.log("Session store synced successfully.");

    const PORT = process.env.PORT || 3000;
    app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
  })
  .catch((err) => {
    console.error("Database connection failed:", err);
  });

app.use(session({
  secret: process.env.SESSION_SECRET || "your-secret-key",
  resave: false,
  saveUninitialized: false,
  store: sessionStore,
}));


