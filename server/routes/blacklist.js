const express = require('express');
const auth = require('../utils/auth');
const {
  body,
  validationResult
} = require('express-validator');

const router = express.Router();

const BlacklistController = require('../controllers/BlacklistController');


router.get('/patients', BlacklistController.getBlacklistedPatients);

router.get('/dentists', BlacklistController.getBlacklistedDentists);


// Blacklist dentist as a patient
router.post(
  '/dentist',
  auth.asPatient,
  body('dentistId').isNumeric(),
  body('reason').isString(),
  (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({
        errors: errors.array()
      });
    }
    next();
  },
  BlacklistController.blacklistDentist
);

// Blacklist patient as a dentist
router.post(
  '/patient',
  auth.asDentist,
  body('patientId').isNumeric(),
  body('reason').isString(),
  (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({
        errors: errors.array()
      });
    }
    next();
  },
  BlacklistController.blacklistPatient
);

module.exports = router;
