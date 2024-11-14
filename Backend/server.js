const express = require('express');
const connectDB = require('./connectDB');
const cookieParser = require("cookie-parser");
const bodyParser = require("body-parser");
const cors = require('cors');
const { Server } = require("socket.io");
const http = require("http");
const jwt = require('jsonwebtoken');
require('dotenv').config()

const app = express();
// HTTP server 
const server = http.createServer(app);

// Socket server
const io = new Server(server, {
    cors: {
        origin: 'http://localhost:5173', // Allow only your React app's origin
        methods: ['GET', 'POST'],
        credentials: true                // Allow cookies and other credentials
    }
});

// WebSocket initialization
io.on("connection", (socket) => {
    console.log("Socket.io client connected:", socket.id);

    // Receive message from client
    socket.on("client-message", (message) => {
        console.log("Message from client:", message);

        // Ensure message is sent as an array or in the expected format
        // Here we're emitting the message as an array to ensure compatibility
        io.emit("message", message); // Wrap in an array if it's not one
        
    });
    socket.on("common-area-message", (message) =>{
        console.log("message from commoan area = ",message);
        io.emit("forBookedAppointment", "AppointmentBooked")
    })

    // Handle client disconnection
    socket.on("disconnect", () => {
        console.log("Socket.io client disconnected:", socket.id);
    });
});


// For REST API calls
app.use(cors({
    origin: 'http://localhost:5173', // Allow only your React app's origin
    methods: ['GET', 'POST'],        // Allow specific HTTP methods
    credentials: true                // Allow cookies and other credentials
}));


// DB Module imports for Doctors
const {
    handleDoctorBasicInfo,
    handleDoctorAgreementInfo,
    handleDoctorLoginInfo,
    handleDoctorProfessionalInfo,
    handleLoginUser,
    handleLoginUserWithId,
    handleDoctorAllProfileData,
    handleDoctorIdentificationInfo,
} = require("./controllers/doctor");
// DB Module imports for Patients

const {
    handlePatientBasic,
    handlePatientIdentification,
    handlePatientLoginCredentials,
    handlePatientMedicalInformation,
    handlePatientPersonalInformation,
    handleAllPatientProfileData,
    handleLoginPatientUser,
} = require("./controllers/patient")

// offline patient registration

const { handleOfflinePatientEntry,
    handleAllDataOfOneDoctorOfOfflinePatient } = require("./controllers/OfflinePatient");
// Online Patient function 
const { handleOnlineAppointment,
    handleAllDataOfOneDoctorOnlineAppointment,
    handleAllOnlineAppointment,
    handleGetAppointmentById,
    handleAppointmentBookingInfo,
    handleAppointmentDelete,
    handleGetAppointmentDetails,
    handleAllPatientIdOfSingleDoctor,
    handleAllAppointmentForSinglePatient,
    handleGetAllDoctorIdsAppointment,
    handleGetAllDoctorIdsAppointmentForPatient, } = require("./controllers/onlineApointment");

const { handlePreciptionInfo,
    handleShowAllPrescriptionAppointmentId,
    handleShowAllPrescriptionByDoctorId,
    handleStorePrescriptionOfflinePatient,
    handleShowAllPrescriptionAppointmentIdOfflinePatient,
    handleShowAllPrescriptionPatientId,
} = require('./controllers/prescription');
const { error } = require('console');


const {
    handleInitialBilling,
    handleCompleteBilling,
    handleInitialBillingGetAllDataByDoctorId,
    handleInitialBillingGetAllDataByPatientId,
} = require("./controllers/BillingData");

// Middleware
app.use(express.json());
app.use(bodyParser.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());

// DataBase Connect
connectDB.connectToDB(process.env.MONGODB ?? "mongodb://127.0.0.1:27017/MedicalAppDataBase")
    .then(() => {
        console.log("DB connected");
    });

// REST API calling
app.post("/api/user/doctor/basicInfo", async (req, res) => {
    try {
        const { fullName, phone, dateOfBirth, gender } = req.body;
        console.log(fullName, phone, dateOfBirth, gender);

        const token = req.cookies.userCookie;
        let varifyData = jwt.verify(token, process.env.JWT_SECRET);
        const data = varifyData.UserId;
        console.log(data);

        const result = await handleDoctorBasicInfo(data, fullName, phone, dateOfBirth, gender);
        console.log(result);
        if (result.fullName == fullName) {
            res.json({ msg: "Stored Successfully" })
        } else {

            res.json({ msg: "Not Stored" });
        }

    } catch (error) {
        console.error("Error saving basic info:", error);
        res.status(500).json({ msg: "Error occurred", error: error.message });
    }
});

