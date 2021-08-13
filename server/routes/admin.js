const express = require('express');
const jwt = require('jsonwebtoken');

const db = require('../utils/db');

const AdminController = require('../controllers/AdminController');

const router = express.Router();

router.get('/', (req, res) => { res.send('zdr'); });
router.post('/', AdminController.register);

router.post('/login', AdminController.login);

router.get('/test', async (req, res) => {

  try {
    const result = await db.query('select * from role');
    console.log('result:');
    console.log(result.rows);
  } catch (error) {
    console.log(error);
    res.status(500).send('bajhuj');
  }
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
