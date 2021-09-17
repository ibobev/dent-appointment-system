const db = require('../utils/db');


module.exports.getBlacklist = async function (req, res) {
  const { account } = req;

  const GET_BLACKLIST_QUERY = 'select dentist_id,patient_id,reason,blacklisted_dentists.created_at as blacklist_date,email,first_name,last_name,status from blacklisted_dentists left join accounts on dentist_id=accounts.id where blacklisted_dentists.patient_id=$1';

  let queryResult;
  try {
    queryResult = await db.query(GET_BLACKLIST_QUERY, [account.id]) 
  } catch (error) {
    console.log(error);
    return res.status(500).json({ status: 'error', statusmsg: 'Internal server error' });
  }

  res.json({ status: 'success', statusmsg: '', dentists: queryResult.rows });
};
