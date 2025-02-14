const express = require('express');
const mongoose = require('mongoose');
const aiRoutes = require('./routes/ai.routes');
const cors = require('cors');

const app = express();

// MongoDB connection
mongoose.connect(process.env.MONGODB_URI)
    .then(() => console.log('Connected to MongoDB Atlas'))
    .catch(err => console.error('MongoDB connection error:', err));

// Update CORS configuration
app.use(cors({
    origin: ['https://your-vercel-domain.vercel.app', 'http://localhost:5173'],
    methods: ['GET', 'POST'],
    credentials: true
}));

app.use(express.json());

app.get('/', (req, res) => {
    res.send('Hello World');
});

app.use('/ai', aiRoutes);

module.exports = app;
