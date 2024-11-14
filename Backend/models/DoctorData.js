const mongoose = require("mongoose");

// Basic Information for Doctor, Table-1
const DoctorBasicInfo = new mongoose.Schema({
    DoctorLogInId:{
        type: String,
        required: true,
    },
    fullName: {
        type: String,
        required: true,
    },
    phone: {
        type: Number,
        required: false,
    },
    dateOfBirth: {
        type: String,
        required: true,
    },
    gender: {
        type: String,
        required: true,
    }
}, { timestamps: true });

const doctorBasicInfo = mongoose.model('doctorUserBasicInfo', DoctorBasicInfo);

// Professional Information for Doctor, Table-2
const DoctorProfessionalInfo = new mongoose.Schema({
    DoctorLogInId:{
        type: String,
        required: true,
    },
    medicalLicenseNumber: {
        type: String,
        required: true,
    },
    specialization: {
        type: String,
        required: true,
    },
    yearsOfExperience: {
        type: String,
        required: true,
    },
    medicalSchool: {
        type: String,
        required: true,
    },
    hospitalOrClinic: {
        type: String,
        required: true,
    },

}, { timestamps: true });

const doctorProfessionalInfo = mongoose.model('doctorUserProfessionalInfo', DoctorProfessionalInfo);

const DoctorIdentificationInfo = new mongoose.Schema({
    DoctorLogInId:{
        type: String,
        required: true,
    },
    proofOfMedicalLicense: {
        type: String,
        required: true,
    },
    proofOfIdentity: {
        type: String,
        required: true,
    },
    Certifications: {
        type: String,
        required: true,
    },
}, { timestamps: true });

const doctorIdentificationInfo = mongoose.model("doctorUserIdentificationInfo", DoctorIdentificationInfo);

const DoctorLoginInfo = new mongoose.Schema({
    userName: {
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
    }
}, { timestamps: true });

const doctorloginInfo = mongoose.model("doctorUserLoginInfo", DoctorLoginInfo);

const DoctorAgreementInfo = new mongoose.Schema({
    DoctorLogInId:{
        type: String,
        required: true,
    },
    termsAndServices: {
        type: String,
        required: true,
    },
    privacyAndPolicy: {
        type: String,
        required: true,
    },
    consentOfDataSharing: {
        type: String,
        required: true,
    }
}, { timestamps: true });

const doctorAgreementInfo = mongoose.model("doctorUserAgreementInfo", DoctorAgreementInfo);

// Exporting models
module.exports = {
    doctorloginInfo,
    doctorProfessionalInfo,
    doctorIdentificationInfo,
    doctorBasicInfo,
    doctorAgreementInfo
};
