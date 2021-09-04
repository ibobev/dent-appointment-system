const db = require('../utils/db');
const config = require('../config');
const jwt = require('jsonwebtoken');

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

  res.json({ status: 'success', statusmsg: '', dentists: dentists });
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
}
