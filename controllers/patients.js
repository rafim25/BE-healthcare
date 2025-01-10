const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const Patient = require('../models/patients');

const createPatient = async(req, res) =>{
    try {
        const { fName, lName, dob, gender, mobile, email, password, role } = req.body;
    
        const existingPatient = await Patient.findOne({ $or: [{ mobile }, { email }] });
        if (existingPatient) {
          return res.status(400).json({ message: 'mobile or email already exists.' });
        }
        const hashedPassword = await bcrypt.hash(password, 10);
    
        const newPatient = new Patient({
            fName, 
            lName, 
            dob, 
            gender, 
            mobile, 
            email, 
            password: hashedPassword, 
            role
        });
    
        await newPatient.save();
        res.status(201).json({ message: 'Patient created successfully', patient: newPatient });
      } catch (err) {
        next(err);
      }
};

const loginPatient = async(req, res) =>{
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({ message: 'email and password are required' });
    }
  
    const patient = Patient.find((u) => u.email === email);
    if (!patient) {
      return res.status(401).json({ message: 'Invalid email or password' });
    }
  
    const isPasswordValid = bcrypt.compareSync(password, patient.password);
    if (!isPasswordValid) {
      return res.status(401).json({ message: 'Invalid email or password' });
    }
  
    const token = jwt.sign(
      { userId: patient.id, role: patient.role },
      SECRET_KEY,
      { expiresIn: '1h' } // Token valid for 1 hour
    );
  
    res.status(200).json({
      message: 'Login successful',
      accessToken: token
    });
}

const listPatients = async (req, res) =>{
    try {
        const patients = await Patient.find();
        res.status(200).json(patients);
    } catch (error) {
        res.status(500).json({ message: 'Error fetching patients', error });
    }
}

const getPatientById = async (req, res) =>{
    try {
        const patient = await Patient.findById(req.params.id);
        if (!patient) {
            return res.status(404).json({ message: 'Patient not found' });
        }
        res.status(200).json(patient);
    } catch (error) {
        res.status(500).json({ message: 'Error fetching patient', error });
    }
}

const updatePatient = async (req, res) =>{
    try {
        const { fName, lName, dob, gender, mobile, email, role } = req.body;
        
        const updateData = {
            fName,
            lName,
            dob,
            gender,
            mobile,
            email,
            role
        };

        const updatedPatient = await Patient.findByIdAndUpdate(req.params.id, updateData, {
            new: true,  
            runValidators: true 
        });

        if (!updatedPatient) {
            return res.status(404).json({ message: 'Patient not found' });
        }

        res.status(200).json({ message: 'Patient updated successfully', patient: updatedPatient });
    } catch (error) {
        res.status(500).json({ message: 'Error updating patient', error });
    }
}

module.exports = { createPatient, loginPatient, listPatients, getPatientById, updatePatient}

