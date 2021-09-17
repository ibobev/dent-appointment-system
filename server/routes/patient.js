const express = require('express');
const router = express.Router();
const auth = require('../utils/auth');

const patientController = require('../controllers/PatientController');

/**
 * GET /api/v1/patients/blacklist
 * Get all blacklisted dentsits for a patient
 * patient data is in token
 */
router.get('/blacklist', auth.asPatient, patientController.getBlacklist);

/**
 * DELETE /api/v1/patients/blacklist/:dentistId
 * :dentistId - the id of the dentist to be removed from blacklist
 * Remove dentist from patient's blacklist
 */
router.delete('/blacklist/:dentistId', auth.asPatient, patientController.removeFromBlacklist);

module.exports = router;
