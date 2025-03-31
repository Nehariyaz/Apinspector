const express = require("express");
const router = express.Router();
const testCaseController = require("../controllers/testCaseController");

router.post("/", testCaseController.createTestCase);
router.get("/", testCaseController.getAllTestCases);
router.put("/:id", testCaseController.updateTestCase);
router.delete("/:id", testCaseController.deleteTestCase);
router.post("/:id/execute", testCaseController.executeTestCase);

module.exports = router;
