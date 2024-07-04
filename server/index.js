const express = require('express');
const port = 3000;
const bodyParser = require('body-parser');
const app = express();
const fs = require('fs');
const path = require('path');
const authRoutes = require('./routes/auth');
const taskRoutes = require('./routes/task');
const mongoose = require('mongoose');
const cors = require('cors');

// Log streams
const logStream = fs.createWriteStream(path.join(__dirname, 'log.txt'), { flags: 'a' });
const errorStream = fs.createWriteStream(path.join(__dirname, 'error.txt'), { flags: 'a' });

// Middleware
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cors());

// Routes
app.use('/api/auth', authRoutes);
app.use('/api', taskRoutes);

// Logger middleware
app.use((req, res, next) => {
    const now = new Date();
    const time = ` ${now.toLocaleTimeString()}`;
    const log = `${req.method} ${req.originalUrl} ${time}`;
    logStream.write(log + '\n');
    console.log(log);
    next();
});

// Error handling middleware
app.use((req, res, next) => {
    const now = new Date();
    const time = ` ${now.toLocaleTimeString()}`;
    const error = `${req.method} ${req.originalUrl} ${time}`;
    errorStream.write(error + '\n');
    res.status(404).send('Route not found');
});

// MongoDB connection
mongoose
    .connect('mongodb+srv://caps:Password@cluster1.9xljwe4.mongodb.net/?retryWrites=true&w=majority&appName=Cluster1')
    .then(() => console.log('Connected to DB'))
    .catch((err) => console.log(err));

// Start server
app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});
