const express = require('express');
const router = express.Router();
const Flight = require('./models');

// Endpoint to get flight status
router.get('/flight-status/:flightNumber', async (req, res) => {
    try {
        const flightNumber = req.params.flightNumber;
        const flight = await Flight.findOne({ flightNumber });

        if (!flight) {
            return res.status(404).json({ message: 'Flight not found' });
        }

        res.json(flight);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

// Endpoint to update flight status
router.post('/update-flight', async (req, res) => {
    try {
        const { flightNumber, status, gate, departureTime, arrivalTime } = req.body;

        let flight = await Flight.findOne({ flightNumber });

        if (flight) {
            flight.status = status;
            flight.gate = gate;
            flight.departureTime = departureTime;
            flight.arrivalTime = arrivalTime;
            await flight.save();
        } else {
            flight = new Flight({ flightNumber, status, gate, departureTime, arrivalTime });
            await flight.save();
        }

        // Here you can add the code to send notifications via Kafka, RabbitMQ, etc.

        res.json(flight);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

module.exports = router;
