// Import Mongoose
const mongoose = require('mongoose');

// Define the User schema
const PatientSchema = new mongoose.Schema({
    fName: {
        type: String,
        required: true,
        trim: true
    },
    lName: {
        type: String,
        required: true,
        trim: true  
    },
    dob: {
        type: String,
        required: true,
        trim: true
    },
    gender: {
        type: String,
        required: true,
        trim: true
    },
    mobile: {
        type: String,
        required: true,
        trim: true
    },
    email: {
        type: String,
        required: true,
        unique: true,
        trim: true,
        lowercase: true
    },
    password: {
        type: String,
        required: true,
        minlength: 6
    },
    role: {
        type: String,
        enum: ['patient', 'doctor'],
        default: 'patient'
    },
    createdAt: {
        type: Date,
        default: Date.now
    },
    updatedAt: {
        type: Date
    }
}, {
    timestamps: true // Automatically adds `createdAt` and `updatedAt` fields
});

const Patient = mongoose.model('Patient', PatientSchema);

module.exports = Patient;
