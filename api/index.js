import 'dotenv/config';
import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors';
import nodemailer from 'nodemailer';

import Contact from './models/Contact.js';
import Booking from './models/Booking.js';

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// Email Transporter
const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS
  }
});

const sendEmailNotification = async (type, data) => {
  // Check if email config exists
  if (!process.env.EMAIL_USER || !process.env.EMAIL_PASS) {
    console.log('Email configuration missing, skipping notification.');
    return;
  }

  const mailOptions = {
    from: process.env.EMAIL_USER,
    to: process.env.EMAIL_TO || process.env.EMAIL_USER,
    subject: `Mehran Royale - New ${type}: ${data.name}`,
    text: `
      You have received a new ${type.toLowerCase()} request.

      DETAILS:
      ---------------------------------
      Name: ${data.name}
      ${type === 'Booking' ? 'Phone' : 'Contact'}: ${data.phone || data.contactInfo}
      ${type === 'Booking' ? `Event Type: ${data.eventType}` : `Subject: ${data.subject}`}
      ${type === 'Booking' ? `Date: ${new Date(data.date).toLocaleDateString()}` : ''}
      ${type === 'Booking' ? `Guests: ${data.guests}` : ''}
      Message: ${data.message}
      ---------------------------------
      
      This is an automated notification from the Mehran Royale website.
    `
  };

  try {
    await transporter.sendMail(mailOptions);
    console.log(`${type} email notification sent.`);
  } catch (error) {
    console.error(`Error sending ${type} email:`, error);
  }
};

// Database Connection (Serverless optimized)
let cachedDb = null;
const connectDB = async () => {
  if (cachedDb) return cachedDb;
  try {
    const db = await mongoose.connect(process.env.MONGO_URI);
    cachedDb = db;
    console.log('MongoDB connected');
    return db;
  } catch (err) {
    console.error('MongoDB connection error:', err);
    throw err;
  }
};

// Routes

// 1. Submit Contact Form
app.post('/api/contact', async (req, res) => {
  try {
    await connectDB();
    const { name, contactInfo, subject, message } = req.body;
    if (!name || !contactInfo || !message) {
      return res.status(400).json({ error: 'Please provide all required fields.' });
    }
    const newContact = new Contact({ name, contactInfo, subject, message });
    await newContact.save();
    
    // Wait for email notification to finish
    await sendEmailNotification('Contact Form', { name, contactInfo, subject, message });

    res.status(201).json({ message: 'Contact message sent successfully!' });
  } catch (error) {
    res.status(500).json({ error: 'Server error while submitting contact form.' });
  }
});

// 2. Submit Booking Request
app.post('/api/booking', async (req, res) => {
  try {
    await connectDB();
    const { name, phone, eventType, date, guests, message } = req.body;
    if (!name || !phone || !eventType || !date || !guests) {
      return res.status(400).json({ error: 'Please provide all required fields.' });
    }

    const startOfDay = new Date(date);
    startOfDay.setHours(0, 0, 0, 0);
    const endOfDay = new Date(date);
    endOfDay.setHours(23, 59, 59, 999);

    const existingBooking = await Booking.findOne({
      date: { $gte: startOfDay, $lte: endOfDay },
      status: { $in: ['pending', 'confirmed'] }
    });

    if (existingBooking) {
      return res.status(400).json({ error: 'This date is already booked. Please choose another date.' });
    }

    const newBooking = new Booking({ name, phone, eventType, date, guests, message });
    await newBooking.save();

    // Wait for email notification to finish
    await sendEmailNotification('Booking', { name, phone, eventType, date, guests, message });

    res.status(201).json({ message: 'Booking request submitted successfully!' });
  } catch (error) {
    res.status(500).json({ error: 'Server error while submitting booking.' });
  }
});

// 3. Get Booked Dates
app.get('/api/booking/booked-dates', async (req, res) => {
  try {
    await connectDB();
    const bookings = await Booking.find({
      status: { $in: ['pending', 'confirmed'] }
    }).select('date');
    const bookedDates = bookings.map(booking => booking.date);
    res.status(200).json(bookedDates);
  } catch (error) {
    res.status(500).json({ error: 'Server error while fetching booked dates.' });
  }
});

// --- ADMIN ROUTES ---

app.get('/api/admin/bookings', async (req, res) => {
  try {
    await connectDB();
    const bookings = await Booking.find().sort({ date: 1 });
    res.status(200).json(bookings);
  } catch (error) {
    res.status(500).json({ error: 'Server error while fetching bookings.' });
  }
});

app.get('/api/admin/contacts', async (req, res) => {
  try {
    await connectDB();
    const contacts = await Contact.find().sort({ createdAt: -1 });
    res.status(200).json(contacts);
  } catch (error) {
    res.status(500).json({ error: 'Server error while fetching contacts.' });
  }
});

app.patch('/api/admin/bookings/:id', async (req, res) => {
  try {
    await connectDB();
    const { status } = req.body;
    const updatedBooking = await Booking.findByIdAndUpdate(req.params.id, { status }, { new: true });
    res.status(200).json(updatedBooking);
  } catch (error) {
    res.status(500).json({ error: 'Server error while updating booking.' });
  }
});

app.delete('/api/admin/bookings/:id', async (req, res) => {
  try {
    await connectDB();
    await Booking.findByIdAndDelete(req.params.id);
    res.status(200).json({ message: 'Booking deleted.' });
  } catch (error) {
    res.status(500).json({ error: 'Server error while deleting booking.' });
  }
});

app.delete('/api/admin/contacts/:id', async (req, res) => {
  try {
    await connectDB();
    await Contact.findByIdAndDelete(req.params.id);
    res.status(200).json({ message: 'Contact deleted.' });
  } catch (error) {
    res.status(500).json({ error: 'Server error while deleting contact.' });
  }
});

if (process.env.NODE_ENV !== 'production') {
  const PORT = process.env.PORT || 5000;
  app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
  });
}

export default app;
