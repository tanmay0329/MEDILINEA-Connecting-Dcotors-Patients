const {patientBasic, 
    patientIdentification, 
    patientMedicalInformation,
    patientloginCredentials,
    patientPersonalInformation} = require("../models/PatientData")

async function handlePatientBasic(patientIdOfLogCred,fullName, phone, dateOfBirth, gender) {
    console.log("good",patientIdOfLogCred);
    const result = await patientBasic.create({patientIdOfLogCred,fullName, phone, dateOfBirth, gender});
    return result;
}

async function handlePatientIdentification(patientIdOfLogCred,governmentIssuedId, adharNumber){
    const result = await patientIdentification.create({patientIdOfLogCred,governmentIssuedId, adharNumber});
    return result;
}

async function handlePatientMedicalInformation(patientIdOfLogCred,currentMedications, knowAllergies,medicalHistory, pastSurgeries, familyMedicalHistory) {
    // console.log(patientIdOfLogCred)
    const result = await patientMedicalInformation.create({patientIdOfLogCred,currentMedications, knowAllergies, medicalHistory,  pastSurgeries, familyMedicalHistory});
    return result
};

async function handlePatientLoginCredentials(username, email, password){
    const result = await patientloginCredentials.create({username, email, password});
    return result;
};

async function handlePatientPersonalInformation(patientIdOfLogCred, martialStatus, occupation, languagePreference,emergencyContactPhone,emergenecyContactName){
    const result = await patientPersonalInformation.create({patientIdOfLogCred, martialStatus, occupation, languagePreference,emergencyContactPhone,emergenecyContactName});
    return result;
}

async function handleLoginPatientUser(data) {
    try {
        const userName = data.userName;
        console.log(userName)
        const result = await patientloginCredentials.findOne({ username: userName });
        console.log("result - ", result);
        if (result === null) {
            return { userName: "NotFound" }
        }
        
        return result;
    } catch (err) {
        console.log("Error while validating login in controler", err.messsage);
        return { userName: "NotFound" }
    }
}

async function handleAllPatientProfileData(id) {
    try {
        console.log('id',id);
        const result1 = await  patientBasic.findOne({patientIdOfLogCred:id}).lean();
        const result2 = await  patientloginCredentials.findById(id).lean();
        const result3 = await  patientPersonalInformation.findOne({patientIdOfLogCred:id}).lean();
        const result4 = await  patientMedicalInformation.findOne({patientIdOfLogCred:id}).lean();
        const result5 = await  patientIdentification.findOne({patientIdOfLogCred:id}).lean();
        // console.log("result1 = ",result1)
        // console.log("result2 = ",result2)
        // console.log("result3 = ",result3)
        // console.log("result4 = ",result4)
        // console.log("result5 = ",result5)
        // console.log("Ehlllo terhe")
        const totalData = {...result1,...result2,...result3,...result4,...result5}
        // console.log("All patient data= ",totalData)
        return totalData;
        // console.log("totalData = ",totalData)
    } catch (error) {
        
    }
}

async function handleGetSinglePat(params) {
    
}

module.exports = {
    handlePatientBasic,
    handlePatientIdentification,
    handlePatientLoginCredentials,
    handlePatientMedicalInformation,
    handlePatientPersonalInformation,
    handleAllPatientProfileData,
    handleLoginPatientUser,
};