const db = require('../utils/db');
const bcrypt = require('bcrypt');
const config = require('../config');

module.exports.getAdmins = async (req, res) => {
  const { account } = req;

  const GET_QUERY = 'select id,first_name,last_name,email,status,created_at from accounts where role_id=1 and id != $1 order by created_at desc';
  try {
    const result = await db.query(GET_QUERY, [account.id]);

    res.json({ status: 'success', statusmsg: '', admins: result.rows });
  } catch (error) {
    console.log(error);
    return res.status(500).send({ status: 'error', statusmsg: 'Internal server error!' });
  }
};

module.exports.register = async (req, res) => {
  const {
    firstName,
    lastName,
    email,
    password,
  } = req.body;
  const ROLE_ID = 1;

  if (!firstName || !lastName || !email || !password) {
    return res.status(400).send({ status: 'error', statusmsg: 'Invalid request!' });
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
  const getAccountsQuery = 'select id,email,first_name,last_name,created_at,role_id,status,strikes from accounts where role_id != 1 order by created_at desc limit $1';
  const getAccountsParams = [limit];
  let accounts = [];

  try {
    accounts = await db.query(getAccountsQuery, getAccountsParams);
    accounts = accounts.rows;
  } catch (error) {
    console.log(error);
    return res.status(500).json({ status: 'error', statusmsg: error.message });
  }

  res.json({ status: 'success', statusmsg: '', accounts: accounts });
};


module.exports.suspendAccount = async (req, res) => {
  const { accountId } = req.body;

  const FIND_ACCOUNT_QUERY = 'select id from accounts where id=$1';


  // Check if account with given id exists
  const queryResult = await db.query(FIND_ACCOUNT_QUERY, [accountId]);

  if (queryResult.rows.length === 0) {
    return res.status(400).json({ status: 'error', statusmsg: 'No account found with the given id!'});
  }

  // Suspend account
  const SUSPEND_ACCOUNT_QUERY = "update accounts set status='Suspended' where id=$1";

  try {
    await db.query(SUSPEND_ACCOUNT_QUERY, [accountId]);
  } catch (error) {
    console.log(error);
    return res.status(500).json({ status: 'error', statusmsg: 'Error occurred while suspending account!' });
  }

  res.json({ status: 'success', statusmsg: 'Account suspended!' });
};

module.exports.unsuspendAccount = async (req, res) => {
  const { accountId } = req.body;

  const FIND_ACCOUNT_QUERY = 'select id from accounts where id=$1';


  // Check if account with given id exists
  const queryResult = await db.query(FIND_ACCOUNT_QUERY, [accountId]);

  if (queryResult.rows.length === 0) {
    return res.status(400).json({ status: 'error', statusmsg: 'No account found with the given id!'});
  }

  // Unsuspedn account
  const UNSUSPEND_ACCOUNT_QUERY = "update accounts set status='Active' where id=$1";

  try {
    await db.query(UNSUSPEND_ACCOUNT_QUERY, [accountId]);
  } catch (error) {
    console.log(error);
    return res.status(500).json({ status: 'error', statusmsg: 'Error occurred while unsuspending account!' });
  }

  res.json({ status: 'success', statusmsg: 'Account unsuspended!' });
};

module.exports.deleteAdmin = async (req, res) => {
  const { adminId } = req.params;

  const DELETE_QUERY = 'delete from accounts where id=$1 and role_id=1';

  try {
    await db.query(DELETE_QUERY, [adminId]);
    res.json({ status: 'success', statusmsg: 'Admin account deleted!' });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ status: 'error', statusmsg: 'Error occurred while unsuspending account!' });
  }
};