app.post('/api/user/doctor/loginInfo', async (req, res) => {
    try {
        const { userName, email, password } = req.body;
        console.log(userName, email, password);

        const result = await handleDoctorLoginInfo(userName, email, password);
        const Id = result._id;
        const UId = Id.toString();
        if (result.userName === userName) {
            const token = jwt.sign({
                UserId: UId
            }, process.env.JWT_SECRET);
            res.cookie("userCookie", token)
            res.json({ msg: "UserFound", result });
        }
        else {
            res.json({ msg: "UserNotFound", result });
        }

    }
    catch (err) {
        if (err.message == 'E11000 duplicate key error collection: MedicalAppDataBase.doctoruserlogininfos index: userName_1 dup key: { userName: "Akhilesh" }') {

            console.error("data repeate");
            res.json({ msg: "User Data Repeate" });
        }
        else {

            console.error("Error sending Login Info: ", err.message);
            res.status(500).json({ msg: "Error Occured", error: err.message });
        }
    }
});

app.post('/api/user/doctor/professionalInfo', async (req, res) => {
    try {
        const { medicalLicenseNumber, specialization, yearsOfExperience, medicalSchool, hospitalOrClinic } = req.body;
        console.log(medicalLicenseNumber, specialization, yearsOfExperience, medicalSchool, hospitalOrClinic);
        const token = req.cookies.userCookie;
        let varifyData = jwt.verify(token, process.env.JWT_SECRET);
        const data = varifyData.UserId;
        console.log(data);
        const result = await handleDoctorProfessionalInfo(data, medicalLicenseNumber, specialization, yearsOfExperience, medicalSchool, hospitalOrClinic);
        if (medicalLicenseNumber == result.medicalLicenseNumber) {
            res.json({ msg: "Success" });

        } else {
            res.json({ msg: "Fail", result });
        }
    } catch (err) {
        console.error("Error occured = ", err);
        res.status(500).json({ msg: "Error Occured", error: err.message });
    }
});

app.post('/api/user/doctor/agreementInfo', async (req, res) => {
    try {
        const { termsAndServices, privacyAndPolicy, consentOfDataSharing } = req.body;
        console.log(termsAndServices, privacyAndPolicy, consentOfDataSharing);
        const token = req.cookies.userCookie;
        let varifyData = jwt.verify(token, process.env.JWT_SECRET);
        const data = varifyData.UserId;
        console.log(data);
        const result = await handleDoctorAgreementInfo(data, termsAndServices, privacyAndPolicy, consentOfDataSharing);
        res.json({ msg: "Data Sent", result });
    } catch (err) {
        console.error("Error Occured while post of Agreement = ", err);
        res.status(500).json({ msg: "Error Occured", error: err.message });
    }
});

app.post('/api/user/doctor/', async (req, res) => {
    try {
        const { proofOfMedicalLicense, proofOfIdentity, Certifications } = req.body;
        console.log(proofOfMedicalLicense, proofOfIdentity, Certifications);
        const token = req.cookies.userCookie;
        let varifyData = jwt.verify(token, process.env.JWT_SECRET);
        const data = varifyData.UserId;
        console.log(data);
        const result = await handleDoctorIdentificationInfo(data, proofOfMedicalLicense, proofOfIdentity, Certifications);
        res.json({ msg: "Data Sent", result });

    } catch (error) {
        console.log("Error while getting indentification infomation = ", error);
    }
})

// Doctor Login verification
app.post('/api/user/check/login-credentials', async (req, res) => {
    try {
        const logCred = req.body;
        console.log("logCred = ", logCred);
        const result = await handleLoginUser(logCred)
        console.log("Server Result = ", result);
        const Id = result._id;
        const UId = Id.toString();
        console.log("User Id = ", Id.toString());
        if (result.userName === logCred.userName) {
            const token = jwt.sign({
                UserId: UId
            }, process.env.JWT_SECRET);
            res.cookie("userCookie", token)
            res.json({ msg: "UserFound", result });
        }
        else {
            res.json({ msg: "UserNotFound", result });
        }

    } catch (err) {
        console.error("Error Occured while Login Validation = ", err.message);
        res.status(500).json({ msg: "Error Occured", error: err.message });
    }
});

// API call for All Doctor data for Profile

