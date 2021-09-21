const express = require('express');
const cookieParser = require('cookie-parser');
const config = require('./config');
const cronJobs = require('./utils/cronJobs');

const app = express();

const PORT = process.env.PORT || config.PORT || 5000;

const adminRoutes = require('./routes/admin');
const accountRoutes = require('./routes/account');
const dentistRoutes = require('./routes/dentist');
const patientRoutes = require('./routes/patient');
const eventRoutes = require('./routes/event');
const appointmentRoutes = require('./routes/appointment');
const medicalRecordRoutes = require('./routes/medical-record');
const ratingRoutes = require('./routes/rating');
const reviewRoutes = require('./routes/review');
const blacklistRoutes = require('./routes/blacklist');

// Middleware
app.use(cookieParser());
app.use(express.json({ extended: true }));

// Cron jobs
cronJobs;

// Routes
app.use('/api/v1/admins', adminRoutes);
app.use('/api/v1/accounts', accountRoutes);
app.use('/api/v1/dentists', dentistRoutes);
app.use('/api/v1/patients', patientRoutes);
app.use('/api/v1/events', eventRoutes);
app.use('/api/v1/appointments', appointmentRoutes);
app.use('/api/v1/medical-records', medicalRecordRoutes);
app.use('/api/v1/ratings', ratingRoutes);
app.use('/api/v1/reviews', reviewRoutes);
app.use('/api/v1/blacklist', blacklistRoutes);

// Server
app.listen(PORT, () => {
    console.log(`Express started on port ${PORT}; Press Ctrl+C to terminate...`);
});
