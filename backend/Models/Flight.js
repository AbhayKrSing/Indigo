const mongoose = require('mongoose');

const flightSchema = new mongoose.Schema({
    flightNumber: String,
    status: String, // e.g., 'On Time', 'Delayed', 'Cancelled'
    gate: String,
    lastUpdated: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Flight', flightSchema);
