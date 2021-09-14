const db = require('../utils/db');

module.exports.createRecord = async (req, res) => {
  const dentist_id = req.account.id;
  const {
    details,
    patient_id,
    appointment_id
  } = req.body;


  const createMedicalRecord = "INSERT INTO medical_records(patient_id, dentist_id, details, appointment_id) VALUES($1, $2, $3, $4)";
  const values = [patient_id, dentist_id, details, appointment_id];
  try {
    await db.query(createMedicalRecord, values);
    return res.status(201).json({
      status: 'success',
      statusmsg: 'Medical record created successfully!'
    });
  } catch (error) {
    console.log(error);
    return res.status(500).send({
      status: 'error',
      statusmsg: 'Internal server error!'
    });
  }

}
