const express = require('express');
const mongoose = require('mongoose');
const aiRoutes = require('./routes/ai.routes');
const cors = require('cors');

const app = express();

// MongoDB connection
mongoose.connect(process.env.MONGODB_URI)
    .then(() => console.log('Connected to MongoDB Atlas'))
    .catch(err => console.error('MongoDB connection error:', err));

// Updated CORS configuration
app.use(cors({
    origin: [
        'https://code-fix-bay.vercel.app',  // Your Vercel URL
        'http://localhost:5173'             // Local development
    ],
    methods: ['GET', 'POST', 'OPTIONS'],    // Include OPTIONS for preflight
    allowedHeaders: ['Content-Type', 'Authorization'],
    credentials: true
}));

app.use(express.json());

app.get('/', (req, res) => {
    res.send('Hello World');
});

app.use('/ai', aiRoutes);

module.exports = app;
