const { Report, User, TestCase, Assertion } = require("../models");
const { Op } = require("sequelize");

exports.getReport = async (req, res) => {
  try {
    const { startDate, endDate } = req.query;

    // Fetch reports with nested associations
    const reports = await Report.findAll({
      where: {
        createdAt: {
          [Op.between]: [new Date(startDate), new Date(endDate)]
        }
      },
      include: [
        { model: User, attributes: ["id", "username", "email"] },
        { 
          model: TestCase, 
          attributes: ["id", "name"],
          include: [{
            model: Assertion,
            attributes: ["id", "status"] // Assuming status field exists in Assertion model
          }]
        }
      ]
    });

    const totalTests = reports.length;
    if (totalTests === 0) {
      return res.status(200).json({"message": "no tests created in the given dates"});
    }

    // Calculate passed tests based on assertions
    const testsPassed = reports.filter(report => {
      // Check if all assertions for this report's test case passed
      const assertions = report.TestCase.Assertions;
      return assertions.length > 0 && assertions.every(assertion => assertion.status === "passed");
    }).length;

    const testsFailed = totalTests - testsPassed;
    const successRate = totalTests > 0 ? ((testsPassed / totalTests) * 100).toFixed(2) + "%" : "0%";

    return res.status(201).json({
      successRate,
      testsPassed,
      testsFailed,
    });
  } catch (error) {
    console.error("Error fetching reports:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};