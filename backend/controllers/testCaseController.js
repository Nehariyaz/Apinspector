const amqp = require("amqplib");
const { TestCase } = require("../models");

const RABBITMQ_URL = "amqp://localhost:5672";
const QUEUE_NAME = "api_requests";


const createTestCase = async (req, res) => {
  const { name, method, url, headers, queryParams, body } = req.body;
  const userId = req.user.id; 

  try {
    const testCase = await TestCase.create({
      name,
      method,
      url,
      headers: JSON.stringify(headers),
      queryParams: JSON.stringify(queryParams),
      body,
      userId,
      status: "pending",
    });

    res.status(201).json({ message: "Test case saved successfully", testCase });
  } catch (error) {
    console.error("Error creating test case:", error);
    res.status(500).json({ error: "Failed to create test case" });
  }
};

// Get all test cases
const getAllTestCases = async (req, res) => {
  try {
    const testCases = await TestCase.findAll();
    res.status(200).json(testCases);
  } catch (error) {
    console.error("Error fetching test cases:", error);
    res.status(500).json({ error: "Failed to fetch test cases" });
  }
};


const updateTestCase = async (req, res) => {
  const { id } = req.params;
  const { name, method, url, headers, queryParams, body } = req.body;

  try {
    const testCase = await TestCase.findByPk(id);
    if (!testCase) {
      return res.status(404).json({ error: "Test case not found" });
    }

    await testCase.update({
      name,
      method,
      url,
      headers: JSON.stringify(headers),
      queryParams: JSON.stringify(queryParams),
      body,
    });

    res.status(200).json({ message: "Test case updated successfully", testCase });
  } catch (error) {
    console.error("Error updating test case:", error);
    res.status(500).json({ error: "Failed to update test case" });
  }
};

// Delete a test case
const deleteTestCase = async (req, res) => {
  const { id } = req.params;

  try {
    const testCase = await TestCase.findByPk(id);
    if (!testCase) {
      return res.status(404).json({ error: "Test case not found" });
    }

    await testCase.destroy();
    res.status(200).json({ message: "Test case deleted successfully" });
  } catch (error) {
    console.error("Error deleting test case:", error);
    res.status(500).json({ error: "Failed to delete test case" });
  }
};

// Execute a test case
const executeTestCase = async (req, res) => {
    const { id } = req.params;
  
    try {
      const testCase = await TestCase.findByPk(id);
      if (!testCase) {
        return res.status(404).json({ error: "Test case not found" });
      }
  
      const connection = await amqp.connect(RABBITMQ_URL);
      const channel = await connection.createChannel();
      await channel.assertQueue(QUEUE_NAME, { durable: false });
  
      const replyQueue = await channel.assertQueue("", { exclusive: true });
      const correlationId = testCase.id.toString();
  
      const responsePromise = new Promise((resolve) => {
        channel.consume(
          replyQueue.queue,
          (msg) => {
            if (msg.properties.correlationId === correlationId) {
              resolve(JSON.parse(msg.content.toString()));
            }
          },
          { noAck: true }
        );
      });
  
      const requestData = {
        id: testCase.id,
        method: testCase.method,
        url: testCase.url,
        headers: JSON.parse(testCase.headers),
        body: testCase.body,
      };
  
      channel.sendToQueue(QUEUE_NAME, Buffer.from(JSON.stringify(requestData)), {
        correlationId,
        replyTo: replyQueue.queue,
      });
  
      const apiResponse = await responsePromise;
  
      await channel.close();
      await connection.close();
  
      // Update test case status
      await testCase.update({
        status: apiResponse.status,
        response: JSON.stringify(apiResponse.message),
      });
  
      // Send test case details along with the response
      res.status(200).json({
        message: "Test case executed successfully",
        response: apiResponse,
        testCase: {
          id: testCase.id,
          method: testCase.method,
          url: testCase.url,
          headers: JSON.parse(testCase.headers),
          body: testCase.body,
        }
      });
  
    } catch (error) {
      console.error("Error executing test case:", error);
      res.status(500).json({ error: "Failed to execute test case" });
    }
  };
  
module.exports = {
  createTestCase,
  getAllTestCases,
  updateTestCase,
  deleteTestCase,
  executeTestCase,
};
