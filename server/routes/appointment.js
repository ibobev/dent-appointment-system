const express = require('express');
const jwt = require('jsonwebtoken');

const config = require('../config');
const auth = require('../utils/auth');

const router = express.Router();

const appointmentController = require('../controllers/AppointmentController');


/**
 * GET appointments/
 */
router.get('/history', auth.asAll, appointmentController.getPatientCurrentAppointments);

router.get('/all', auth.asDentist, appointmentController.getAppointmentRequests);

router.get('/dentist/:id', appointmentController.getDentistAppointmentCalendar);

router.get('/patient/:a_id', appointmentController.getCurrentAppointmentPatient);

router.get('/:a_id', auth.asDentist, appointmentController.getCurrentAppointment);

router.get('/', auth.asDentist, appointmentController.getCurrentDentistAppointmentCalendar);

/**
 * POST /appointments
 */

router.post('/', auth.asAll, appointmentController.scheduleAppointment);

/**
 * PUT /appointments/:id
 */
router.put('/complete/:a_id', auth.asDentist, appointmentController.completeAppointment);

router.put('/reject/:a_id/:p_id', auth.asDentist, appointmentController.rejectAppointment);

router.put('/:a_id/:p_id', auth.asDentist, appointmentController.acceptAppointment);



module.exports = router;
