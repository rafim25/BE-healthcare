// Import Mongoose
const mongoose = require('mongoose');

// Define the User schema
const AppointmentSchema = new mongoose.Schema({
    doctor: {
        type: mongoose.Schema.Types.ObjectId,  // Type for referencing another collection
        ref: 'Doctor',                          // Name of the collection to reference
      },
    reason: {
        type: String,
        required: true,
        trim: true
    },
    additionalNotes: {
        type: String,       
        trim: true
    },
    time: {
        type: String,       
        trim: true
    },
    createdAt: {
        type: Date,
        default: Date.now
    },
    updatedAt: {
        type: Date
    }
}, {
    timestamps: true
});

const Appointment = mongoose.model('Appointment', AppointmentSchema);

module.exports = Appointment;
