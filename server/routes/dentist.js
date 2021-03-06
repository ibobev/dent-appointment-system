const express = require('express');
const {
  check,
  validationResult
} = require('express-validator');
const auth = require('../utils/auth');

const router = express.Router();

const dentistController = require('../controllers/DentistController');


/**
 * GET /dentists
 * Get all dentists public info
 */
router.get('/', auth.asAll, dentistController.getAll);

/**
 * GET dentists/details
 */
router.get('/details/', auth.asDentist, dentistController.getDentistDetails);

router.get('/details/:id', dentistController.getSelectedDentistFullDetails);

/**
 * PUT dentists/details
 */
router.put('/details',
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
  auth.asDentist,
  dentistController.updateDentistDetails
);

/**
 * PUT dentists/schedule
 */
router.put('/schedule', auth.asDentist, dentistController.updateWorkDetails);

/**
 * GET dentists/blacklist
 * Get all blacklisted patients
 */
router.get('/blacklist', auth.asDentist, dentistController.getBlacklist);

/**
 * DELETE dentists/blacklist/:patientId
 * :patientId - the id of the patient to be removed from blacklist
 * Remove patient from dentist's blacklist
 */
router.delete('/blacklist/:patientId', auth.asDentist, dentistController.removeFromBlacklist);

module.exports = router;
