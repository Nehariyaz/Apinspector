const amqp = require("amqplib");
const axios = require("axios");
const { Request } = require("./models");
const RABBITMQ_URL = "amqp://localhost:5672";
const QUEUE_NAME = "api_requests";

console.log("Is Request model defined?", Request !== undefined);


const consumeRequests = async () => {
  try {
    const connection = await amqp.connect(RABBITMQ_URL);
    const channel = await connection.createChannel();
    await channel.assertQueue(QUEUE_NAME, { durable: false });

    console.log("Waiting for API requests in the queue...");

    channel.consume(QUEUE_NAME, async (msg) => {
      if (msg !== null) {
        const requestData = JSON.parse(msg.content.toString());
        console.log("Processing API request:", requestData);

        // Ensure id exists in requestData
        if (!requestData.id) {
          console.error("Missing 'id' in request data:", requestData);
          channel.ack(msg);
          return;
        }

        let apiResponse;
        try {
          // Make the API call
          const response = await axios({
            method: requestData.method,
            url: requestData.url,
            headers: requestData.headers,
            data: requestData.body,
          });
          apiResponse = { status: "completed", message: response.data };
          console.log("API called successfully");

          // Update the request in the database
          await Request.update(
            {
              response: JSON.stringify(response.data),
              status: "completed",
            },
            { where: { id: requestData.id } }
          );
        } catch (error) {
          apiResponse = {
            status: "failed",
            message: error.response ? error.response.data : "Error making API call",
          };
          console.error("API call failed:", apiResponse.message);

          // Update the request in the database
          await Request.update(
            {
              response: JSON.stringify(apiResponse.message),
              status: "failed",
            },
            { where: { id: requestData.id } }
          );
        }

        // Send the response back to the reply queue
        if (msg.properties.replyTo) {
          channel.sendToQueue(
            msg.properties.replyTo,
            Buffer.from(JSON.stringify(apiResponse)),
            { correlationId: msg.properties.correlationId }
          );
        } else {
          console.warn("No replyTo queue specified for request:", requestData);
        }

        channel.ack(msg);
      }
    });
  } catch (error) {
    console.error("Error consuming API requests:", error);
  }
};

consumeRequests();