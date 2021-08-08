const express = require("express");

const app = express();

const PORT = process.env.PORT || 5000;

// Middleware
app.use(express.json());

// Routes
app.get('/', (req, res) => {
    res.send("Raboti");
});

// Server
app.listen(PORT, () => {
    console.log(`Express started on port ${PORT}; Press Ctrl+C to terminate...`);
});