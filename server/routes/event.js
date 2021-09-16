const express = require('express');

const auth = require('../utils/auth');

const router = express.Router();

const eventController = require('../controllers/EventController');

/**
 * GET events/
 */
router.get('/', eventController.getGlobalEvents);

/**
 * POST /events
 */
router.post('/', auth.asDentist, eventController.addGlobalEvent);

module.exports = router;