app.get("/api/user/doctor/all-profile-data", async (req, res) => {
    try {
        const token = req.cookies.userCookie;
        let varifyData = jwt.verify(token, process.env.JWT_SECRET);
        const data = varifyData.UserId;
        console.log(data);
        const result = await handleDoctorAllProfileData(data);
        res.json({ ProfileData: result })
    } catch (error) {
        console.log("Error while getting all data of doctor ", error);
    }
})

app.post('/api/user/patient/basicInfo', async (req, res) => {
    try {
        const { fullName, phone, dateOfBirth, gender } = req.body;
        console.log(fullName, phone, dateOfBirth, gender);
        // console.log(req.cookies.userCookie)
        const token = req.cookies.userCookie;
        let varifyData = jwt.verify(token, process.env.JWT_SECRET);
        const data = varifyData.UserId;
        console.log(data);


        const result = await handlePatientBasic(data, fullName, phone, dateOfBirth, gender);
        console.log(result);

        if (result.fullName == fullName) {
            res.json({ msg: "Successs" });
        }
        else {
            res.json({ msg: "Fail", result });
        }
    } catch (error) {
        console.log("Error occured while saving basic info of patient: ", error);
        res.status(500).json({ msg: "Error Occured", error: error.message });
    }
});

app.post('/api/user/patient/personalInformation', async (req, res) => {
    try {
        const userData = req.body;
        const { martialStatus,
            occupation,
            languagePreference,
            emergencyContactNumber,
            emergencyContactName, } = req.body;
        console.log(userData);
        const token = req.cookies.userCookie;
        let varifyData = jwt.verify(token, process.env.JWT_SECRET);
        const data = varifyData.UserId;
        console.log("Data = ", data);
        const result = await handlePatientPersonalInformation(data, martialStatus, occupation, languagePreference, emergencyContactNumber, emergencyContactName);
        console.log(result);
        if (martialStatus == result.martialStatus) {

            res.json({ msg: "Success", result });
        }
        res.json({ msg: "Fail", result });

    } catch (error) {

    }
})
app.post('/api/user/patient/medicalInfo', async (req, res) => {
    try {
        const { currentMedications, knowAllergies, medicalHistory, pastSurgeries, familyMedicalHistory } = req.body;
        console.log(currentMedications, knowAllergies, medicalHistory, pastSurgeries, familyMedicalHistory);
        const token = req.cookies.userCookie;
        let varifyData = jwt.verify(token, process.env.JWT_SECRET);
        const data = varifyData.UserId;
        console.log("Data = ", data);

        const result = await handlePatientMedicalInformation(data, currentMedications, knowAllergies, medicalHistory, pastSurgeries, familyMedicalHistory);
        console.log(result);

        if (currentMedications == result.currentMedications) {
            res.json({ msg: "Success" });

        } else {

            res.json({ msg: "Fail" });
        }

    } catch (error) {
        console.log("Error occured while saving medical info of patient: ", error);
        res.status(500).json({ msg: "Error Occured", error: error.message });
    }
});
app.post('/api/user/patient/Identification', async (req, res) => {
    try {
        const { governmentIssuedId, adharNumber } = req.body;
        console.log(governmentIssuedId, adharNumber);
        const token = req.cookies.userCookie;
        let varifyData = jwt.verify(token, process.env.JWT_SECRET);
        const data = varifyData.UserId;
        console.log("Data = ", data);

        const result = await handlePatientIdentification(data, governmentIssuedId, adharNumber);
        console.log(result);
        if (governmentIssuedId == result.governmentIssuedId) {
            res.json({ msg: "Success", result });
        }
        else {
            res.json({ msg: "Fail", result });

        }

    } catch (error) {
        console.log("Error occured while saving medical info of patient: ", error);
        res.status(500).json({ msg: "Error Occured", error: error.message });
    }
});

