const express = require("express");
const router = express.Router();
const { getAssertionsByUser, createAssertion, checkAssertion, deleteAssertion, updateAssertion } = require("../controllers/assertionController");
const {authMiddleware} = require("../middlewares/authMiddleware"); 


router.get("/assertions", authMiddleware, getAssertionsByUser);
router.post("/test-cases/:testCaseId/assertions", authMiddleware, createAssertion);
router.put("/:id", authMiddleware, updateAssertion);
router.put("/assertions/:assertionId/check", authMiddleware, checkAssertion);
router.delete("/assertions/:id", authMiddleware, deleteAssertion);


module.exports = router;
