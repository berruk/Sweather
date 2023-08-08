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

    const weatherData = await getWeather();
    console.log(weatherData);

  } catch (error) {
  }


}