const cron = require('node-cron');
const mailer = require('./mailer');
const db = require('./db');

let appointmentsQueue = null;

// Get list of today appointments every day at 05:00 am
cron.schedule('0 5 * * *', async () => {
  const getAppointmentsToday = await db.query(`
    SELECT id, dentist_id, patient_id, start_time, appointment_date
    FROM appointments
    WHERE appointment_date = current_date AND status = 'Accepted'
    ORDER BY start_time ASC
    `);
  appointmentsQueue = getAppointmentsToday.rows;
  //console.log(appointmentsQueue);

});

// Check for appointments 1 hour ahead from now every 30 minutes
cron.schedule('*/30 * * * *', async () => {

  let timeOneHourAhead = new Date(new Date().getTime() + 1 * 60 * 60 * 1000).toLocaleTimeString([], {
    hour: '2-digit',
    minute: '2-digit',
    hour12: false
  });
  //console.log(timeOneHourAhead);
  let toMail = appointmentsQueue.filter(appointment => appointment.start_time.replace(':00', '') == timeOneHourAhead);
  //console.log(toMail);

  for await (appointment of toMail) {
    try {
      let getPatient = await db.query('SELECT first_name, last_name, email FROM accounts WHERE id=$1', [appointment.patient_id]);
      let patientDetails = getPatient.rows[0];

      let getDentist = await db.query('SELECT first_name, last_name, email FROM accounts WHERE id=$1', [appointment.dentist_id]);
      let dentistDetails = getDentist.rows[0];

      mailer.mailReminder(patientDetails, dentistDetails, appointment.id, appointment.start_time, appointment.appointment_date);

    } catch (error) {
      console.log(error);
    }
  }

});