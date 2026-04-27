const mongoose = require('mongoose');

const bookingSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  phone: {
    type: String,
    required: true
  },
  eventType: {
    type: String,
    required: true
  },
  date: {
    type: Date,
    required: true
  },
  guests: {
    type: Number,
    required: true
  },
  message: {
    type: String
  },
  status: {
    type: String,
    enum: ['pending', 'confirmed', 'cancelled'],
    default: 'pending' // For simplicity we might just block 'pending' and 'confirmed' or just all incoming bookings as requested.
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
});

module.exports = mongoose.model('Booking', bookingSchema);
