const db = require('../utils/db');
const config = require('../config');
const jwt = require('jsonwebtoken');

module.exports.getTest = async (req, res) => {
    const email = req.account.email;
  
    const result = await db.query('select * from accounts where email=$1', [email]);
    const dentist = result.rows[0];
  
    console.log(dentist);
    res.json({ status: 'success', statusmsg: '', dentist: dentist });
  };