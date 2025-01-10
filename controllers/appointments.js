
const Appointment = require('../models/appointments');

export const createAppointment = async(req, res) =>{
    try {
        const { doctor, reason, time, additionalNotes } = req.body;
    
        const newAppointment = new Appointment({
            doctor, 
            reason, 
            time, 
            additionalNotes
        });
    
        await newAppointment.save();
        res.status(201).json({ message: 'Appointment created successfully', appointment: newAppointment });
      } catch (err) {
        next(err);
      }
};

export const listAppointments = async (req, res) =>{
    try {
        const appointments = await Appointment.find();
        res.status(200).json(appointments);
    } catch (error) {
        res.status(500).json({ message: 'Error fetching appointments', error });
    }
}