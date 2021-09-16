const db = require('../utils/db');

module.exports.blacklistPatient = async function(req, res) {
  const { account } = req;
  const { patientId, reason } = req.body;

  let patientStrikes;
  try {
    patientStrikes = await updateAccountStrikes(patientId);
  } catch (error) {
    console.log(error);
    // TODO: Check if error is not Account not found
    return res.status(500).json({ status: 'error', statusmsg: 'Internal server error!' });
  }


  if (patientStrikes >= 4) {
    // The client doesnt care 
    // if we suspenede the account or not
    suspendAccount(patientId)
      .catch(error => console.log(error));
  }

  const BLACKLIST_TABLE = 'patients';
  await addAccountToBlacklist(BLACKLIST_TABLE, account.id, patientId, reason); 

  res.status(201).json({ status: 'success', statusmsg: 'Account is blacklisted!' });
};

module.exports.blacklistDentist = async function(req, res) {
  const { account } = req;
  const { dentistId, reason } = req.body;

  let dentistStrikes;
  try {
    dentistStrikes = await updateAccountStrikes(dentistId);
  } catch (error) {
    console.log(error);
    // TODO: Check if error is not Account not found
    return res.status(500).json({ status: 'error', statusmsg: 'Internal server error!' });
  }


  if (dentistStrikes >= 4) {
    // The client doesnt care 
    // if we suspenede the account or not
    suspendAccount(dentistId)
      .catch(error => console.log(error));
  }

  const BLACKLIST_TABLE = 'dentists';
  await addAccountToBlacklist(BLACKLIST_TABLE, account.id, dentistId, reason); 

  res.status(201).json({ status: 'success', statusmsg: 'Account is blacklisted!' });
};

async function updateAccountStrikes(accountId) {
  const UPDATE_QUERY = 'update accounts set strikes = strikes + 1 where id=$1 returning strikes';

  const result = await db.query(UPDATE_QUERY, [accountId]);

  if (result.rowCount === 0) {
    throw new Error(`Account not found for account id - ${accountId}`);
  }

  return result.rows[0]['strikes'];
}

function suspendAccount(accountId) {
  const SUSPEN_QUERY = 'update accounts set status=\'Suspend\' where id=$1 returning strikes';

  return db.query(SUSPEN_QUERY, [accountId]);
}

function addAccountToBlacklist(blacklistTable, dentistId, patientId, reason) {
  const ALLOWED_BLACKLIST_TABLES = ['dentists', 'patients'];

  if (!ALLOWED_BLACKLIST_TABLES.includes(blacklistTable)) {
    throw new Error(`Invalid blacklist table '${blacklistTable}' must be one of ${ALLOWED_BLACKLIST_TABLES}`);
  }

  const TABLE  = `blacklisted_${blacklistTable}`;

  // It is safe to use tempalte string for the table
  // since the data is server-generated and never comes
  // from the client
  const INSERT_QUERY = `insert into ${TABLE} (dentist_id, patient_id, reason) values($1,$2,$3)`;

  return db.query(INSERT_QUERY, [dentistId, patientId, reason]);
}