app.post('/api/user/patient/loginInfo', async (req, res) => {
    try {
        const { username, email, password } = req.body;
        console.log(username, email, password);
        // console.log("cokkie = ",req.cookies)                    
        const result = await handlePatientLoginCredentials(username, email, password);
        console.log(result);
        const Id = result._id;
        const UId = Id.toString();
        if (result.username == username) {
            const token = jwt.sign({
                UserId: UId
            }, process.env.JWT_SECRET);
            res.cookie("userCookie", token)
            res.json({ msg: "Success", result });
        }
    } catch (error) {
        if (error.message == 'E11000 duplicate key error collection: MedicalAppDataBase.patientuserlogincredentials index: username_1 collation: { locale: "en", caseLevel: false, caseFirst: "off", strength: 2, numericOrdering: false, alternate: "non-ignorable", maxVariable: "punct", normalization: false, backwards: false, version: "57.1" } dup key: { username: "CollationKey(0x293d37390108)" }' || 'E11000 duplicate key error collection: MedicalAppDataBase.patientuserlogincredentials index: email_1 collation: { locale: "en", caseLevel: false, caseFirst: "off", strength: 2, numericOrdering: false, alternate: "non-ignorable", maxVariable: "punct", normalization: false, backwards: false, version: "57.1" } dup key: { email: "CollationKey(0x293d37390a7a354129393f082d45410112)" }') {

            console.error("data repeate");
            res.json({ msg: "User Data Repeate" });
        }
        else {
            console.error("Error sending Login Info: ", error.message);
            res.status(500).json({ msg: "Error Occured", error: error.message });
        }
    }
});

// Login verification for Patient

app.post("/api/user/patient/login-credentials", async (req, res) => {
    try {
        const logCred = req.body;
        console.log("logCred = ", logCred);
        const result = await handleLoginPatientUser(logCred)
        console.log("Server Result = ", result);
        const Id = result._id;
        const UId = Id.toString();
        console.log("User Id = ", Id.toString());
        if (result.username === logCred.userName) {
            const token = jwt.sign({
                UserId: UId
            }, process.env.JWT_SECRET);
            res.cookie("userCookie", token)
            res.json({ msg: "UserFound", result });
        }
        else {
            res.json({ msg: "UserNotFound", result });
        }
    } catch (err) {
        console.error("Error Occured while Login Validation = ", err.message);
        res.status(500).json({ msg: "Error Occured", error: err.message });
    }
})

// Offline Patient Form Registeration through App API Calls

app.post("/api/user/doctor/offline-registeration-form", async (req, res) => {
    // console.log(req.body);
    // console.log(req.cookies.userCookie);
    const token = req.cookies.userCookie;
    if (!token) {
        res.json({ msg: "Token Not Found" });
    } else {
        res.json({ msg: "Data Sent" })
    }
    try {
        let varifyData = jwt.verify(token, process.env.JWT_SECRET);
        varifyData.doctorId = varifyData.UserId;
        const Id = varifyData.UserId;
        const resultForId = await handleLoginUserWithId(Id);
        console.log("Result = ", resultForId);
        userDataObj = {
            doctorName: resultForId.userName,
            doctorOtherInformation: resultForId.email,
        }
        console.log("vairy daa = ", varifyData);
        const formData = req.body;
        let combo = { ...varifyData, ...userDataObj, ...formData }
        console.log(combo);
        // console.log("Hi")
        const result = await handleOfflinePatientEntry(combo);
        // console.log("hello")
        console.log(result);
    } catch (err) {
        console.log("error occured = ", err)
    }
});

app.post('/api/user/doctor/offline-Patient-Regiter/', async (req, res) => {
    try {
        const offlinePatientRegistration = req.body;
        console.log(offlinePatientRegistration);
        // const result = await handleOfflinePatientEntry(offlinePatientRegistration);
        res.json({ msg: "Data sent", result });
    } catch (err) {
        console.log("Error Occured While registering the offline patinet form", err);
        res.status(500).json({ msg: "Error Occured", error: err.message });
    }
})

// Online Appointment data from frontend
app.post("/api/user/docotor-create-online-appointment", async (req, res) => {
    try {
        const token = req.cookies.userCookie;
        if (!token) {
            res.json({ msg: "Token Not Found" });
        } else {
            res.json({ msg: "Data Sent" })
        }
        let varifyData = jwt.verify(token, process.env.JWT_SECRET);
        varifyData.doctorId = varifyData.UserId;
        const Id = varifyData.UserId;
        const resultForId = await handleLoginUserWithId(Id);
        console.log("Result = ", resultForId);
        userDataObj = {
            doctorName: resultForId.userName,
            doctorOtherInformation: resultForId.email,
        }
        console.log("vairy daa = ", varifyData);
        const formData = req.body;
        let combo = { ...varifyData, ...userDataObj, ...formData }
        console.log(combo);
        const result = await handleOnlineAppointment(combo);
        console.log("Result = ", result)
    } catch (err) {
        console.log("Error occured = ", err);
    }
})

