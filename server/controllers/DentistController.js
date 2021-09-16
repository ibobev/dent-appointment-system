const db = require('../utils/db');
//const config = require('../config');
//const jwt = require('jsonwebtoken');

const roles = require('../utils/roles');

module.exports.getAll = async (req, res) => {
  const { term } = req.query;
  let dentists = [];
  let searchQuery = 'select id,first_name,last_name,email,description,city,dentist_type,phone from accounts join dentists on dentists.account_id=accounts.id where role_id=$1';
  let searchParams = [roles.DENTIST];

  if (term && term.length !== 0) {
    // Note: Use 'ilike' for case-insensitive searching
    searchQuery += ' and (first_name ilike $2 or last_name ilike $2 or email ilike $2)';
    searchParams.push(`%${term}%`);
  }

  try {
    const queryResult = await db.query(searchQuery, searchParams);
    dentists = queryResult.rows;
  } catch (error) {
    console.log(error);
    res.status(500).json({ status: 'error', statusmsg: 'Could not fetch dentists!' });
    return;
  }

  for (const dentist of dentists) {
    try {
      // Calculate dentist rating inside the query
      const CALCULATE_RATING_QUERY = 'select AVG(rating)::numeric(10,1) as dentist_rating from dentist_ratings where dentist_id=$1';
      const dentistRating = await db.query(CALCULATE_RATING_QUERY, [dentist.id]);

      // Set the dentist rating
      dentist.rating = dentistRating.rows[0].dentist_rating; 
    } catch (error) {
      console.log(error);
      dentist.rating = 0;
      // TODO: maybe do something else
    }
  }

  // Remove blacklisted dentists
  // TODO: Probably use join when pulling the dentists
  const filteredDentists = [];

  for (const dentist of dentists) {
    const result = await db.query('select count(id) as count from blacklisted_dentists where dentist_id=$1', [dentist.id]);

    if (result.rows[0]['count'] === '0') {
      filteredDentists.push(dentist);
    }
  }

  res.json({ status: 'success', statusmsg: '', dentists: filteredDentists });
};

module.exports.getDentistDetails = async (req, res) => {
  const id = req.account.id;
    
  const result = await db.query('select * from dentists where account_id=$1', [id]);
  const dentist = result.rows[0];

  console.log(dentist);
  res.json({
    status: 'success',
    statusmsg: '',
    dentist: dentist
  });
};

module.exports.getSelectedDentistFullDetails = async (req, res) => {
  const id = parseInt(req.params.id);
  
  const dentistDetailsQuery = 'SELECT id, first_name, last_name, email, description, city, dentist_type, phone, work_from, work_to, work_days FROM accounts JOIN dentists ON dentists.account_id=accounts.id WHERE account_id=$1';
  const values = [id];

  try {
    const result = await db.query(dentistDetailsQuery, values);
    dentistDetails = result.rows[0];
  } catch (error) {
    console.log(error);
    res.status(500).json({ status: 'error', statusmsg: 'Could not get selected dentist details!' });
    return;
  }

  // Add avg rating query

  res.json({ status: 'success', statusmsg: '', dentistDetails: dentistDetails });

}

module.exports.updateDentistDetails = async (req, res) => {
  const {
    type,
    city,
    phone,
    description
  } = req.body;

  const id = req.account.id;

  if (!type && !city && !phone && !description) {
    return res.status(400).send({
      status: 'error',
      statusmsg: 'Bad Request!'
    });
  }

  if (type) {
    const updateType = 'UPDATE dentists SET dentist_type=$1 WHERE account_id=$2';
    const values = [type, id];

    try {
      await db.query(updateType, values);
    } catch (error) {
      console.log(error);
      return res.status(500).send({
        status: 'error',
        statusmsg: 'Internal server error!'
      });
    }
  }

  if (city) {
    const updateCity = 'UPDATE dentists SET city=$1 WHERE account_id=$2';
    const values = [city, id];

    try {
      await db.query(updateCity, values);
    } catch (error) {
      console.log(error);
      return res.status(500).send({
        status: 'error',
        statusmsg: 'Internal server error!'
      });
    }
  }

  if (phone) {
    const updatePhone = 'UPDATE dentists SET phone=$1 WHERE account_id=$2';
    const values = [phone, id];

    try {
      await db.query(updatePhone, values);
    } catch (error) {
      console.log(error);
      return res.status(500).send({
        status: 'error',
        statusmsg: 'Internal server error!'
      });
    }
  }

  if (description) {
    const updateDescription = 'UPDATE dentists SET description=$1 WHERE account_id=$2';
    const values = [description, id];

    try {
      await db.query(updateDescription, values);
    } catch (error) {
      console.log(error);
      return res.status(500).send({
        status: 'error',
        statusmsg: 'Internal server error!'
      });
    }
  }

  return res.status(201).json({ status: 'success', statusmsg: 'Details updated successfully!' });
};

module.exports.updateWorkDetails = async (req, res) => {
  const {
    days,
    start,
    end
  } = req.body;

  const id = req.account.id;

  const updateWork = 'UPDATE dentists SET work_days=$1, work_from=$2, work_to=$3 WHERE account_id=$4';
  const values = [days, start, end, id];

  try {
    await db.query(updateWork, values);
  } catch (error) {
    console.log(error);
    return res.status(500).send({
      status: 'error',
      statusmsg: 'Internal server error!'
    });
  }

return res.status(201).json({ status: 'success', statusmsg: 'Work schedule updated successfully!' });

};
