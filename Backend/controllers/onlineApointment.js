const {onlineAppointmentSchema, onlineAppointmentBookedSchema} = require("../models/OnlineAppointment");

async function handleOnlineAppointment(appointmentData) {
    try{

        const result = await onlineAppointmentSchema.create(appointmentData);
        console.log("Online data = ",result);
        return result;
    } catch(err){
        console.log("Error Occured  = ",err.message);
    }
}
async function handleAllDataOfOneDoctorOnlineAppointment(userId) {
    try{
        const result = await onlineAppointmentSchema.find({doctorId:userId});
        return result;
    }catch(err){
        console.log("Error in getting Online Appointment data = ",err);
    }
}

async function handleAllOnlineAppointment() {
    try{
        const result = await onlineAppointmentSchema.find();
        // console.log(result);
        return result;

    } catch(err){
        console.log("All online data error = ",err)
    }
}

async function handleGetAppointmentById(id) {
    try {
        const result = await onlineAppointmentSchema.updateOne(
            { _id: id },  // Assuming id is an ObjectId, no need for `${id}`
            { $set: { appointmentStatus: "Booked" } }
        ).exec();

        return "Booked";
    } catch (error) {
        console.error("Error occurred in controller for getting appointment by id:", error);
    }
}

async function handleAppointmentBookingInfo(doctorId, patientId, appointmentId) {
    try {
        const result = await onlineAppointmentBookedSchema.create({doctorId,patientId, appointmentId});
        return result;

    } catch (error) {
        console.log("Error occured while storing data of booked appointment = ",error);
    }
}

async function handleGetAppointmentDetails(appointmentId) {
    try {
        const result = await onlineAppointmentBookedSchema.findOne({appointmentId:appointmentId});
        // console.log("Result of Getting all info of appontmetn ids =  ",result)
        return result
    } catch (error) {
        console.log("Error occured while storing data of booked appointment = ",error);
    }
}

async function handleAppointmentDelete(appointmentId) {
    try {
        const result = await onlineAppointmentSchema.deleteOne({_id:appointmentId});
        return result;
    } catch (error) {
        console.log("Error occured while deleting an appointment = ",error);
    }
}

async function handleAllPatientIdOfSingleDoctor(doctorId) {
    try {
        const result = await onlineAppointmentBookedSchema.find({doctorId:doctorId});
        console.log("RRRRsult handleAllPatientIdOfSingleDoctor= ",result)
        return result;
    } catch (error) {
        console.log("Error occured while getting all patient id for single doctor = ",error);
    }
}
async function handleAllAppointmentForSinglePatient(pid) {
    try {
        const result = await onlineAppointmentBookedSchema.find({patientId:pid});
        console.log("RRRRsult handleAllAppointmentForSinglePatient= ",result)
        return result;
    } catch (error) {
        console.log("Error occured while getting all patient id for single doctor = ",error);
    }
}

async function handleGetAllDoctorIdsAppointment(dID) {
    try {
        const result = await onlineAppointmentSchema.find({doctorId: dID,});
        return result
    } catch (error) {
        console.log("Error while getting all appointmetn by doctor id",error);
    }
}
async function handleGetAllDoctorIdsAppointmentForPatient(dID,aId) {
    try {
        const result = await onlineAppointmentSchema.findOne({
            doctorId: dID,
            _id: aId
        });
        return result
    } catch (error) {
        console.log("Error while getting all appointmetn by doctor id",error);
    }
}


module.exports = {handleOnlineAppointment, 
    handleAllDataOfOneDoctorOnlineAppointment, 
    handleAllOnlineAppointment, 
    handleGetAppointmentById,
    handleAppointmentBookingInfo, 
    handleAppointmentDelete, 
    handleGetAppointmentDetails,
    handleAllPatientIdOfSingleDoctor,
    handleAllAppointmentForSinglePatient,
    handleGetAllDoctorIdsAppointment,
    handleGetAllDoctorIdsAppointmentForPatient,
}