// syntatic data
// JWT token verify code
// app.post("/user/login", async(req,res)=>{
//     const token = req.cookies.uid;
//     if(!token){
//         return res.json({msg:"Token not found"});
//     }
//     try{
//         const ver = jwt.verify(token, secret);
//         console.log("token = ",ver);
//         console.log("name = ",req.body.value);
//         if(ver.name === req.body.value){
//             res.json({msg:"User Found"})
//         }
//         else{
//             res.json({msg:"User Not found"})
//         }
//     }catch(err){
//         console.log("Error occured in the token");
//         res.json({ msg: "Token verification failed" });
//     }
// })

// Get API calls for Card data of offline patient apointment data card
app.get("/api/user/patient-show/", async (req, res) => {
    const token = req.cookies.userCookie;
    if (!token) {
        return res.json({ msg: "Token Not Found" });
    }
    let varifyData = jwt.verify(token, process.env.JWT_SECRET);
    // console.log("vairy daa = ", varifyData);

    const result = await handleAllDataOfOneDoctorOfOfflinePatient(varifyData.UserId)
    // console.log("THIS  = ",result);
    console.log("GOOOOOOOOOOOD");
    res.json({ data: result });
})

// API call for getting all single doctor's patient card info
app.get("/api/user/doctor/online-booking-show", async (req, res) => {
    try {
        const token = req.cookies.userCookie;
        let varifyData = jwt.verify(token, process.env.JWT_SECRET);
        const data = varifyData.UserId;
        console.log("Id = ", data);
        const result1 = await handleAllPatientIdOfSingleDoctor(data)
        console.log(result1)
        const patientIds = result1.map(record => record.patientId);
        const appointmentIds = result1.map(record => record.appointmentId);

        let allPatients = [];
        for (let i = 0; i < patientIds.length; i++) {
            const result = await handleAllPatientProfileData(patientIds[i]);
            result.appointmentId = appointmentIds[i]; // Add appointmentId to the patient data
            allPatients.push(result); // Add updated patient data to the array
        }
        console.log("allll paitnet = ",allPatients); 

        res.json({ msg: allPatients })

    } catch (error) {

    }
})
//  API call for data request for online appointment data card.

app.get("/api/user/appointment-show/", async (req, res) => {
    try {
        const token = req.cookies.userCookie;
        if (!token) {
            return res.json({ msg: "Token Not Found" });
        }
        const varifyData = jwt.verify(token, process.env.JWT_SECRET);

        const result = await handleAllDataOfOneDoctorOnlineAppointment(varifyData.UserId);
        res.json({ data: result });
    } catch (err) {
        console.log("Error while getting info of online appointment = ", err);
    }
})

// Api call for common area data card
app.get("/api/user/all-appointment-data", async (req, res) => {
    try {
        const result = await handleAllOnlineAppointment();
        // console.log("All data - ", result)
        res.json({ result: result })
    } catch (err) {
        console.log("Error with getting all appointment data = ", err)
    }
})

// API call for getting all profile data 
app.get("/api/user/patient/all-profile-data", async (req, res) => {
    console.log(req.body)
    const token = req.cookies.userCookie;
    let varifyData = jwt.verify(token, process.env.JWT_SECRET);
    const data = varifyData.UserId;
    console.log("Id = ", data);
    const result = await handleAllPatientProfileData(data);
    res.json({ PatientData: result });
})

// Appointment Booking API calls

app.post("/api/user/commonArea/book-appointment", async (req, res) => {
    try {
        const data = req.body;
        const token = req.cookies.userCookie;
        let varifyData = jwt.verify(token, process.env.JWT_SECRET);
        const uid = varifyData.UserId;
        // console.log("appointment Id = ", data.appointmentId)
        // console.log("Appointment Id = ", data.doctorId)
        // console.log("Patient Id = ", uid)
        const resultOfAppointment = await handleGetAppointmentById(data.appointmentId)
        const resultOfSavingBookedAppointment = await handleAppointmentBookingInfo(data.doctorId, uid, data.appointmentId)
        console.log("resultOfAppointment", resultOfAppointment)
        console.log("resultOfSavingBookedAppointment", resultOfSavingBookedAppointment)
        res.json({msg:"Booked"})

    } catch (err) {
        console.log("Error Occured While getting the appoinment id and doctor id from comman area", err);
        res.status(500).json({ msg: "Error Occured", error: err.message });
    }
})

// API call for getting all single doctor appointment for prescriptions
app.get("/api/user/doctor/online-booking-info-show", async(req,res)=>{
    try {
        const data = req.body;
        const token = req.cookies.userCookie;
        let varifyData = jwt.verify(token, process.env.JWT_SECRET);
        const uid = varifyData.UserId;
        const result = await handleAllDataOfOneDoctorOnlineAppointment(uid);
        // console.log("Result = ",result)
        res.json({appointmentData: result});
        
    } catch (error) {
        console.log("Error occured while getting single doctor appointments info for patent management", error);
    }
})

