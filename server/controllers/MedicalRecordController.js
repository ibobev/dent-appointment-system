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

module.exports.getPatients = async (req, res) => {
  const { account } = req;
  const dentist_id = req.account.id;
  let patientList = [];

  const selectPatients = `
  SELECT DISTINCT patient_id, accounts.first_name, accounts.last_name 
  FROM medical_records
  JOIN patients ON medical_records.patient_id=patients.account_id
  JOIN accounts ON patients.account_id=accounts.id 
  WHERE dentist_id = $1`;

  const values = [dentist_id];

  try {
    const result = await db.query(selectPatients, values);
    patientList = result.rows;
    console.log(patientList);
  } catch (error) {
    console.log(error);
    return res.status(500).send({
      status: 'error',
      statusmsg: 'Internal server error!'
    });
  }

  const filteredPatients = [];

  // Remove blacklisted patients
  for (const patient of patientList) {
    const queryRes = await db.query('select id from blacklisted_patients where patient_id=$1 and dentist_id=$2', [patient.patient_id, account.id]);
    if (queryRes.rows.length === 0) {
      filteredPatients.push(patient);
    }
  }

  res.json({
    status: 'success',
    statusmsg: '',
    patientList: filteredPatients
  });

}

module.exports.getPatientMedicalRecord = async (req, res) => {
  const dentist_id = req.account.id;
  const patient_id = parseInt(req.params.p_id);

  let medDetails = [];

  const selectMedicalRecordDetails = `
  SELECT accounts.first_name, accounts.last_name, details, medical_records.appointment_id, appointments.appointment_date 
  FROM medical_records
  JOIN patients ON medical_records.patient_id=patients.account_id
  JOIN accounts ON patients.account_id=accounts.id
  JOIN appointments ON medical_records.appointment_id=appointments.id 
  WHERE medical_records.dentist_id = $1 AND medical_records.patient_id = $2`;

  const values = [dentist_id, patient_id];

  try {
    const result = await db.query(selectMedicalRecordDetails, values);
    medDetails = result.rows;
    console.log(medDetails);
  } catch (error) {
    console.log(error);
    return res.status(500).send({
      status: 'error',
      statusmsg: 'Internal server error!'
    });
  }

  res.json({
    status: 'success',
    statusmsg: '',
    medDetails: medDetails
  });

}

module.exports.getDentists = async (req, res) => {
  const patient_id = req.account.id;
  let dentistList = [];

  const selectPatients = `
  SELECT DISTINCT dentist_id, accounts.first_name, accounts.last_name 
  FROM medical_records
  JOIN dentists ON medical_records.dentist_id=dentists.account_id
  JOIN accounts ON dentists.account_id=accounts.id 
  WHERE patient_id = $1`;

  const values = [patient_id];

  try {
    const result = await db.query(selectPatients, values);
    dentistList = result.rows;
    console.log(dentistList);
  } catch (error) {
    console.log(error);
    return res.status(500).send({
      status: 'error',
      statusmsg: 'Internal server error!'
    });
  }

  res.json({
    status: 'success',
    statusmsg: '',
    dentistList: dentistList
  });

}

module.exports.getPatientMedicalRecordByDentist = async (req, res) => {
  const patient_id = req.account.id;
  const dentist_id = parseInt(req.params.d_id);

  let medDetails = [];

  const selectMedicalRecordDetails = `
  SELECT accounts.first_name, accounts.last_name, details, medical_records.appointment_id, appointments.appointment_date 
  FROM medical_records
  JOIN dentists ON medical_records.dentist_id=dentists.account_id
  JOIN accounts ON dentists.account_id=accounts.id
  JOIN appointments ON medical_records.appointment_id=appointments.id 
  WHERE medical_records.dentist_id = $1 AND medical_records.patient_id = $2`;

  const values = [dentist_id, patient_id,];

  try {
    const result = await db.query(selectMedicalRecordDetails, values);
    medDetails = result.rows;
    console.log(medDetails);
  } catch (error) {
    console.log(error);
    return res.status(500).send({
      status: 'error',
      statusmsg: 'Internal server error!'
    });
  }

  res.json({
    status: 'success',
    statusmsg: '',
    medDetails: medDetails
  });

}
