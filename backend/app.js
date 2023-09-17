const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors'); // Import the cors package

const app = express();
const morgan = require('morgan');
app.use(morgan('dev'));
require('dotenv').config();
const db = require('./db/mongodb');

// Enable CORS for all routes (you can adjust origin, methods, and other options as needed)
app.use(cors());

app.use('/api', require('./routes/userRoutes'));

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
    console.log(`Server running on PORT ${PORT}`);
});