// Appointment Delete API call
app.delete("/api/user/doctor/delete-appointment:id", async (req, res) => {
    try {
        const data = req.params;
        console.log("AID = ", data);
        await handleAppointmentDelete(data.id);
        res.json({ msg: "Got request" })
    } catch (error) {
        console.log("Error in server while getting delete api call")
    }
})

// Online Appointment Data showing 

app.get("/api/user/doctor/patient-info:appointmentId", async (req, res) => {
    try {
        const data = req.params;
        console.log("Appointment Id = ", data);
        const result1 = await handleGetAppointmentDetails(data.appointmentId);
        // console.log(result1.patientId);
        const result2 = await handleAllPatientProfileData(result1.patientId);
        // console.log(result2.fullName);
        // console.log(result2.email);
        // console.log(result2.dateOfBirth);
        // console.log(result2.phone);
        // console.log(result2.phone);
        const patientNomralInfo = {
            fullName: result2.fullName,
            email: result2.email,
            dateOfBirth: result2.dateOfBirth,
            phone: result2.phone
        }
        console.log("All Data - ",patientNomralInfo)
        res.json({ msg: patientNomralInfo })
    } catch (error) {

    }
})

// API call for prescription storing
app.post("/api/user/doctor/prescription", async (req, res) => {
    try {
        const allData = req.body;
        console.log("All Prescription data = ", allData);
        const token = req.cookies.userCookie;
        let varifyData = jwt.verify(token, process.env.JWT_SECRET);
        const uid = varifyData.UserId;
        console.log("Doctor Id = ",uid);
        allData.doctorId = uid;

        await handlePreciptionInfo(allData)
        res.json({ SentData: allData })

    } catch (error) {
        console.log("Error while getting prescription data = ", error);
    }
})

// API call for prescription storing of offline patient
app.post("/api/user/doctor/prescription-offline-patient", async (req, res) => {
    try {
        const allData = req.body;
        console.log("All Prescription data for offline patient = ", allData);
        const token = req.cookies.userCookie;
        let varifyData = jwt.verify(token, process.env.JWT_SECRET);
        const uid = varifyData.UserId;
        // allData.doctorId = uid;

        await handleStorePrescriptionOfflinePatient(allData)
        res.json({ SentData: allData })

    } catch (error) {
        console.log("Error while getting prescription data = ", error);
    }
})

// API call for prescription updating
app.put("/api/user/doctor/prescription-update", async (req, res) => {
    try {
        const aid = req.body;
        console.log("Pricritpion update data = ", aid);
        // await handlePreciptionInfo(allData)
        res.json({ SentData: aid })
    } catch (error) {
        console.log("Error while getting prescription data = ", error);
    }
})


app.get("/api/user/doctor/show-prescription:aid", async (req, res) => {
    try {
        const aid = req.params.aid;
        console.log("AID = ", aid);
        const result = await handleShowAllPrescriptionAppointmentId(aid)
        res.json({ singlePrescription: result })
    } catch (error) {
        console.log("Error while getting all prescription data", error);
    }
})
app.get("/api/user/doctor/offline-patient-show-prescription:aid", async (req, res) => {
    try {
        const aid = req.params.aid;
        console.log("AID = ", aid);
        const result = await handleShowAllPrescriptionAppointmentIdOfflinePatient(aid)
        res.json({ singlePrescription: result })
    } catch (error) {
        console.log("Error while getting all prescription data", error);
    }
})

