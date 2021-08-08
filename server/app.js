const express = require('express');
const cookieParser = require('cookie-parser');

const app = express();

const PORT = process.env.PORT || 5000;

const adminRoutes = require('./routes/admin');

// Init dotenv
require('dotenv').config();


// Middleware
app.use(cookieParser());
app.use(express.json({ extended: true }));

// Routes
app.get('/', (req, res) => {
    res.send("Raboti");
});

app.use('/apiv1', adminRoutes);


// Server
app.listen(PORT, () => {
    console.log(`Express started on port ${PORT}; Press Ctrl+C to terminate...`);
});
