const express = require('express');
const {
  check,
  validationResult
} = require('express-validator');
const jwt = require('jsonwebtoken');
const config = require('../config');

const router = express.Router();

const patientController = require('../controllers/PatientController');


module.exports = router;