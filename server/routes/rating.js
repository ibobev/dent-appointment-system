const express = require('express');
const auth = require('../utils/auth');

const router = express.Router();

const ratingController = require('../controllers/RatingController');

/**
 * GET /ratings
 */

router.get('/patient/', auth.asPatient, ratingController.getPatientRating);

router.get('/dentist/', auth.asDentist, ratingController.getDentistRating);


/**
 * POST /ratings
 */

router.post('/patient', auth.asDentist, ratingController.ratePatient);

router.post('/dentist', auth.asPatient, ratingController.rateDentist);


module.exports = router;
