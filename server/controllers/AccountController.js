const db = require('../utils/db');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
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
  const findQuery = 'select email from accounts where email=$1';
  const findValues = [email];

  try {
    const findAccountResult = await db.query(findQuery, findValues);

    if (findAccountResult.rows.length !== 0) {
      // Account exists
      res.status(400).json({ status: 'error', statusmsg: 'Email is taken!' });
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
    role
  ];

  try {
    await db.query(createQuery, createValues);
    
  } catch (error) {
    console.log(error);
    return res.status(500).send({ status: 'error', statusmsg: 'Internal server error!' });
  }

  // Insert account by role in coresponding table
  const getAccountType = 'SELECT id, role_id FROM accounts WHERE email=$1';
  const accountEmail = [email];
  let accountDetails = null;
  let accountID = null;

  try {
    const queryResult = await db.query(getAccountType, accountEmail);
    accountDetails = queryResult.rows[0];
  } catch(error) {
    console.log(error);
    return res.status(500).send({ status: 'error', statusmsg: 'Internal server error!' });
  }

  accountID = [accountDetails.id];

  if (accountDetails.role_id === 2) {
    const insertDentist = 'INSERT INTO dentists(account_id) VALUES($1)';
    try {
      await db.query(insertDentist, accountID);
      return res.status(201).json({ status: 'success', statusmsg: 'Account created successfully!' });
    } catch (error) {
      console.log(error);
      return res.status(500).send({ status: 'error', statusmsg: 'Internal server error!' });
    }
  }
  
  if (accountDetails.role_id === 3) {
    const insertPatient = 'INSERT INTO patients(account_id) VALUES($1)';
    try {
      await db.query(insertPatient, accountID);
      return res.status(201).json({ status: 'success', statusmsg: 'Account created successfully!' });
    } catch (error) {
      console.log(error);
      return res.status(500).send({ status: 'error', statusmsg: 'Internal server error!' });
    }
  }

  //res.status(201).json({ status: 'success', statusmsg: 'Account created successfully!' });
  res.status(500).send({ status: 'error', statusmsg: 'Internal server error!' });

};

module.exports.login = async (req, res) => {
  const { email, password } = req.body;

  const findAccountQuery = 'select id, email, pwd, role_id from accounts where email=$1';
  const findAccountValues = [email];

  let foundAccount = null;
  try {
    const foundAccountResult = await db.query(findAccountQuery, findAccountValues);
    foundAccount = foundAccountResult.rows[0];

    if (foundAccountResult.rows.length === 0) {
      return res.status(400).json({ status: 'error', statusmsg: 'Invalid email or password!' });
    }
  } catch (error) {
    console.log(error);
    return res.status(500).json({ status: 'error', statusmsg: 'Internal error!' });
  }

  // Validate password
  try {
    const passwordsMatch = await bcrypt.compare(password, foundAccount.pwd);
    if (!passwordsMatch) {
      return res.status(400).json({ status: 'error', statusmsg: 'Invalid email or password!' });
    }
  } catch (error) {
    console.log(error);
    return res.status(500).json({ status: 'error', statusmsg: 'Internal error!' });
  }

  const tokenPayload = {
    id: foundAccount.id,
    email: foundAccount.email,
    role: foundAccount.role_id,
  };
  const token = jwt.sign(tokenPayload, config.JWT_SECRET, { expiresIn: '8h' });
  res.json({ status: 'success', statusmsg: '', token: token, role: foundAccount.role_id });
};

module.exports.getAccountDetails = async (req, res) => {
  const email = req.account.email;

  const result = await db.query('select * from accounts where email=$1', [email]);
  const account = result.rows[0];

  console.log(account);
  res.json({
    status: 'success',
    statusmsg: '',
    account: account
  });
};

module.exports.updateDentistAccount = async (req, res) => {
  const {
    firstName,
    lastName,
    email
  } = req.body;

  const id = req.account.id;
  if (firstName) {
    
  }

  if (lastName) {
    
  }

  if (email) {

  }
  

  console.log(req.body);
  
}

