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
 * PATCH: /admins - Changes admin password
 * Params: newPassword, oldPassword, adminId
 * If no adminId is present admin changes its own password
 * If adminId present, oldPassword is not required
 */
router.patch('/', auth.asAdmin, AdminController.changePassword);

/**
 * DELETE: /admins - Delete admin account
 */
router.delete('/:adminId', auth.asAdmin, AdminController.deleteAdmin);

/**
 * GET /admins/accounts - Get all accounts
 */
router.get('/accounts/:limit?', auth.asAdmin, AdminController.getAllAccounts);

/**
 * GET /admins/account/:accountId - Get all account's information 
 * Gets all information about an account with given id
 */
router.get('/account/:accountId', auth.asAdmin, AdminController.getAccountData);

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
