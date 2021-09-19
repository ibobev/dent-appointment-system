const express = require('express');
const { body, validationResult } = require('express-validator');
const auth = require('../utils/auth');


const AdminController = require('../controllers/AdminController');

const router = express.Router();


/**
 * GET: /admins - Get all admin accounts
 */
router.get('/', auth.asAdmin, AdminController.getAdmins);

/**
 * POST: /admins - Creates new admin
 */
router.post('/', auth.asAdmin, AdminController.register);

/**
 * DELETE: /admins - Delete admin account
 */
router.delete('/:adminId', auth.asAdmin, AdminController.deleteAdmin);

/**
 * GET /admins/accounts - Get all accounts
 */
router.get('/accounts/:limit?', auth.asAdmin, AdminController.getAllAccounts);


/**
 * POST /admins/accounts/suspend - Suspend account
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
 * POST /admins/accounts/unsuspend - Unsuspend account
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
