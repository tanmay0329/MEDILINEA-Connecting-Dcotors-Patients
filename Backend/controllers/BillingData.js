const {
    InitalBillingOnlinePatient,
    CompleteBillingofOnlinePatient,
} = require("../models/BillingData");

    async function handleInitialBilling(allData) {
        try {
            const result = await InitalBillingOnlinePatient.create(allData);
            return result;
        } catch (error) {
            console.log("Error while storing inital billing data", error.messsage);
            return { userName: "NotFound" }
        }
    }


async function handleCompleteBilling(allData) {
    try {
        const result = await CompleteBillingofOnlinePatient.create(allData);
        return result;
    } catch (error) {
        console.log("Error while storing complete billing data", error.messsage);
        return { userName: "NotFound" }
    }
}


async function handleInitialBillingGetAllDataByDoctorId(dId) {
    try {
        const result = await InitalBillingOnlinePatient.find({doctorId:dId});
        return result;
    } catch (error) {
        console.log("Error while storing complete billing data", error.messsage);
        return { userName: "NotFound" }
    }
}


async function handleInitialBillingGetAllDataByPatientId(pId) {
    try {
        const result = await InitalBillingOnlinePatient.find({patientId:pId});
        return result;
    } catch (error) {
        console.log("Error while storing complete billing data", error.messsage);
        return { userName: "NotFound" }
    }
}


module.exports={
    handleInitialBilling,
    handleCompleteBilling,
    handleInitialBillingGetAllDataByDoctorId,
    handleInitialBillingGetAllDataByPatientId,
}