// API call for Getting all appointment for single Patient 
app.get("/api/user/patient/all-patient-appointment", async (req, res) => {
    try {
        const token = req.cookies.userCookie;
        let varifyData = jwt.verify(token, process.env.JWT_SECRET);
        const uid = varifyData.UserId;
        console.log("Patinet = ", uid);

        const result1 = await handleAllAppointmentForSinglePatient(uid);

        const doctorIds = result1.map(record => record.doctorId);
        const appointmentIds = result1.map(record => record.appointmentId);
        // console.log("Appointment IDs = ",appointmentIds);
        // console.log("Doctor IDs = ",doctorIds);

        let allAppointments = [];
        for (let i = 0; i < doctorIds.length; i++) {
            const result = await handleGetAllDoctorIdsAppointmentForPatient(doctorIds[i],appointmentIds[i]);
            // result.appointmentId = appointmentIds[i]; // Add appointmentId to the patient data
            allAppointments.push(result); // Add updated patient data to the array
        }

        
        console.log("All Online appointment booked by single Patinet = ", allAppointments);
        res.json({ allAppointments: allAppointments });
    } catch (error) {
        console.log("Error while getting single patient appointment data = ", error);
    }
})
app.get("/api/user/patient/all-patient-appointment-count", async (req, res) => {
    try {
        const token = req.cookies.userCookie;
        let varifyData = jwt.verify(token, process.env.JWT_SECRET);
        const uid = varifyData.UserId;
        console.log("Patinet = ", uid);

        const result1 = await handleAllAppointmentForSinglePatient(uid);

        const doctorIds = result1.map(record => record.doctorId);
        const appointmentIds = result1.map(record => record.appointmentId);
        // console.log("Appointment IDs = ",appointmentIds);
        // console.log("Doctor IDs = ",doctorIds);

        let allAppointments = [];
        for (let i = 0; i < doctorIds.length; i++) {
            const result = await handleGetAllDoctorIdsAppointmentForPatient(doctorIds[i],appointmentIds[i]);
            // result.appointmentId = appointmentIds[i]; // Add appointmentId to the patient data
            allAppointments.push(result); // Add updated patient data to the array
        }
        const count = allAppointments.length;
        res.json({ allAppointmentsCount: count });
    } catch (error) {
        console.log("Error while getting single patient appointment data = ", error);
    }
})

app.get("/api/user/doctor/prescriptions", async (req, res) => {
    try {
        const token = req.cookies.userCookie;
        let varifyData = jwt.verify(token, process.env.JWT_SECRET);
        const uid = varifyData.UserId;
        console.log("Patinet = ", uid);

        const result = await handleShowAllPrescriptionByDoctorId(uid);
        res.json({msg:result})
    } catch (error) {
        console.log("Error occured while getting all prescription of single doctor = ",error)

    }

})

// API calls for Billing Purpose
app.get("/api/user/doctor/billing/online-patient-data", async (req, res) => {
    try {
        const token = req.cookies.userCookie;
        let varifyData = jwt.verify(token, process.env.JWT_SECRET);
        const data = varifyData.UserId;
        // console.log("Id = ", data);
        const result1 = await handleAllPatientIdOfSingleDoctor(data)
        // console.log(result1)
        const patientIds = result1.map(record => record.patientId);
        const appointmentIds = result1.map(record => record.appointmentId);

        let allPatients = [];
        for (let i = 0; i < patientIds.length; i++) {
            const result = await handleAllPatientProfileData(patientIds[i]);
            result.appointmentId = appointmentIds[i]; // Add appointmentId to the patient data
            allPatients.push(result); // Add updated patient data to the array
        }
        // console.log("allll paitnet = ",allPatients); 

        res.json({ msg: allPatients })

    } catch (error) {

    }
})

app.get("/api/user/doctor/billing/online-appointment-data", async (req, res) => {
    try {
        const token = req.cookies.userCookie;
        let varifyData = jwt.verify(token, process.env.JWT_SECRET);
        const uid = varifyData.UserId;
        console.log("Doctor for Billing = ", uid);

        const result = await handleGetAllDoctorIdsAppointment(uid);
        console.log("All Appointment of Given Id doctor = ",result)
        res.json({msg:result})
    } catch (error) {
        console.log("Error occured while getting all prescription of single doctor = ",error)

    }
})

app.get("/api/user/doctor/billing/online-prescription-data", async (req, res) => {
    try {
        const token = req.cookies.userCookie;
        let varifyData = jwt.verify(token, process.env.JWT_SECRET);
        const uid = varifyData.UserId;
        console.log("Patinet = ", uid);

        const result = await handleShowAllPrescriptionByDoctorId(uid);
        res.json({msg:result})
    } catch (error) {
        console.log("Error occured while getting all prescription of single doctor = ",error)

    }

})

// API call for storing billing info

app.post("/api/user/doctor/billing/inital-billing",async(req,res)=>{
    try {
        const token = req.cookies.userCookie;
        let varifyData = jwt.verify(token, process.env.JWT_SECRET);
        const uid = varifyData.UserId;
        console.log("doctor id for initial billing = ", uid);

        const allData = req.body;
        // console.log("All inital data = ",patientId, doctorId, appointmentId,serviceorTreatment, durationOfService,costOfService, discount,totalAmount, paymentMethod, billingNotes)

        const result = await handleInitialBilling(allData)
        console.log("Result store complete billing = ",result)
        
    } catch (error) {
        console.log("Error getting inital biling = ",error);
    }
})


