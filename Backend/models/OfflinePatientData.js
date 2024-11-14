const mongoose = require('mongoose');

const OfflinePatientSchema = new mongoose.Schema({

    doctorId: { type: String, required: true },
    doctorName: { type: String, required: true },
    doctorOtherInformation: { type: String },
    patientType: { type: String, required: true,},
    fullName: { type: String, required: true },
    dob: { type: Date, required: true },
    gender: { type: String, required: true },

    contactNumber: { type: String, required: true },
    email: { type: String },

    address: { type: String, required: true },

    emergencyContactNumber: { type: String, required: true },
    emergencyContactName: { type: String, required: true },

    allergies: { type: String },
    chronicConditions: { type: String },
    pastSurgeries: { type: String },
    familyMedicalHistory: { type: String },

    currentMedications: { type: String },
    bloodType: { type: String },
    socialHistory: { type: String },

    height: {
        type: String,
    },
    Weight: {
        type: String,
    },
    provider: { type: String },
    policyNumber: { type: String },
    occupation: { type: String },
    maritalStatus: { type: String },
    preferredPharmacy: { type: String },
}, { timestamps: true });

const offlinePatientRegisteration = mongoose.model('offlinePatientRegsteration', OfflinePatientSchema);

module.exports = { offlinePatientRegisteration };
