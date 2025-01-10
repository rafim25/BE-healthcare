var express = require('express');
var router = express.Router();
var doctorsController = require('../controllers/doctors');
var {isAuthenticated} = require('../middlewares/authenticate');
var {authorizeRoles} = require('../middlewares/authorize');

router.get('/', isAuthenticated, authorizeRoles(['patient']), function(req, res) {
    doctorsController.listDoctors(req, res);
});

router.get('/:id', isAuthenticated, authorizeRoles(['patient, doctor']), function(req, res) {
    doctorsController.getDoctorById(req, res);
});

router.post('/create', function(req, res) {
    doctorsController.createDoctor  (req, res);
});

router.post('/login', function(req, res) {
    doctorsController.loginDoctor  (req, res);
});

router.post('/update', isAuthenticated, authorizeRoles(['doctor']), function(req, res) {
    doctorsController.updateDoctor(req, res);
});

module.exports = router;
