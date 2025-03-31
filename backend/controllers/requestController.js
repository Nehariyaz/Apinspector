const amqp = require("amqplib");
const { Request, TestCase } = require("../models");

const RABBITMQ_URL = "amqp://localhost:5672";
const QUEUE_NAME = "api_requests";

const createRequest = async (req, res) => {
  const { method, url, headers, body } = req.body;
  const userId = req.user.id; 

  try {
    
    const newRequest = await Request.create({
      method,
      url,
      headers: JSON.stringify(headers),
      body: JSON.stringify(body),
      userId,
      status: "pending",
    });

    
    const connection = await amqp.connect(RABBITMQ_URL);
    const channel = await connection.createChannel();
    await channel.assertQueue(QUEUE_NAME, { durable: false });

    
    const replyQueue = await channel.assertQueue("", { exclusive: true });
    const correlationId = newRequest.id; 


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

    
    const requestData = {
      id: newRequest.id, 
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
    console.log("Request sent to queue:", requestData);


    const apiResponse = await responsePromise;


    await channel.close();
    await connection.close();


    res.status(200).json({
      status: apiResponse.status,
      message: apiResponse.message,
    });


  } catch (error) {
    console.error("Error processing request:", error);
    res.status(500).json({ error: "Error processing request" });
  }
};

const saveRequest = async (req,res) => {
  const {name, method, url, body, headers } = req.body;
  const userId = req.user.id;


  try{

    const newRequest = await TestCase.create({
      name,
      method,
      url,
      headers: JSON.stringify(headers),
      body: JSON.stringify(body),
      userId,
      status: "pending",
    });

    return res.status(201).json({ message: "TestCase saved successfully" });

  }catch(error){
    console.error("Error processing request:", error);
    res.status(500).json({ error: "Error processing request" });
  }

  
}


module.exports = {
  createRequest,
  saveRequest,
};