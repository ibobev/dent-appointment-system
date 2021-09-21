const db = require('../utils/db');
const bcrypt = require('bcrypt');
const config = require('../config');
const roles = require('../utils/roles');

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

module.exports.getAccountData = async (req, res) => {
  const { accountId } = req.params;

  if (!accountId) {
    return res.status(400).json({ status: 'error', statusmsg: 'Invalid account id!' });
  }

  // Get account
  const GET_ACCOUNT_QUERY = 'select id,first_name,last_name,email,role_id,status,strikes,created_at from accounts where id=$1';
  let account = null;

  const getResp = await db.query(GET_ACCOUNT_QUERY, [accountId]);

  if (getResp.rows.length === 0) {
    return res.status(400).json({ status: 'error', statusmsg: 'Invalid account id!' });
  }

  account = getResp.rows[0];
  account.reviews = [];

  // If dentist get details
  if (account.role_id === roles.DENTIST) {
    account.details = await getDentistDetails(account.id);
    account.reviews = await getDentistReviews(account.id);
  }

  // Calculate rating
  account.rating = await calculateRating(account.role_id, account.id);
  account.type = account.role_id === roles.DENTIST ? 'Dentist' : 'Patient';

  console.log(account);

  res.json({ status: 'error', statusmsg: '', account: account });
};

async function getDentistDetails(dentistId) {
  const GET_DETAILS_QUERY = `
  select
    description,
    dentist_type,
    city,phone,
    work_from,
    work_to,
    work_days
  from dentists
  where account_id=$1
  `;
  const dentistDetails = await db.query(GET_DETAILS_QUERY, [dentistId]);
  return dentistDetails.rows[0];
}

async function getDentistReviews(dentistId) {
  const GET_REVIEWS_QUERY = `
  select
    accounts.id as patient_id,
    first_name,
    last_name,
    patient_comment,
    commented_on
  from accounts
  left join dentist_reviews
  on accounts.id=patient_id
  where dentist_reviews.dentist_id=$1
  `
  const dentistDetails = await db.query(GET_REVIEWS_QUERY, [dentistId]);
  return dentistDetails.rows;
}

async function calculateRating(accountType, accountId) {
  const TABLE = accountType === roles.DENTIST ? 'dentist_ratings' : 'patient_ratings';
  const CALC_QUERY = `select AVG(rating)::numeric(10,1) as account_rating from ${TABLE} where dentist_id=$1`;
  let rating = 0;

  try {
    const res = await db.query(CALC_QUERY, [accountId]);
    rating = res.rows[0]['account_rating'] || 0;
  } catch (error) {
    console.log(error);
  }
  
  return rating
}

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
