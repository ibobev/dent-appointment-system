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
