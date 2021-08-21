const express = require('express');
const jwt = require('jsonwebtoken');
const config = require('../config');
const AdminController = require('../controllers/AdminController');

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
    return res.status(401).json({ status: 'error', statusmsg: 'Invalid auth token' });
  }

  //Check if token is valid
  const token = authHeader[1];

  if (!jwt.verify(token, config.JWT_SECRET)) {
    return res.status(401).json({ status: 'error', statusmsg: 'Invalid auth token' });
  }

  const { roleId } = jwt.decode(token);

  if (roleId !== '1') {
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

module.exports = router;
