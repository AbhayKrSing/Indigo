const express = require('express');
const mongoose = require('mongoose');
const Flight = require('./Models/Flight.js');
// const { producer, sendNotification } = require('./kafkaProducer');

const app = express();
app.use(cors())
app.use(express.json());
mongoose.connect('mongodb+srv://AbhayKr:159753789@cluster0.xbf7abq.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0').then(() => {
    console.log("Db connected")
}).catch((error) => {
    console.log(error.message)
})

app.post('/update-flight', async (req, res) => {
    const { flightNumber, status, gate } = req.body;

    let flight = await Flight.findOne({ flightNumber });

    if (flight) {
        flight.status = status;
        flight.gate = gate;
        flight.lastUpdated = new Date();
        await flight.save();
    } else {
        flight = new Flight({ flightNumber, status, gate });
        await flight.save();
    }

    await sendNotification({ flightNumber, status, gate });
    res.status(200).json(flight);
});

app.get('/flights/:flightNumber', async (req, res) => {
    const flight = await Flight.findOne({ flightNumber: req.params.flightNumber });
    res.status(200).json(flight);
});

app.listen(3000, async () => {
    // await producer.connect();
    console.log('Server running on port 3000');
});
