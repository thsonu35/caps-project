const express = require('express');
const bodyParser = require('body-parser');
const fs = require('fs');
const path = require('path');
const mongoose = require('mongoose');
const cors = require('cors');
const authRoutes = require('./routes/auth');
const taskRoutes = require('./routes/task');
require('dotenv').config();

const app = express();
const port = process.env.PORT || 3000;

// Log streams
const errorStream = fs.createWriteStream(path.join(__dirname, 'error.txt'), { flags: 'a' });

// Middleware
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cors());

// Routes
app.use('/api/auth', authRoutes);
app.use('/api', taskRoutes);

// Error handling middleware
app.use((res) => {
    res.status(404).send('Route not found');
});

app.use((err, req, res) => {
    const now = new Date();
    const time = now.toLocaleTimeString();
    const error = `${req.method} ${req.originalUrl} ${time} - ${err.message}`;
    errorStream.write(error + '\n');
    console.error(error);
    res.status(500).send('Internal Server Error');
});

// MongoDB connection
mongoose
    .connect(process.env.MONGO_URI, )
    .then(() => console.log('Connected to DB'))
    .catch((err) => console.error('Failed to connect to DB:', err));

// Start server
app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});
