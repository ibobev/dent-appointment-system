const express = require('express');
const jwt = require('jsonwebtoken');

const db = require('../utils/db');

const AdminController = require('../controllers/AdminController');

const router = express.Router();

router.get('/', (req, res) => { res.send('zdr'); });
router.post('/', AdminController.register);

router.post('/login', AdminController.login);

module.exports = router;
