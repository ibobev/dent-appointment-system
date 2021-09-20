const nodemailer = require('nodemailer');
const config = require('../config');

let transporter = nodemailer.createTransport({
  host: "smtp.mailtrap.io",
  port: 2525,
  auth: {
    user: config.MAIL_USER,
    pass: config.MAIL_PASS
  }
});

module.exports.mailAppointmentRequest = function(patient, dentist, date, start ) {
  messagePatient = {
    from:"dentapp@notify.com",
    to: patient.email,
    subject: "DentApp Appointment Request",
    text: 
    `
    You have successfully made an appointment request! Dentist: ${dentist.first_name} ${dentist.last_name}, Appointment date: ${date} ${start};
    You can check your appointment status in your Appointments page.
    `
  }

  transporter.sendMail(messagePatient, function(err, info){
    if(err){
      console.log(err)
    }else {
      console.log(info);
    }
  });

  messageDentist = {
    from:"dentapp@notify.com",
    to: dentist.email,
    subject: "DentApp Appointment Request",
    text: 
    `
    You have a new appointment request! Patient: ${patient.first_name} ${patient.last_name}, Appointment date: ${date} ${start};
    You can accept or reject this appointment in your Appointments page -> Pending.
    `
  }

  transporter.sendMail(messageDentist, function(err, info){
    if(err){
      console.log(err)
    }else {
      console.log(info);
    }
  });

}