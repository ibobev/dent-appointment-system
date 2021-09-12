const express = require('express');
const {
  check,
  validationResult
} = require('express-validator');
const jwt = require('jsonwebtoken');

const roles = require('../utils/roles');
const config = require('../config');

const router = express.Router();

const appointmentController = require('../controllers/AppointmentController');

const dentistAuth = (req, res, next) => {
  console.log(req.header('Authorization'));
  // Check for Authorization header
  const authHeader = req.header('Authorization') ? req.header('Authorization').split(' ') : null
  console.log(authHeader);
  if (!authHeader) {
    return res.status(403).json({
      status: 'error',
      statusmsg: 'Invalid auth token'
    });
  }

  // Check if authorization type is token
  if (authHeader[0] !== 'Token') {
    return res.status(401).json({
      status: 'error',
      statusmsg: 'Invalid auth token'
    });
  }

  //Check if token is valid
  const token = authHeader[1];

  if (!jwt.verify(token, config.JWT_SECRET)) {
    console.log('JWT says token not valid');
    return res.status(401).json({
      status: 'error',
      statusmsg: 'Invalid auth token'
    });
  }

  const decodedToken = jwt.decode(token);

  if (decodedToken.role !== roles.DENTIST) {
    console.log('INVALID ROLE', decodedToken.role);
    return res.status(401).json({
      status: 'error',
      statusmsg: 'Invalid auth token'
    });
  }

  req.account = decodedToken;
  next();
};

const accountAuth = (req, res, next) => {
  console.log(req.header('Authorization'));
  // Check for Authorization header
  const authHeader = req.header('Authorization') ? req.header('Authorization').split(' ') : null
  console.log(authHeader);
  if (!authHeader) {
    return res.status(403).json({
      status: 'error',
      statusmsg: 'Invalid auth token'
    });
  }

  // Check if authorization type is token
  if (authHeader[0] !== 'Token') {
    return res.status(401).json({
      status: 'error',
      statusmsg: 'Invalid auth token'
    });
  }

  //Check if token is valid
  const token = authHeader[1];

  if (!jwt.verify(token, config.JWT_SECRET)) {
    console.log('JWT says token not valid');
    return res.status(401).json({
      status: 'error',
      statusmsg: 'Invalid auth token'
    });
  }

  const decodedToken = jwt.decode(token);

  req.account = decodedToken;
  next();
};


/**
 * GET appointments/
 */
router.get('/history', accountAuth, appointmentController.getPatientCurrentAppointments);

router.get('/pending', dentistAuth, appointmentController.getPendingRequests);

router.get('/:id', appointmentController.getDentistAppointmentCalendar);

router.get('/', dentistAuth, appointmentController.getCurrentDentistAppointmentCalendar);

/**
 * POST /appointments
 */

router.post('/', accountAuth, appointmentController.scheduleAppointment);

/**
 * PUT /appointments/:id
 */
router.put('/reject/:a_id/:p_id', dentistAuth, appointmentController.rejectAppointment);

router.put('/:a_id/:p_id', dentistAuth, appointmentController.acceptAppointment);



module.exports = router;