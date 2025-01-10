var express = require('express');
var router = express.Router();
var patientsController = require('../controllers/patients');
var {isAuthenticated} = require('../middlewares/authenticate');
var {authorizeRoles} = require('../middlewares/authorize')

router.get('/', isAuthenticated, authorizeRoles(['doctor']), function(req, res) {
  patientsController.listPatients(req, res);
});

router.get('/:id', isAuthenticated, authorizeRoles(['patient, doctor']), function(req, res) {
  patientsController.getPatientById(req, res);
});

router.post('/create', function(req, res) {
  patientsController.createPatient  (req, res);
});

router.post('/login', function(req, res) {
  patientsController.createPatient  (req, res);
});

router.post('/update', isAuthenticated, authorizeRoles(['patient']), function(req, res) {
  patientsController.updatePatient(req, res);
});

module.exports = router;
