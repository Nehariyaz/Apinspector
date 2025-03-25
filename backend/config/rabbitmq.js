const amqp = require("amqplib");
const dotenv = require("dotenv");

dotenv.config();

const RABBITMQ_URL = process.env.RABBITMQ_URL;

const connectRabbitMQ = async () => {
  try {
    const connection = await amqp.connect(RABBITMQ_URL);
    console.log("Connected to RabbitMQ");
    return connection;
  } catch (error) {
    console.error("Failed to connect to RabbitMQ:", error);
    process.exit(1);
  }
};

module.exports = connectRabbitMQ;
