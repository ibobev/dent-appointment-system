const db = require('../utils/db');
const bcrypt = require('bcrypt');
const config = require('../config');

module.exports.register = async (req, res) => {
  const {
    firstName,
    lastName,
    email,
    password,
    role,
  } = req.body;

  const hashedPassword = bcrypt.hashSync(password, config.BCRYPT_ROUNDS);

  // Check if Account exists
  const findQuery = 'select email from account where email=$1';
  const findValues = [email];

  try {
    const findAccountResult = await db.query(findQuery, findValues);

    if (findAccountResult.rows.length !== 0) {
      // Account exists
      res.status(400).json({ status: 'error', statusmsg: 'Account already exists!' });
      return;
    }
  } catch (error) {
    console.log(error);
    res.status(500).json({ status: 'error', statusmsg: 'Internal server error!'});
    return;
  }

  // Save Account
  const createQuery = 'insert into account(first_name, last_name, email, password, role_id) values($1, $2, $3, $4, $5)';
  const createValues = [
    firstName,
    lastName,
    email,
    hashedPassword,
    role
  ];

  try {
    await db.query(createQuery, createValues);
  } catch (error) {
    console.log(error);
    return res.status(500).send({ status: 'error', statusmsg: 'Internal server error!' });
  }

  res.status(201).json({ status: 'success', statusmsg: 'Account created successfully!' });
};

module.exports.login = async (req, res) => {

};

