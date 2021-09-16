const express = require('express');
const auth = require('../utils/auth');

const router = express.Router();

const ratingController = require('../controllers/RatingController');

/**
 * GET /ratings
 */


/**
 * POST /ratings
 */

router.post('/patient', auth.asDentist, ratingController.ratePatient);

router.post('/dentist', auth.asPatient, ratingController.rateDentist);


module.exports = router;
