const express = require('express');
const jwt = require('jsonwebtoken');

const db = require('../utils/db');

const DentistController = require('../controllers/DentistController');

const router = express.Router();

