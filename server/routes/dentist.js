const express = require('express');
const {
  check,
  validationResult
} = require('express-validator');
const jwt = require('jsonwebtoken');

const roles = require('../utils/roles');
const config = require('../config');

const router = express.Router();

const dentistController = require('../controllers/DentistController');

// TODO: REFACTOR dentistAuth

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

  if (decodedToken.role !== roles.DENTIST) {
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
 * GET dentists/dentist-details
 */
router.get('/dentist-details', dentistAuth, dentistController.getDentistDetails);

/**
 * PUT dentists/update-dentist-details
 */
router.put('/update-dentist-details',
  check('phone').isAlphanumeric().optional({checkFalsy: true}),
  check('description').isLength({max: 255}).optional({checkFalsy: true}),
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
  dentistController.updateDentistDetails
);


module.exports = router;
