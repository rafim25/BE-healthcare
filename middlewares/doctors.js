const Doctor = require('../models/doctors');

export const createDoctor = async(req, res) =>{
    try {
        const { fName, lName, dob, gender, mobile, email, password, role, specialization } = req.body;
    
        const existingDoctor = await Doctor.findOne({ $or: [{ mobile }, { email }] });
        if (existingDoctor) {
          return res.status(400).json({ message: 'mobile or email already exists.' });
        }
        const hashedPassword = await bcrypt.hash(password, 10);
    
        const newDoctor = new Doctor({
            fName, 
            lName, 
            dob, 
            gender, 
            mobile, 
            email, 
            password: hashedPassword, 
            role,
            specialization
        });
    
        await newDoctor.save();
        res.status(201).json({ message: 'Doctor created successfully', doctor: newDoctor });
      } catch (err) {
        next(err);
      }
};

export const listDoctors = async (req, res) =>{
    try {
        const doctors = await Doctor.find();
        res.status(200).json(doctors);
    } catch (error) {
        res.status(500).json({ message: 'Error fetching doctors', error });
    }
}

export const getDoctorById = async (req, res) =>{
    try {
        const doctor = await Doctor.findById(req.params.id);
        if (!doctor) {
            return res.status(404).json({ message: 'Doctor not found' });
        }
        res.status(200).json(doctor);
    } catch (error) {
        res.status(500).json({ message: 'Error fetching doctor', error });
    }
}

export const updateDoctor = async (req, res) =>{
    try {
        const { fName, lName, dob, gender, mobile, email, role, specialization } = req.body;
        
        const updateData = {
            fName,
            lName,
            dob,
            gender,
            mobile,
            email,
            role,
            specialization
        };

        const updatedDoctor = await Doctor.findByIdAndUpdate(req.params.id, updateData, {
            new: true,  
            runValidators: true 
        });

        if (!updatedDoctor) {
            return res.status(404).json({ message: 'Doctor not found' });
        }

        res.status(200).json({ message: 'Doctor updated successfully', doctor: updatedDoctor });
    } catch (error) {
        res.status(500).json({ message: 'Error updating doctor', error });
    }
}

