const db = require('../utils/db');

module.exports.ratePatient = async (req, res) => {
  const dentist_id = req.account.id;
  const {
    patient,
    patient_rating
  } = req.body;

  const createPatientRating = "INSERT INTO patient_ratings(patient_id, rating, dentist_id) VALUES($1, $2, $3)";
  const values = [patient, patient_rating, dentist_id];

  try {
    await db.query(createPatientRating, values);
    return res.status(201).json({
      status: 'success',
      statusmsg: 'Patient rated successfully!'
    });
  } catch (error) {
    console.log(error);
    return res.status(500).send({
      status: 'error',
      statusmsg: 'Internal server error!'
    });
  }

}

module.exports.rateDentist = async (req, res) => {
  const patient_id = req.account.id;
  const {
    dentist,
    dentist_rating,
    appointment_id
  } = req.body;

  //Check if already rated
  const selectRating = "SELECT appointment_id FROM dentist_ratings WHERE appointment_id = $1";
  const a_id = [appointment_id];

  try {
    const findRating = await db.query(selectRating, a_id);
    if (findRating.rows.length !== 0) {
      res.status(400).json({ status: 'error', statusmsg: 'Dentist has already been rated!' });
      return;
    }
  } catch (error) {
    console.log(error);
    res.status(500).json({ status: 'error', statusmsg: 'Internal server error!' });
    return;
  }

  // Rate Dentist
  const createDentistRating = "INSERT INTO dentist_ratings(dentist_id, rating, patient_id, appointment_id) VALUES($1, $2, $3, $4)";
  const values = [dentist, dentist_rating, patient_id, appointment_id];

  try {
    await db.query(createDentistRating, values);
    return res.status(201).json({
      status: 'success',
      statusmsg: 'Dentist rated successfully!'
    });
  } catch (error) {
    console.log(error);
    return res.status(500).send({
      status: 'error',
      statusmsg: 'Internal server error!'
    });
  }

}

