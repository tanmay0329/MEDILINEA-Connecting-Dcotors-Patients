const mongoose = require("mongoose");

const prescription  = new mongoose.Schema({
    doctorId:{
        type:String,
        required:true,
    },
    patientId:{
        type:String,
        required:true,
    },
    appointmentId:{
        type:String,
        required:true,
    },
    medication:{
        type:String,
        required:true,
    },
    diagnosis:{
        type:String,
        required:true,
    },
    instructions:{
        type:String,
        required:true,
    },
}, {timestamps:true});

const Prescription = mongoose.model("prescriptionSchema",prescription);

const offlinePatientPrescription = new mongoose.Schema({
    doctorId:{
        type:String,
        required:true,
    },
    appointmentId:{
        type:String,
        required:true,
    },
    medication:{
        type:String,
        required:true,
    },
    diagnosis:{
        type:String,
        required:true,
    },
    instructions:{
        type:String,
        required:true,
    },
},{timestamps:true})

const OffilnePatientPrescription = mongoose.model("offlinePatientPrescriptionSchema",offlinePatientPrescription);


module.exports={Prescription, OffilnePatientPrescription}