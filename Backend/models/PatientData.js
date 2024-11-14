const mongoose = require('mongoose');

const PatientBasic = new mongoose.Schema({
    patientIdOfLogCred:{
        type:String,
        required: true,
    },
    fullName:{
        type: String,
        required: true,
    },
    phone:{
        type: Number,
        required: true,
    },
    dateOfBirth:{
        type: String,
        required: true,
    },
    gender:{
        type: String,
        required: true,
    },
},{timestamps:true});

const patientBasic  = mongoose.model("patientUserBasic", PatientBasic);

const PatientPersonalInformation = new mongoose.Schema({
    patientIdOfLogCred:{
        type:String,
        required: true,
    },
    martialStatus:{
        type: String,
    },
    occupation:{
        type:String,
    },
    languagePreference:{
        type:String,
    },
    emergencyContactPhone:{
        type:String
    },
    emergenecyContactName:{
        type:String
    },
},{timestamps:true});

const patientPersonalInformation = mongoose.model("patientUserPersonalInformation", PatientPersonalInformation);


const PatientMedicalInformation = new mongoose.Schema({
    patientIdOfLogCred:{
        type:String,
        required: true,
    },
    currentMedications:{
        type: String,
    },
    knowAllergies:{
        type: String,
    },
    medicalHistory:{
        type: String,
    },
    pastSurgeries:{
        type: String,
    },
    familyMedicalHistory:{
        type: String,
    },
}, {timestamps: true});

const patientMedicalInformation = mongoose.model("patientUserMedicalInformation", PatientMedicalInformation);

const PatientIdentification = new mongoose.Schema({
    patientIdOfLogCred:{
        type:String,
        required: true,
    },
    governmentIssuedId: {
        type: String,
        required: true,
    },
    adharNumber: {
        type: Number,
        required: true,
    }
}, {timestamps: true});

const patientIdentification = mongoose.model("patientUserIdentification", PatientIdentification);

const PatientLoginCredentials = new mongoose.Schema({
    username: {
        type: String,
        required: true,
        unique: true,
    },
    email: {
        type: String,
        required: true,
        unique: true,
    },
    password: {
        type: String,
        required: true,
    },
    
}, {timestamps:true});

const patientloginCredentials = mongoose.model("patientUserLoginCredentials", PatientLoginCredentials);

module.exports ={
    patientBasic,
    patientIdentification,
    patientMedicalInformation,
    patientloginCredentials,
    patientPersonalInformation,
};
