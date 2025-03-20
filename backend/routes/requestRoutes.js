const express = require("express");
const router = express.Router();
const {createRequest, getRequestsByUser} = require("../controllers/requestController");
const {authMiddleware}= require("../middlewares/authMiddleware");
//console.log(require("../controllers/requestController"));

// Protected routes
router.post("/request", authMiddleware, createRequest);
router.get("/request", authMiddleware,getRequestsByUser);



module.exports = router;