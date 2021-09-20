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

// Mail dentist and patient about appointment request
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

//Dentist reject appointment
module.exports.mailAppointmentReject = function (patient, dentist, appointment) {

  messagePatient = {
    from:"dentapp@notify.com",
    to: patient.email,
    subject: "DentApp Appointment Cancelled",
    text: 
    `
    Your appointment has been cancelled! Dentist: ${dentist.first_name} ${dentist.last_name}, Appointment id: ${appointment.id}, date: ${appointment.appointment_date} ${appointment.start_time};
    `
  }

  transporter.sendMail(messagePatient, function(err, info){
    if(err){
      console.log(err)
    }else {
      console.log(info);
    }
  });

}

//Patient cancel appointment
module.exports.mailAppointmentCancel = function (patient, dentist, appointment) {

  messagePatient = {
    from:"dentapp@notify.com",
    to: dentist.email,
    subject: "DentApp Appointment Cancelled",
    text: 
    `
    A patient has cancelled an appointment! Patient: ${patient.first_name} ${patient.last_name}, Appointment id: ${appointment.id}, date: ${appointment.appointment_date} ${appointment.start_time};
    `
  }

  transporter.sendMail(messagePatient, function(err, info){
    if(err){
      console.log(err)
    }else {
      console.log(info);
    }
  });

}