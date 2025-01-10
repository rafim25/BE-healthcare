var express = require('express');
var router = express.Router();
var appointmentsController = require('../controllers/appointments');
var {isAuthenticated} = require('../middlewares/authenticate');
var {authorizeRoles} = require('../middlewares/authorize');

router.get('/', isAuthenticated, authorizeRoles(['doctor']), function(req, res) {
    appointmentsController.listAppointments(req, res);
});

router.post('/create', isAuthenticated, authorizeRoles(['patient']), function(req, res) {
    appointmentsController.createAppointment  (req, res);
});

module.exports = router;
