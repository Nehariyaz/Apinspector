const express = require("express");
const router = express.Router();
const {createRequest, saveRequest} = require("../controllers/requestController");
const {authMiddleware}= require("../middlewares/authMiddleware");
//console.log(require("../controllers/requestController"));

// Protected routes
router.post("/request", authMiddleware, createRequest);
router.post("/requestSave", authMiddleware,saveRequest);



module.exports = router;