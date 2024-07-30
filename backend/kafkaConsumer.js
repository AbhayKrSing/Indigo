const { Kafka } = require('kafkajs');

const kafka = new Kafka({
    clientId: 'flight-status-app',
    brokers: ['localhost:9092']
});

const consumer = kafka.consumer({ groupId: 'flight-status-group' });

const run = async () => {
    await consumer.connect();
    await consumer.subscribe({ topic: 'flight-status', fromBeginning: true });

    await consumer.run({
        eachMessage: async ({ topic, partition, message }) => {
            const notification = JSON.parse(message.value.toString());
            console.log(`Received notification: ${notification}`);
            // Add your notification logic here (e.g., send email/SMS)
        },
    });
};

run().catch(console.error);
