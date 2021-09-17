const db = require('../utils/db');


module.exports.getBlacklist = async function (req, res) {
  const { account } = req;
  const { term } = req.query;
  const SEARCH_PARAMS = [account.id];
  let searchQuery = '';

  if (term) {
    searchQuery = ' and first_name ilike $2 or last_name ilike $2 or email ilike $2';
    SEARCH_PARAMS.push(`%${term}%`);
  }

  const GET_BLACKLIST_QUERY = `
    select 
      dentist_id,
      patient_id,
      reason,
      blacklisted_dentists.created_at as blacklist_date,
      email,
      first_name,
      last_name,
      status,
      city,
      dentist_type
    from blacklisted_dentists
    left join accounts
    on dentist_id=accounts.id
    left join dentists
    on account_id=dentist_id
    where
      blacklisted_dentists.patient_id=$1
    ${searchQuery}
  `;

  let queryResult;
  try {
    queryResult = await db.query(GET_BLACKLIST_QUERY, SEARCH_PARAMS);
  } catch (error) {
    console.log(error);
    return res.status(500).json({ status: 'error', statusmsg: 'Internal server error' });
  }

  res.json({ status: 'success', statusmsg: '', dentists: queryResult.rows });
};
