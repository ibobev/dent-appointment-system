const db = require('../utils/db');

module.exports.getDentistAppointmentCalendar = async (req, res) => {
  const dentist_id = parseInt(req.params.id);
  let dentistAppointments = [];

  let statusA = 'Accepted';
  let statusP = 'Pending';
  let statusC = 'Completed';

  const selectAppointments = 'SELECT id, appointment_date, start_time, end_time, status FROM appointments WHERE (dentist_id = $1) AND (status=$2 OR status=$3 OR status=$4)';
  const values = [dentist_id, statusA, statusP, statusC];

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

module.exports.getAppointmentRequests = async (req, res) => {
  const dentist_id = req.account.id;
  let allAppointments = [];

  const getPendingPatients = `
  SELECT appointments.id, patient_id, appointment_date, start_time, end_time, appointments.status, accounts.first_name, accounts.last_name, accounts.email
  FROM appointments
  JOIN patients ON appointments.patient_id=patients.account_id
  JOIN accounts ON patients.account_id=accounts.id
  WHERE dentist_id=$1;
  `;

  const values = [dentist_id];

  try {
    const result = await db.query(getPendingPatients, values);
    allAppointments = result.rows;
  } catch (error) {
    console.log(error);
    res.status(500).json({
      status: 'error',
      statusmsg: 'Internal server error!'
    });
    return;
  }

  console.log(allAppointments);

  res.json({
    status: 'success',
    statusmsg: '',
    allAppointments: allAppointments
  });

}

module.exports.getCurrentDentistAppointmentCalendar = async (req, res) => {
  const id = req.account.id;
  let dentistAppointments = [];

  let statusA = 'Accepted';
  let statusP = 'Pending';
  let statusC = 'Completed';

  const selectAppointments = 'SELECT id, title, appointment_date, start_time, end_time, status FROM appointments WHERE (dentist_id = $1) AND (status = $2 OR status = $3 OR status = $4)';
  const values = [id, statusA, statusP, statusC];

  try {
    const result = await db.query(selectAppointments, values);
    dentistAppointments = result.rows;
    console.log(dentistAppointments);
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

  //Chekc for availability
  const checkAppointmentQuery = 'SELECT appointment_date, start_time, status FROM appointments WHERE dentist_id = $1 AND appointment_date=$2 AND start_time=$3';
  const valuesCheck = [dentist, date, start];
  let appointmentRes = null;

  try {
    const appointmentSearch = await db.query(checkAppointmentQuery, valuesCheck);
    appointmentRes = appointmentSearch.rows;
    console.log(appointmentRes);
    if (appointmentSearch.rows.length !== 0) {
      for (let appointment of appointmentRes) {
        if (appointment.status === 'Pending' || appointment.status === 'Accepted') {
          return res.status(400).json({
            status: 'error',
            statusmsg: 'Selected appointment is taken!'
          });
        }
      }
    }
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      status: 'error',
      statusmsg: 'Internal error!'
    });
  }

  //Get patient details
  const getPatientDetailsQuery = await db.query('SELECT first_name, last_name FROM accounts WHERE id=$1', [patient_id]);
  const patientDetails = getPatientDetailsQuery.rows[0];

  let title = patientDetails.first_name + ' ' + patientDetails.last_name + ' - ID: ' + patient_id;

  //Request appointment
  let statusPending = 'Pending';
  const insertAppointment = 'INSERT INTO appointments (dentist_id, patient_id, appointment_date, start_time, end_time, status, title) VALUES ($1,$2,$3,$4,$5,$6,$7)';
  const values = [dentist, patient_id, date, start, end, statusPending, title];

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
  const patient_id = parseInt(req.params.p_id);
  const a_id = parseInt(req.params.a_id);

  const status = 'Accepted';

  const updateStatus = 'UPDATE appointments SET status=$1 WHERE dentist_id=$2 AND (patient_id=$3 AND id=$4)';
  const values = [status, dentist_id, patient_id, a_id];

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

module.exports.rejectAppointment = async (req, res) => {
  const dentist_id = req.account.id;
  const patient_id = parseInt(req.params.p_id);
  const appointment_id = parseInt(req.params.a_id);

  const status = 'Cancelled';

  const updateStatus = 'UPDATE appointments SET status=$1 WHERE dentist_id=$2 AND patient_id=$3 AND id=$4';
  const values = [status, dentist_id, patient_id, appointment_id];

  try {
    await db.query(updateStatus, values);
    return res.status(201).json({
      status: 'success',
      statusmsg: 'Patient request rejected!'
    });
  } catch (error) {
    console.log(error);
    return res.status(500).send({
      status: 'error',
      statusmsg: 'Internal server error!'
    });
  }
}

module.exports.getPatientCurrentAppointments = async (req, res) => {
  const patient_id = req.account.id;
  let p_appointments = [];

  const getAppointmentDetails = `
  SELECT appointments.id, dentist_id, appointment_date, start_time, end_time, appointments.status, accounts.first_name, accounts.last_name, accounts.email, dentists.phone, dentists.city
  FROM appointments
  JOIN dentists ON appointments.dentist_id=dentists.account_id
  JOIN accounts ON dentists.account_id=accounts.id
  WHERE patient_id=$1;
  `;

  const values = [patient_id];

  try {
    const result = await db.query(getAppointmentDetails, values);
    p_appointments = result.rows;
  } catch (error) {
    console.log(error);
    res.status(500).json({
      status: 'error',
      statusmsg: 'Internal server error!'
    });
    return;
  }

  res.json({
    status: 'success',
    statusmsg: '',
    p_appointments: p_appointments
  });

}

module.exports.getCurrentAppointment = async (req, res) => {
  //const dentist_id = req.account.id;
  const appointment_id = parseInt(req.params.a_id);
  let appointmentDetails = [];

  const getAppointmentDetails = `
  SELECT appointments.id, patient_id, appointment_date, start_time, end_time, appointments.status, accounts.first_name, accounts.last_name, accounts.email
  FROM appointments
  JOIN patients ON appointments.patient_id=patients.account_id
  JOIN accounts ON patients.account_id=accounts.id
  WHERE appointments.id=$1;
  `;

  const values=[appointment_id];

  try {
    const result = await db.query(getAppointmentDetails, values);
    appointmentDetails = result.rows;
  } catch (error) {
    console.log(error);
    res.status(500).json({
      status: 'error',
      statusmsg: 'Internal server error!'
    });
    return;
  }

  //console.log(appointmentDetails);

  res.json({
    status: 'success',
    statusmsg: '',
    appointmentDetails: appointmentDetails
  });

}

module.exports.completeAppointment = async (req, res) => {
  const appointment_id = parseInt(req.params.a_id);
  const dentist_id = req.account.id;
  
  const status = 'Completed';

  const updateStatus = 'UPDATE appointments SET status=$1 WHERE dentist_id=$2 AND id=$3';
  const values = [status, dentist_id, appointment_id];

  try {
    await db.query(updateStatus, values);
    return res.status(201).json({
      status: 'success',
      statusmsg: 'Appointment completed'
    });
  } catch (error) {
    console.log(error);
    return res.status(500).send({
      status: 'error',
      statusmsg: 'Internal server error!'
    });
  }

}
