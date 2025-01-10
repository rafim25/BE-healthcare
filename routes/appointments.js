var express = require('express');
var router = express.Router();
var appointmentsController = require('../controllers/appointments');

router.get('/', function(req, res) {
    appointmentsController.listAppointments(req, res);
});

router.post('/create', function(req, res) {
    appointmentsController.createAppointment  (req, res);
});

module.exports = router;
