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