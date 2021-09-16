const express = require('express');
const auth = require('../utils/auth');

const router = express.Router();

const reviewController = require('../controllers/ReviewController');

/**
 * GET /reviews
 */
router.get('/:d_id', reviewController.getReviews);

router.get('/', auth.asDentist, reviewController.getReviewsDentist);

/**
 * POST /reviews
 */

router.post('/', auth.asPatient, reviewController.reviewDentist);


module.exports = router;
