const { Assertion, TestCase } = require("../models");

const getAssertionsByUser = async (req, res) => {
    const userId = req.user.id; 
  
    try {
      const assertions = await Assertion.findAll({
        include: [
          {
            model: TestCase,
            as: "TestCase",
            where: { userId }, 
            attributes: ["id", "name"], 
          },
        ],
        order: [["createdAt", "DESC"]],
      });
  
      res.status(200).json(assertions);
    } catch (error) {
      console.error("Error fetching assertions:", error);
      res.status(500).json({ error: "Error fetching assertions" });
    }
  };
  

const createAssertion = async (req, res) => {
  const { testCaseId, assertionType, condition, expectedValue } = req.body;
  const userId = req.user.id;
  console.log("Received Assertion Data:", req.body);
  try {
    const testCase = await TestCase.findOne({ where: { id: testCaseId, userId } });
    if (!testCase) {
      return res.status(404).json({ error: "Test case not found or unauthorized" });
    }

    const newAssertion = await Assertion.create({
      testCaseId,
      userId,
      assertionType,
      condition,
      expectedValue,
      receivedValue: "-",
      status: "Pending",
    });

    res.status(201).json(newAssertion);
  } catch (error) {
    console.error("Error creating assertion:", error);
    res.status(500).json({ error: "Error creating assertion" });
  }
};

const updateAssertion = async (req, res) => {
    const { id } = req.params;
    const { assertionType, condition, expectedValue } = req.body;
    
    try {
      const assertion = await Assertion.findByPk(id);
      if (!assertion) {
        return res.status(404).json({ error: "Assertion not found" });
      }
  
      assertion.assertionType = assertionType || assertion.assertionType;
      assertion.condition = condition || assertion.condition;
      assertion.expectedValue = expectedValue || assertion.expectedValue;
      
      await assertion.save();
      res.status(200).json({ message: "Assertion updated successfully", assertion });
    } catch (error) {
      console.error("Error updating assertion:", error);
      res.status(500).json({ error: "Error updating assertion" });
    }
  };

const checkAssertion = async (req, res) => {
  const { assertionId, receivedValue } = req.body;

  try {
    const assertion = await Assertion.findByPk(assertionId);
    if (!assertion) {
      return res.status(404).json({ error: "Assertion not found" });
    }

    let status = "Failed";
    switch (assertion.condition) {
      case "Equal":
        status = receivedValue === assertion.expectedValue ? "Passed" : "Failed";
        break;
      case "Not Equal":
        status = receivedValue !== assertion.expectedValue ? "Passed" : "Failed";
        break;
      case "Contains":
        status = receivedValue.includes(assertion.expectedValue) ? "Passed" : "Failed";
        break;
      case "Less Than":
        status = parseFloat(receivedValue) < parseFloat(assertion.expectedValue) ? "Passed" : "Failed";
        break;
      case "Greater Than":
        status = parseFloat(receivedValue) > parseFloat(assertion.expectedValue) ? "Passed" : "Failed";
        break;
    }

    assertion.receivedValue = receivedValue;
    assertion.status = status;
    await assertion.save();

    res.status(200).json(assertion);
  } catch (error) {
    console.error("Error checking assertion:", error);
    res.status(500).json({ error: "Error checking assertion" });
  }
};

const deleteAssertion = async (req, res) => {
    try {
        const { id } = req.params;

        if (!id) {
            return res.status(400).json({ error: "Assertion ID is required" });
        }

        if (!/^[0-9a-fA-F-]{36}$/.test(id)) {
            return res.status(400).json({ error: "Invalid UUID format" });
        }

        const deletedAssertion = await Assertion.destroy({
            where: { id } 
        });

        if (!deletedAssertion) {
            return res.status(404).json({ error: "Assertion not found" });
        }

        res.status(200).json({ message: "Assertion deleted successfully" });
    } catch (error) {
        console.error("Error deleting assertion:", error);
        res.status(500).json({ error: "Internal server error" });
    }
};


module.exports = {
  getAssertionsByUser,
  createAssertion,
  checkAssertion,
  deleteAssertion,
  updateAssertion,
};
