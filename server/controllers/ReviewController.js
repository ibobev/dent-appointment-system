const db = require('../utils/db');

module.exports.reviewDentist = async (req, res) => {
  const patient_id = req.account.id;
  const {
    details,
    dentist_id,
    appointment_id
  } = req.body;

  //Check if already reviewd
  const selectReview = "SELECT appointment_id FROM dentist_reviews WHERE appointment_id = $1";
  const a_id = [appointment_id];

  try {
    const findReview = await db.query(selectReview, a_id);
    if (findReview.rows.length !== 0) {
      res.status(400).json({ status: 'error', statusmsg: 'Dentist has already been reviewd!' });
      return;
    }
  } catch (error) {
    console.log(error);
    res.status(500).json({ status: 'error', statusmsg: 'Internal server error!' });
    return;
  }

  const createReview = "INSERT INTO dentist_reviews(dentist_id, patient_id, patient_comment, appointment_id) VALUES($1, $2, $3, $4)";
  const values = [dentist_id, patient_id, details, appointment_id];
  try {
    await db.query(createReview, values);
    return res.status(201).json({
      status: 'success',
      statusmsg: 'Review created successfully!'
    });
  } catch (error) {
    console.log(error);
    return res.status(500).send({
      status: 'error',
      statusmsg: 'Internal server error!'
    });
  }

}
