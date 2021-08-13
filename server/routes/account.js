const express = require('express');
const { body, validationResult } = require('express-validator');

const router = express.Router();

const accountController = require('../controllers/AccountController');

/**
 * POST: /accounts - Register new user
 */
router.post(
  '/',
  body('firstName').isAlpha(),
  body('lastName').isAlpha(),
  body('email').isEmail(),
  body('password').isLength({ min: 5 }),
  body('role').isIn([2, 3]),
  (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    next();
  },
  accountController.register
);

/**
 * POST: /accounts/login - Authenticate user
 */
router.post('/login', accountController.login);

module.exports = router;