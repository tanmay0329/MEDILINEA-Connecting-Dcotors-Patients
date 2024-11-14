const {
    doctorloginInfo,
    doctorProfessionalInfo,
    doctorIdentificationInfo,
    doctorBasicInfo,
    doctorAgreementInfo
} = require("../models/DoctorData");

// Helper function to standardize responses
// const createResponse = (DBmsg) => ({ DBmsg });
async function handleLoginUser({ userName, email, password }) {
    try {
        const result = await doctorloginInfo.findOne({ userName: userName });
        // console.log("result - ", result);
        if (result === null) {
            return { userName: "NotFound" }
        }
        return result;
    } catch (err) {
        console.log("Error while validating login in controler", err.messsage);
        return { userName: "NotFound" }
    }
}
async function handleLoginUserWithId(id) {
    try {
        const result = await doctorloginInfo.findById(id);
        // console.log("result - ", result);
        if (result === null) {
            return { userName: "NotFound" }
        }
        return result;
    } catch (err) {
        console.log("Error while validating login in controler", err.messsage);
        return { userName: "NotFound" }
    }
}



async function handleDoctorLoginInfo(userName, email, password) {
    const result = await doctorloginInfo.create({ userName, email, password });
    return result;

}

async function handleDoctorAgreementInfo(DoctorLogInId, termsAndServices, privacyAndPolicy, consentOfDataSharing) {
    const result = await doctorAgreementInfo.create({ DoctorLogInId, termsAndServices, privacyAndPolicy, consentOfDataSharing });
    return result;
}

async function handleDoctorBasicInfo(DoctorLogInId, fullName, phone, dateOfBirth, gender) {
    const result = await doctorBasicInfo.create({ DoctorLogInId, fullName, phone, dateOfBirth, gender });
    return result;
}
async function handleDoctorIdentificationInfo(DoctorLogInId, proofOfMedicalLicense, proofOfIdentity, Certifications) {
    const result = await doctorIdentificationInfo.create({ DoctorLogInId, proofOfMedicalLicense, proofOfIdentity, Certifications });
    return result;
}

async function handleDoctorProfessionalInfo(DoctorLogInId, medicalLicenseNumber, specialization, yearsOfExperience, medicalSchool, hospitalOrClinic) {
    const result = await doctorProfessionalInfo.create({ DoctorLogInId, medicalLicenseNumber, specialization, yearsOfExperience, medicalSchool, hospitalOrClinic });
    return result;
}

async function handleDoctorAllProfileData(id) {
    try {
        const result1 = await doctorloginInfo.findById(id).lean();
        const result2 = await doctorBasicInfo.findOne({ DoctorLogInId: id }).lean();
        const result3 = await doctorAgreementInfo.findOne({ DoctorLogInId: id }).lean();
        const result4 = await doctorProfessionalInfo.findOne({ DoctorLogInId: id }).lean();

        const result = { ...result1, ...result2, ...result3, ...result4 };
        console.log(result);

        return result;
    } catch (error) {
        console.log("Error at gettin all doctor data at controller = ", error)
    }
    // const result = await .findOne    
}

module.exports = {
    handleDoctorLoginInfo,
    handleDoctorAgreementInfo,
    handleDoctorBasicInfo,
    handleDoctorProfessionalInfo,
    handleLoginUser,
    handleLoginUserWithId,
    handleDoctorAllProfileData,
    handleDoctorIdentificationInfo,
};
