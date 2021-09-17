const express = require('express');
const {
  check,
  validationResult
} = require('express-validator');
const jwt = require('jsonwebtoken');

const roles = require('../utils/roles');
const config = require('../config');
const auth = require('../utils/auth');

const router = express.Router();

const medicalRecordController = require('../controllers/MedicalRecordController');

/**
 * GET /medical-records
 */
router.get('/dentists', auth.asPatient, medicalRecordController.getDentists);

router.get('/dentists/:d_id', auth.asPatient, medicalRecordController.getPatientMedicalRecordByDentist);

router.get('/:p_id', auth.asDentist, medicalRecordController.getPatientMedicalRecord);

router.get('/', auth.asDentist, medicalRecordController.getPatients);

/**
 * POST /medical-records
 */

router.post('/', auth.asDentist, medicalRecordController.createRecord);

module.exports = router;
