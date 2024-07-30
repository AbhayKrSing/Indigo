const { Kafka } = require('kafkajs');

const kafka = new Kafka({
    clientId: 'flight-status-app',
    brokers: ['localhost:9092']
});

const producer = kafka.producer();

const sendNotification = async (message) => {
    await producer.send({
        topic: 'flight-status',
        messages: [
            { value: JSON.stringify(message) },
        ],
    });
};

module.exports = { producer, sendNotification };
