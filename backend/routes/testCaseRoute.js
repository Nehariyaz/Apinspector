const express = require("express");
const router = express.Router();
const { getTestCase, createTestCase, updateTestCase, deleteTestCase } = require("../controllers/testCaseController");
const {authMiddleware} = require("../middlewares/authMiddleware");

router.get("/", authMiddleware, getTestCase);
router.post("/", authMiddleware, createTestCase);
router.put("/:id", authMiddleware, updateTestCase);
router.delete("/:id", authMiddleware, deleteTestCase);

module.exports = router;
