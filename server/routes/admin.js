const express = require('express');
const jwt = require('jsonwebtoken');
const config = require('../config');
const AdminController = require('../controllers/AdminController');
const { body, check, validationResult } = require('express-validator');

const router = express.Router();


// TODO(ivaylo): Move middleware authentication
// into separate auth module
const adminAuth = (req, res, next) => {
  console.log(req.header('Authorization'));
  // Check for Authorization header
  const authHeader = req.header('Authorization') ? req.header('Authorization').split(' ') : null

  if (!authHeader) {
    return res.status(403).json({ status: 'error', statusmsg: 'Invalid auth token' });
  }

  // Check if authorization type is token
  if (authHeader[0] !== 'Token') {
    console.log('no auth token');
    return res.status(401).json({ status: 'error', statusmsg: 'Invalid auth token' });
  }

  //Check if token is valid
  const token = authHeader[1];

  if (!jwt.verify(token, config.JWT_SECRET)) {
    console.log('invalid token');
    return res.status(401).json({ status: 'error', statusmsg: 'Invalid auth token' });
  }

  const { role } = jwt.decode(token);

  if (role !== 1) {
    console.log('invalid role for admin');
    return res.status(401).json({ status: 'error', statusmsg: 'Invalid auth token' });
  }

  next();
};

router.get('/', (req, res) => { res.send('zdr'); });

/**
 * POST: /admin - Creates new admin
 */
router.post('/', adminAuth, AdminController.register);

/**
 * GET /admin/accounts - Get all accounts
 */
router.get('/accounts/:limit?', adminAuth, AdminController.getAllAccounts);


/**
 * POST /admin/accounts/:accountId/suspend - Suspend account
 * accountId - the id of the account to suspend
 */
router.post(
  '/accounts/suspend',
  adminAuth,
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

module.exports = router;
