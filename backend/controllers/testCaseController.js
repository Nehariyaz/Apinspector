const TestCase = require("../models/TestCase");

// Get all test cases for a user
const getTestCase = async (req, res) => {
  try {
    const userId = req.user.id; // Assuming user ID is extracted from authentication middleware
    const testCases = await TestCase.findAll({ where: { userId } });
    res.status(200).json(testCases);
  } catch (error) {
    console.error("Error fetching test cases:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

// Create a new test case
const createTestCase = async (req, res) => {
  try {
    const { name, method, url, queryParams, headers, body } = req.body;
    const userId = req.user.id; 

    const newTestCase = await TestCase.create({
      name,
      method,
      url,
      queryParams,
      headers,
      body,
      userId,
    });

    res.status(201).json(newTestCase);
  } catch (error) {
    console.error("Error creating test case:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

// Update an existing test case
const updateTestCase = async (req, res) => {
  try {
    const { id } = req.params;
    const userId = req.user.id;
    const { name, method, url, queryParams, headers, body } = req.body;

    const testCase = await TestCase.findOne({ where: { id, userId } });

    if (!testCase) {
      return res.status(404).json({ message: "Test case not found" });
    }

    await testCase.update({ name, method, url, queryParams, headers, body });

    res.status(200).json(testCase);
  } catch (error) {
    console.error("Error updating test case:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

const deleteTestCase = async (req, res) => {
  try {
    console.log("heloo");
    const { id } = req.params;
    const userId = req.user.id;

    const testCase = await TestCase.findOne({ where: { id, userId } });
    console.log("Testcase to be deleted:", testCase);

    if (!testCase) {
      return res.status(404).json({ message: "Test case not found" });
    }

    await testCase.destroy();
    res.status(200).json({ message: "Test case deleted successfully" });
  } catch (error) {
    console.error("Error deleting test case:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

module.exports={
  getTestCase,
  createTestCase,
  updateTestCase,
  deleteTestCase,
}