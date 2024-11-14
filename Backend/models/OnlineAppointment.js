const mongoose = require("mongoose");

const OnlineAppointmentSchema = new mongoose.Schema({
    doctorId: { type: String, required: true },

    doctorName: { type: String, required: true },

    doctorOtherInformation: { type: String },

    patientType: {
        type: String,
        required: true,
    },

    dateOfAppointment: {
        type: String
    },
    timeOfAppointment: {
        type: String,
        required: true,
    },
    typeOfAppointment: {
        type: String,
        required: true,
    },
    reasonOfAppointment: {
        type: String,
        required: true,
    },
    locationOfAppointment: {
        type: String,
        required: true,
    },
    durationOfAppointment: {
        type: String,
        required: true,
    },
    appointmentStatus: {
        type: String
    }
}, { timestamps: true })
const onlineAppointmentSchema = mongoose.model("onlineAppointmentCollection", OnlineAppointmentSchema)

const OnlineAppointmentBookedSchema = new mongoose.Schema({
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
},{timestamps:true})

const onlineAppointmentBookedSchema = mongoose.model("onlineAppointmentBookedSchema", OnlineAppointmentBookedSchema);
module.exports = {
    onlineAppointmentSchema,
    onlineAppointmentBookedSchema,
}