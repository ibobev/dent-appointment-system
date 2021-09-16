const express = require('express');
const {
  body,
  check,
  validationResult
} = require('express-validator');
const auth = require('../utils/auth');

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
  body('password').isLength({
    min: 5
  }),
  body('role').isIn([2, 3]),
  (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({
        errors: errors.array()
      });
    }
    next();
  },
  accountController.register
);

/**
 * POST: /accounts/login - Authenticate user
 */
router.post(
  '/login',
  body('email').isEmail(),
  (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({
        errors: errors.array()
      });
    }
    next();
  },
  accountController.login
);

/**
 * GET /profile - Authenticate account
 */
router.get('/profile', auth.asAll, accountController.getAccountDetails);

/**
 * PUT accounts/update-account - Update dentist account details with auth and validation
 */
router.put(
  '/update-account',
  check('firstName').isAlpha().optional({checkFalsy: true}),
  check('lastName').isAlpha().optional({checkFalsy: true}),
  check('email').isEmail().optional({checkFalsy: true}),
  (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({
        errors: errors.array()
      });
    }
    next();
  },
  auth.asAll,
  accountController.updateAccount
);


/**
 * PUT accounts/change-password - Change account password
 */
router.put(
  '/change-password',
  body('oldPass').not().isEmpty(),
  body('newPass').not().isEmpty(),
  body('confirmPass').not().isEmpty(),
  (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({
        errors: errors.array()
      });
    }
    next();
  },
  auth.asAll,
  accountController.changePassword
);






module.exports = router;
