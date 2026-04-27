require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');

const Contact = require('./models/Contact');
const Booking = require('./models/Booking');

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// Database Connection
mongoose.connect(process.env.MONGO_URI || 'mongodb://localhost:27017/mehran_royale')
  .then(() => console.log('MongoDB connected'))
  .catch(err => console.log('MongoDB connection error:', err));

// Routes

// 1. Submit Contact Form
app.post('/api/contact', async (req, res) => {
  try {
    const { name, contactInfo, subject, message } = req.body;
    
    if (!name || !contactInfo || !message) {
      return res.status(400).json({ error: 'Please provide all required fields.' });
    }

    const newContact = new Contact({ name, contactInfo, subject, message });
    await newContact.save();

    res.status(201).json({ message: 'Contact message sent successfully!' });
  } catch (error) {
    console.error('Contact submission error:', error);
    res.status(500).json({ error: 'Server error while submitting contact form.' });
  }
});

// 2. Submit Booking Request
app.post('/api/booking', async (req, res) => {
  try {
    const { name, phone, eventType, date, guests, message } = req.body;

    if (!name || !phone || !eventType || !date || !guests) {
      return res.status(400).json({ error: 'Please provide all required fields.' });
    }

    // Check if the date is already booked (assuming any existing booking blocks the date)
    // We can normalize the date to ignore time for checking availability
    const startOfDay = new Date(date);
    startOfDay.setHours(0, 0, 0, 0);
    const endOfDay = new Date(date);
    endOfDay.setHours(23, 59, 59, 999);

    const existingBooking = await Booking.findOne({
      date: { $gte: startOfDay, $lte: endOfDay },
      status: { $in: ['pending', 'confirmed'] } // Assuming both block the date
    });

    if (existingBooking) {
      return res.status(400).json({ error: 'This date is already booked. Please choose another date.' });
    }

    const newBooking = new Booking({ name, phone, eventType, date, guests, message });
    await newBooking.save();

    res.status(201).json({ message: 'Booking request submitted successfully!' });
  } catch (error) {
    console.error('Booking submission error:', error);
    res.status(500).json({ error: 'Server error while submitting booking.' });
  }
});

// 3. Get Booked Dates
app.get('/api/booking/booked-dates', async (req, res) => {
  try {
    // Find all bookings that are not cancelled
    const bookings = await Booking.find({
      status: { $in: ['pending', 'confirmed'] }
    }).select('date');

    const bookedDates = bookings.map(booking => booking.date);
    res.status(200).json(bookedDates);
  } catch (error) {
    console.error('Fetch booked dates error:', error);
    res.status(500).json({ error: 'Server error while fetching booked dates.' });
  }
});

// --- ADMIN ROUTES ---

// Get all bookings
app.get('/api/admin/bookings', async (req, res) => {
  try {
    const bookings = await Booking.find().sort({ date: 1 });
    res.status(200).json(bookings);
  } catch (error) {
    res.status(500).json({ error: 'Server error while fetching bookings.' });
  }
});

// Get all contact inquiries
app.get('/api/admin/contacts', async (req, res) => {
  try {
    const contacts = await Contact.find().sort({ createdAt: -1 });
    res.status(200).json(contacts);
  } catch (error) {
    res.status(500).json({ error: 'Server error while fetching contacts.' });
  }
});

// Update booking status
app.patch('/api/admin/bookings/:id', async (req, res) => {
  try {
    const { status } = req.body;
    const updatedBooking = await Booking.findByIdAndUpdate(
      req.params.id, 
      { status }, 
      { new: true }
    );
    res.status(200).json(updatedBooking);
  } catch (error) {
    res.status(500).json({ error: 'Server error while updating booking.' });
  }
});

// Delete a booking
app.delete('/api/admin/bookings/:id', async (req, res) => {
  try {
    await Booking.findByIdAndDelete(req.params.id);
    res.status(200).json({ message: 'Booking deleted.' });
  } catch (error) {
    res.status(500).json({ error: 'Server error while deleting booking.' });
  }
});

// Delete a contact inquiry
app.delete('/api/admin/contacts/:id', async (req, res) => {
  try {
    await Contact.findByIdAndDelete(req.params.id);
    res.status(200).json({ message: 'Contact deleted.' });
  } catch (error) {
    res.status(500).json({ error: 'Server error while deleting contact.' });
  }
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));

