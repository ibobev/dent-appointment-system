const db = require('../utils/db');

module.exports.getDentistAppointmentCalendar = async (req, res) => {
  const dentist_id = parseInt(req.params.id);
  let dentistAppointments = [];

  const selectAppointments = 'SELECT id, appointment_date, start_time, end_time, status FROM appointments WHERE dentist_id = $1';
  const values = [dentist_id];

  try {
    const result = await db.query(selectAppointments, values);
    dentistAppointments = result.rows;
  } catch (error) {
    console.log(error);
    res.status(500).json({
      status: 'error',
      statusmsg: 'Could not get dentist appointment calendar!'
    });
    return;
  }

  res.json({
    status: 'success',
    statusmsg: '',
    dentistAppointments: dentistAppointments
  });

}

module.exports.getPendingRequests = async (req, res) => {
  const dentist_id = req.account.id;
  let pending = [];
  const status = 'Pending';

  const getPendingPatients = `
  SELECT patient_id, appointment_date, start_time, end_time, appointments.status, accounts.first_name, accounts.last_name, accounts.email
  FROM appointments
  JOIN patients ON appointments.patient_id=patients.account_id
  JOIN accounts ON patients.account_id=accounts.id
  WHERE dentist_id=$1 AND appointments.status=$2;
  `;

  const values = [dentist_id, status];

  try {
    const result = await db.query(getPendingPatients, values);
    pending = result.rows;
  } catch (error) {
    console.log(error);
    res.status(500).json({
      status: 'error',
      statusmsg: 'Internal server error!'
    });
    return;
  }

  console.log(pending);

  res.json({
    status: 'success',
    statusmsg: '',
    pending: pending
  });

}

module.exports.getCurrentDentistAppointmentCalendar = async (req, res) => {
  const id = req.account.id;
  let dentistAppointments = [];

  const selectAppointments = 'SELECT id, title, appointment_date, start_time, end_time, status FROM appointments WHERE dentist_id = $1';
  const values = [id];

  try {
    const result = await db.query(selectAppointments, values);
    dentistAppointments = result.rows;
  } catch (error) {
    console.log(error);
    res.status(500).json({
      status: 'error',
      statusmsg: 'Could not get dentist appointment calendar!'
    });
    return;
  }

  res.json({
    status: 'success',
    statusmsg: '',
    dentistAppointments: dentistAppointments
  });

}

module.exports.scheduleAppointment = async (req, res) => {
  const patient_id = req.account.id;
  const {
    dentist,
    date,
    start,
    end
  } = req.body;

  //Get patient details
  const getPatientDetailsQuery = await db.query('SELECT first_name, last_name FROM accounts WHERE id=$1', [patient_id]);
  const patientDetails = getPatientDetailsQuery.rows[0];

  let title = patientDetails.first_name + ' ' + patientDetails.last_name + ' - ID: ' + patient_id;
  let status = 'Pending';

  //Chekc for availability
  const checkAppointmentQuery = 'SELECT appointment_date, start_time FROM appointments WHERE dentist_id = $1 AND appointment_date=$2 AND start_time=$3';
  const valuesCheck = [dentist, date, start];
  
  try {
    const appointmentSearch = await db.query(checkAppointmentQuery, valuesCheck);
    //console.log(appointmentResult);
    if (appointmentSearch.rows.length !== 0) {
      return res.status(400).json({ status: 'error', statusmsg: 'Selected appointment is taken!' });
    }    
  } catch (error) {
    console.log(error);
    return res.status(500).json({ status: 'error', statusmsg: 'Internal error!' });
  }

  //Request appointment
  const insertAppointment = 'INSERT INTO appointments (dentist_id, patient_id, appointment_date, start_time, end_time, status, title) VALUES ($1,$2,$3,$4,$5,$6,$7)';
  const values = [dentist, patient_id, date, start, end, status, title];

  try {
    await db.query(insertAppointment, values);
    return res.status(201).json({
      status: 'success',
      statusmsg: 'Appointment request sent successfully!'
    });
  } catch (error) {
    console.log(error);
    return res.status(500).send({
      status: 'error',
      statusmsg: 'Internal server error!'
    });
  }

}

module.exports.acceptAppointment = async (req, res) => {
  const dentist_id = req.account.id;
  const patient_id = parseInt(req.params.id);

  const status = 'Accepted';

  const updateStatus = 'UPDATE appointments SET status=$1 WHERE dentist_id=$2 AND patient_id=$3';
  const values = [status, dentist_id, patient_id];

  try {
    await db.query(updateStatus, values);
    return res.status(201).json({
      status: 'success',
      statusmsg: 'Patient request accepted!'
    });
  } catch (error) {
    console.log(error);
    return res.status(500).send({
      status: 'error',
      statusmsg: 'Internal server error!'
    });
  }

}
