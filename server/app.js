const express = require('express');
const cookieParser = require('cookie-parser');
const config = require('./config');

const app = express();

const PORT = process.env.PORT || config.PORT || 5000;

const adminRoutes = require('./routes/admin');
const accountRoutes = require('./routes/account');
const dentistRoutes = require('./routes/dentist');

// Middleware
app.use(cookieParser());
app.use(express.json({ extended: true }));

// Routes
app.get('/', (req, res) => {
    res.send("Raboti");
});

app.use('/api/v1/admins', adminRoutes);
app.use('/api/v1/accounts', accountRoutes);
app.use('/api/v1/dentists', dentistRoutes);


// Server
app.listen(PORT, () => {
    console.log(`Express started on port ${PORT}; Press Ctrl+C to terminate...`);
});
