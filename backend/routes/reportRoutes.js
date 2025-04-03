const express = require("express");
const router = express.Router();
const { getReport } = require("../controllers/reportController");
const { authMiddleware } = require("../middlewares/authMiddleware");


router.get("/report",authMiddleware, getReport);



module.exports = router;
