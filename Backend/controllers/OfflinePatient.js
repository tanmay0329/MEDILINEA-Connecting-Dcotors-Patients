const {offlinePatientRegisteration} = require("../models/OfflinePatientData");

async function handleOfflinePatientEntry(userData) {
    try {
        // Map userData to match the schema structure

        // Save the data in the database
        console.log("Data Entry in offline patient");
        const result = await offlinePatientRegisteration.create(userData);
        console.log("Data Entry in offline patient DONE");
        return result;
    } catch (error) {
        console.error('Error creating user:', error);
        throw error;
    }
}

async function handleAllDataOfOneDoctorOfOfflinePatient(userId) {
    const result = await offlinePatientRegisteration.find({doctorId:userId});
    // console.log("Total Data = ", result);
    return result;
}

module.exports = {
    handleOfflinePatientEntry,
    handleAllDataOfOneDoctorOfOfflinePatient,
};