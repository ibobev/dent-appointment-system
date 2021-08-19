const db = require('../utils/db');
const bcrypt = require('bcrypt');
const config = require('../config');

module.exports.register = async (req, res) => {
  const {
    firstName,
    lastName,
    email,
    password,
  } = req.body;
  const ROLE_ID = 1;

  if (!firstName || !lastName || !email || !password) {
    return res.status(400).send({ "status": "error", "error": 'Invalid request!' });
  }

  const hashedPassword = bcrypt.hashSync(password, config.BCRYPT_ROUNDS);

  // Check if Account exists
  const findQuery = 'select email from accounts where email=$1';
  const findValues = [email];

  try {
    const findAccountResult = await db.query(findQuery, findValues);

    if (findAccountResult.rows.length !== 0) {
      // Account exists
      res.status(400).json({ status: 'error', statusmsg: 'Admin is already registered' });
      return;
    }
  } catch (error) {
    console.log(error);
    res.status(500).json({ status: 'error', statusmsg: 'Internal server error!' });
    return;
  }

  // Save Account
  const createQuery = 'insert into accounts(first_name, last_name, email, pwd, role_id) values($1, $2, $3, $4, $5)';
  const createValues = [
    firstName,
    lastName,
    email,
    hashedPassword,
    ROLE_ID
  ];

  try {
    await db.query(createQuery, createValues);
  } catch (error) {
    console.log(error);
    return res.status(500).send({ status: 'error', statusmsg: 'Internal server error!' });
  }

  res.status(201).send({ status: 'success', statusmsg: 'Admin registered' });
};

module.exports.getAllAccounts = async (req, res) => {
  // Limit is not defined in the route
  // but can be passed as query string (?limit=10)
  // this is handled here
  const limit = parseInt(req.query.limit) || 1000;
  const getAccountsQuery = 'select id,email,first_name,last_name,created_at,role_id,status,strikes from accounts order by created_at desc limit $1';
  const getAccountsParams = [limit];
  let users = [];

  try {
    users = await db.query(getAccountsQuery, getAccountsParams);
    users = users.rows;
  } catch (error) {
    console.log(error);
    return res.status(500).json({ status: 'error', statusmsg: error.message });
  }

  res.json({ status: 'success', statusmsg: '', users });
};