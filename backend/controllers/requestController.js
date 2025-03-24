const amqp = require("amqplib");
const { Request } = require("../models");

const RABBITMQ_URL = "amqp://localhost:5672";
const QUEUE_NAME = "api_requests";

const createRequest = async (req, res) => {
  const { method, url, headers, body } = req.body;
  const userId = req.user.id; // Attach user ID from token

  try {
      const newRequest = await Request.create({
      method,
      url,
      headers: JSON.stringify(headers),
      body: JSON.stringify(body),
      userId,
      status: "pending",
    });

    // Connect to RabbitMQ
    const connection = await amqp.connect(RABBITMQ_URL);
    const channel = await connection.createChannel();
    await channel.assertQueue(QUEUE_NAME, { durable: false });

    // Create a temporary reply queue for this request
    const replyQueue = await channel.assertQueue("", { exclusive: true });
    const correlationId = newRequest.id; // Use request ID as correlation ID

    // Promise to wait for the response
    const responsePromise = new Promise((resolve) => {
      channel.consume(
        replyQueue.queue,
        (msg) => {
          if (msg && msg.properties.correlationId === correlationId) {
            resolve(JSON.parse(msg.content.toString()));
          }
        },
        { noAck: true }
      );
    });

    // Send the request to the queue with reply-to and correlation ID
    const requestData = {
      id: newRequest.id, // Ensure id is included
      method,
      url,
      headers,
      body,
      userId,
    };
    channel.sendToQueue(QUEUE_NAME, Buffer.from(JSON.stringify(requestData)), {
      correlationId,
      replyTo: replyQueue.queue,
    });
    //console.log("Request sent to queue:", requestData);

    // Wait for the API response from the consumer
    const apiResponse = await responsePromise;

    // Clean up
    await channel.close();
    await connection.close();

    // Return the status and message from the API call
    res.status(200).json({
      status: apiResponse.status,
      message: apiResponse.message,
    });
    //console.log(apiResponse.status,apiResponse.message);
  } catch (error) {
    console.error("Error processing request:", error);
    res.status(500).json({ error: "Error processing request" });
  }
};

const getRequestsByUser = async (req, res) => {
  const userId = req.user.id;

  try {
    //console.log("Fetching requests for user:", userId);
    if (!Request) {
      console.error("Request model is undefined");
      return res.status(500).json({ error: "Request model not found" });
    }

    const requests = await Request.findAll({ where: { userId } });
    res.status(200).json(requests);
  } catch (error) {
    console.error("Error fetching requests:", error);
    res.status(500).json({ error: "Error fetching requests" });
  }
};

module.exports = {
  createRequest,
  getRequestsByUser,
};