import amqp from 'amqplib';
import { getWeather } from './weather.js';

// Simulate sending a message to the Python server via RabbitMQ
async function sendRPCMessage(message) {
  const connection = await amqp.connect('amqp://localhost');
  const channel = await connection.createChannel();

  await channel.assertQueue('rpc_queue', { durable: true });
  const correlationId = generateUuid();
  const resultPromise = new Promise((resolve) => {
    channel.consume('', (msg) => {
      if (msg.properties.correlationId === correlationId) {
        resolve(msg.content.toString());
      }
    }, { noAck: true });
  });

  await channel.assertQueue('rpc_queue');
  
  channel.sendToQueue('rpc_queue', Buffer.from(message), {
    correlationId,
    replyTo: 'rpc_queue',
  });

  return resultPromise;
}

function generateUuid() {
  return Math.random().toString() + Math.random().toString() + Math.random().toString();
}

export const getFilteredClothes = async (req, res) => {
    const { query } = req.query;

    sendRPCMessage(query)
    .then((response) => {
        console.log(`Received response from Python server: ${response}`);
        res.status(200).json(response);
    })
    .catch((error) => {
        res.status(404).json( {message : `Error communicating with Python server: ${error.message}`});
    });

}

export const getWeatherClothes = async (req, res) => {
  try {
    // Your other controller logic here...

    //const weatherData = await getWeather(req, res);

    // You can use the weatherData obtained from getWeather controller here...
    console.log("getweather");

    // Your other controller logic here...

    // Send a response back to the client
    res.status(200).json({ message: 'Other controller completed successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Internal server error' });
  }


}