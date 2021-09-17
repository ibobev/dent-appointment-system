const express = require('express');
const router = express.Router();
const auth = require('../utils/auth');

const patientController = require('../controllers/PatientController');

router.get('/blacklist', auth.asPatient, patientController.getBlacklist);

module.exports = router;
