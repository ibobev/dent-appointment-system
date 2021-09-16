const express = require('express');
const { body, validationResult } = require('express-validator');
const auth = require('../utils/auth');


const AdminController = require('../controllers/AdminController');

const router = express.Router();


router.get('/', (req, res) => { res.send('zdr'); });

/**
 * POST: /admin - Creates new admin
 */
router.post('/', auth.asAdmin, AdminController.register);

/**
 * GET /admin/accounts - Get all accounts
 */
router.get('/accounts/:limit?', auth.asAdmin, AdminController.getAllAccounts);


/**
 * POST /admin/accounts/suspend - Suspend account
 * accountId - the id of the account to suspend
 */
router.post(
  '/accounts/suspend',
  auth.asAdmin,
  body('accountId').isNumeric(),
  (req, res, next) => {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    next();
  },
  AdminController.suspendAccount
);

/**
 * POST /admin/accounts/unsuspend - Unsuspend account
 * accountId - the id of the account to suspend
 */
router.post(
  '/accounts/unsuspend',
  auth.asAdmin,
  body('accountId').isNumeric(),
  (req, res, next) => {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    next();
  },
  AdminController.unsuspendAccount
);
module.exports = router;
