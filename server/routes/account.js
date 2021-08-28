const express = require('express');
const {
  body,
  check,
  validationResult
} = require('express-validator');
const jwt = require('jsonwebtoken');
const config = require('../config');

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

const dentistAuth = (req, res, next) => {
  console.log(req.header('Authorization'));
  // Check for Authorization header
  const authHeader = req.header('Authorization') ? req.header('Authorization').split(' ') : null
  console.log(authHeader);
  if (!authHeader) {
    return res.status(403).json({
      status: 'error',
      statusmsg: 'Invalid auth token'
    });
  }

  // Check if authorization type is token
  if (authHeader[0] !== 'Token') {
    return res.status(401).json({
      status: 'error',
      statusmsg: 'Invalid auth token'
    });
  }

  //Check if token is valid
  const token = authHeader[1];

  if (!jwt.verify(token, config.JWT_SECRET)) {
    console.log('JWT says token not valid');
    return res.status(401).json({
      status: 'error',
      statusmsg: 'Invalid auth token'
    });
  }

  const decodedToken = jwt.decode(token);

  if (decodedToken.role !== 2) {
    console.log('INVALID ROLE', decodedToken.role);
    return res.status(401).json({
      status: 'error',
      statusmsg: 'Invalid auth token'
    });
  }

  req.account = decodedToken;
  next();
};

/**
 * GET /dentist-profile - Authenticate dentist account
 */
router.get('/dentist-profile', dentistAuth, accountController.getAccountDetails);

/**
 * PUT accounts/update-detist-account - Update dentist account details with auth and validation
 */
router.put(
  '/update-dentist-account',
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
  dentistAuth,
  accountController.updateDentistAccount
);







module.exports = router;