const express = require('express');
const jwt = require('jsonwebtoken');

const AdminController = require('../controllers/AdminController');

const router = express.Router();

router.get('/admins', (req, res) => { res.send('zdr'); });
router.post('/admins', AdminController.register);

router.post('/admins/login', AdminController.login);

router.get('/admins/test', (req, res) => {
  console.log(req.headers['authorization']);
  console.log(req.cookies); 
  const { token } = req.cookies;

  if (!token) {
    res.status(400).send({"status": "error", "statusmsg": "No token provided!"});
    return;
  }

  try {
    jwt.verify(token, process.env.TOKEN_SECRET);
  } catch (error) {
    console.log(error.message); 
    res.status(400).send({"status": "error", "statusmsg": "Invalid token"}); 
    return; 
  }

  res.send('ok');

});

module.exports = router;