app.get("/api/user/doctor/billing/initial-billing/get-info",async(req,res)=>{
    try {
        const token = req.cookies.userCookie;
        let varifyData = jwt.verify(token, process.env.JWT_SECRET);
        const uid = varifyData.UserId;
        console.log("doctor id for complete billing = ", uid);
        const result = await handleInitialBillingGetAllDataByDoctorId(uid)

        console.log("Result initial biling for doctor = ",result)
        res.json({msg:result})
    } catch (error) {
        console.log("Error getting complete biling = ",error);
    }
})



// API calls for patinet's history, billing, prescritpion
app.get("/api/user/patient/all-billing-info",async(req,res)=>{
    try {
        const token = req.cookies.userCookie;
        let varifyData = jwt.verify(token, process.env.JWT_SECRET);
        const uid = varifyData.UserId;
        console.log("patient id for complete billing = ", uid);
        const result = await handleInitialBillingGetAllDataByPatientId(uid)

        console.log("Result inital biling for patient = ",result)
        res.json({msg:result});
    } catch (error) {
        console.log("Error getting complete biling = ",error);
    }
})

app.get("/api/user/patient/all-appointment-info",async(req,res)=>{
    try {
        const token = req.cookies.userCookie;
        let varifyData = jwt.verify(token, process.env.JWT_SECRET);
        const uid = varifyData.UserId;
        console.log("Patinet = ", uid);

        const result1 = await handleAllAppointmentForSinglePatient(uid);

        const doctorIds = result1.map(record => record.doctorId);
        const appointmentIds = result1.map(record => record.appointmentId);
        // console.log("Appointment IDs = ",appointmentIds);
        // console.log("Doctor IDs = ",doctorIds);

        let allAppointments = [];
        for (let i = 0; i < doctorIds.length; i++) {
            const result = await handleGetAllDoctorIdsAppointmentForPatient(doctorIds[i],appointmentIds[i]);
            // result.appointmentId = appointmentIds[i]; // Add appointmentId to the patient data
            allAppointments.push(result); // Add updated patient data to the array
        }
        
        console.log("All appointment = ", allAppointments);
        res.json({ msg: allAppointments });
    } catch (error) {
        console.log("Error while getting single patient appointment data = ", error);
    }
})


// app.get("/api/user/patient/all-doctor-info",async(req,res)=>{
//     try {
//         const token = req.cookies.userCookie;
//         let varifyData = jwt.verify(token, process.env.JWT_SECRET);
//         const uid = varifyData.UserId;
//         console.log("patient id for complete billing = ", uid);
//         const result = await handleInitialBillingGetAllDataByPatientId(uid)

//         console.log("Result inital biling for patient = ",result)
//     } catch (error) {
//         console.log("Error getting complete biling = ",error);
//     }
// })


app.get("/api/user/patient/all-prescription-info",async(req,res)=>{
    try {
        const token = req.cookies.userCookie;
        let varifyData = jwt.verify(token, process.env.JWT_SECRET);
        const uid = varifyData.UserId;
        console.log("patient id for complete presc = ", uid);
        const result = await handleShowAllPrescriptionPatientId(uid)
        res.json({msg:result});
        console.log("Result inital Prescritpion for patient = ",result)
    } catch (error) {
        console.log("Error getting complete biling = ",error);
    }
})


app.get("/api/doctor/dashboard/appointment-count",async(req,res)=>{
    try {
        const token = req.cookies.userCookie;
        let varifyData = jwt.verify(token, process.env.JWT_SECRET);
        const uid = varifyData.UserId;
        console.log("Doctor Id for count of appointment = ",uid);
        const result1 = await handleAllDataOfOneDoctorOnlineAppointment(varifyData.UserId);
        const result2 = await handleAllDataOfOneDoctorOfOfflinePatient(varifyData.UserId);
        const OnlineAppointmentCount = result1.length;     
        const OfflineAppointmentCount = result2.length;
        res.json({OnlineAppointmentCount:OnlineAppointmentCount, OfflineAppointmentCount:OfflineAppointmentCount})      
    } catch (error) {
        console.log("Error Occured while getting total count of appointments of doctor= ",error);
        res.json({data:"Error"})
    }
})

const port = process.env.PORT || 8000;

server.listen(port, () => {
    console.log('Server is running on http://localhost:8000');
});
