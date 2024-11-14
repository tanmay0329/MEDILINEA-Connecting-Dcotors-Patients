import { useState, useEffect } from 'react'
import { io } from "socket.io-client";

import HeaderForDashboardComponent from "./HeaderForDashboardComponent"
import axios from 'axios';

const ManageAppoinment = () => {
  const [PatientEditPanel, setPatientEditPanel] = useState(false);
  const [PatientHistoryPanel, setPatientHistoryPanel] = useState(false);

  const [socketMsg, setSocketMsg] = useState(false)

  const [appointmentCardData, setAppointmentCardData] = useState([]);
  const [appointmentPop, setAppoinmentPop] = useState(false);

  const [dateOfAppointment, setDateOfAppointment] = useState("");
  const [timeOfAppointment, setTimeOfAppointment] = useState("");
  const [typeOfAppointment, setTypeOfAppointment] = useState("");
  const [reasonOfAppointment, setReasonOfAppointment] = useState("");
  const [locationOfAppointment, setLocationOfAppointment] = useState("");
  const [durationOfAppointment, setDurationOfAppointment] = useState("");

  const [editAppointment, setEditAppointment] = useState(null);
  const [veiwAppointmentDetails, setVeiwAppointmentDetails] = useState(false);
  const [onlineAppointmentDetials, setOnlineAppointmentDetails] = useState("");


  const [fullName, setFullName] = useState("")
  const [dob, setDob] = useState("")
  const [gender, setGender] = useState("")
  const [contactNumber, setContactNumber] = useState("")
  const [email, setEmail] = useState("")
  const [address, setAddress] = useState("")
  const [emergencyContactNumber, setEmergencyContactNumber] = useState("")
  const [emergencyContactName, setEmergencyContactName] = useState("")
  const [OfflinePatientData, setOfflinePatientData] = useState([])


  const handleAppointmentSubmit = async () => {
    const patientType = "onlineEntry";
    const appointmentStatus = "Unbooked"


    try {
      const resp = await axios.post("/api/user/docotor-create-online-appointment", {
        patientType,
        dateOfAppointment,
        timeOfAppointment,
        typeOfAppointment,
        reasonOfAppointment,
        locationOfAppointment,
        durationOfAppointment,
        appointmentStatus
      })

      const msg = `${typeOfAppointment} created`
      const socket = io("http://localhost:8000");

      socket.emit('client-message', msg);
      console.log("Message Sent");
      console.log(resp);
      setDateOfAppointment("")
      setTimeOfAppointment("")
      setTypeOfAppointment("")
      setReasonOfAppointment("")
      setLocationOfAppointment("")
      setDurationOfAppointment("")
    } catch (err) {
      console.log("Error occurd ", err);
    }
  }


  // const handleSendMsg = () => {
  //   const msg = `${typeOfAppointment} created`
  //   const socket = io("http://localhost:8000");

  //   socket.emit('client-message', msg);
  //   console.log("Message Sent");
  // }

  useEffect(() => {
    const handleAppointmentData = async () => {
      console.log("Helllo There")
      try {

        const resp = await axios.get("/api/user/appointment-show/")
        setAppointmentCardData(resp.data.data)
        // console.log(resp.data.data)
      } catch (err) {
        console.log("Error Occured = ", err);
      }
    }
    handleAppointmentData();
  }, [appointmentPop , editAppointment, socketMsg])

  useEffect(() => {
    const socket = io("http://localhost:8000");
  
    socket.on("connect", () => {
      console.log("Socket is connected");
    });
  
    socket.on("forBookedAppointment", (message) => {
      setSocketMsg(!socketMsg);
      console.log("message from manageAppoinment for web socket = ", message);
    });
  
    return () => socket.disconnect(); // Clean up the socket connection on unmount
  }, [socketMsg]);
  

  useEffect(() => {
    const handleOfflinePatientCardInfo = async () => {
      try {
        const resp = await axios.get("/api/user/patient-show/");
        setOfflinePatientData(resp.data.data)
      } catch (err) {
        console.log(err);
      }
    };
  
    if (PatientEditPanel) {
      handleOfflinePatientCardInfo();
    }
  }, [PatientEditPanel]); // Only trigger when PatientEditPanel is opened
  

  const handleOfflinePatientFormSubmit = async () => {
    const patientType = "offlineEntry";
    try {
      const resp = await axios.post("/api/user/doctor/offline-registeration-form", {
        patientType,
        fullName,
        dob,
        gender,
        contactNumber,
        email,
        address,
        emergencyContactNumber,
        emergencyContactName
      })
      console.log(resp)
      setFullName("")
      setDob("")
      setGender("")
      setContactNumber("")
      setEmail("")
      setAddress("")
      setEmergencyContactNumber("")
      setEmergencyContactName("")

    } catch (err) {
      console.log("Error", err)
    }
  }


  const handleAppointmentPop = () => {
    console.log("click")
    setAppoinmentPop(!appointmentPop);
    console.log(appointmentPop)
  }

  const openModal = (appointment) => {
    setEditAppointment(appointment);
  };

  const closeModal = () => {
    setEditAppointment(null);
  };

  const handlePatientEditPanel = () => {
    setPatientEditPanel(!PatientEditPanel);
  }
  const handlePatientHistoryPanel = () => {
    setPatientHistoryPanel(!PatientHistoryPanel);
  }

  async function handlePatientInfoToDoctor(appointmentId) {
    try {
      const resp = await axios.get(`/api/user/doctor/patient-info${appointmentId}`)
      console.log("aid = ",appointmentId)
      // console.log("Resp = ", resp.data.msg[0].fullName)
      // console.log("Resp = ", resp.data.fullName)
      setOnlineAppointmentDetails(resp.data.msg);
      console.log(onlineAppointmentDetials.email)

    } catch (error) {
      console.log("Error occured while getting patient info for doctor = ", error);
    }
  }

  async function handleDeleteAppointment(appointmentId) {
    try {
      const resp = await axios.delete(`/api/user/doctor/delete-appointment${appointmentId}`)
      console.log("resp for handling delete appointment = ", resp);
    } catch (error) {
      console.log("Error while sending appointment delete api ", error);
    }
  }


  return (
    <div className='bg-[#0d3254] text-[#dbe5ef] h-[100%]'>
      <HeaderForDashboardComponent />
      <button className='border-2 border-blue-700 rounded-xl my-4 mx-4 py-2 px-2 hover:shadow-md hover:shadow-blue-500 duration-300 hover:-translate-y-1' onClick={handleAppointmentPop}>
        {appointmentPop ? "Exit Edit" : "Make Appoinment"}</button>

      <div className={`z-10 absolute  bg-blue-900 border-4 border-blue-800 rounded-xl w-fit ${appointmentPop ? "flex flex-col" : "hidden"} transition-all duration-300`}>
        <div className='text-lg font-light my-2 mx-2 text-slate-100 '>Appointment Details</div>
        <div className='text-lg font-light my-2 mx-2 text-slate-100 '>Date of Appointment</div>
        <input className='w-[15rem] px-2 py-1 mx-2 my-2 rounded-lg text-slate-900' type="date" placeholder='Enter Date' value={dateOfAppointment} onChange={(e) => setDateOfAppointment(e.target.value)} />
        <div className='text-lg font-light my-2 mx-2 text-slate-100 '>Appointment Time</div>
        <input className='w-[15rem] px-2 py-1 mx-2 my-2 rounded-lg text-slate-900' type="time" placeholder='Enter Time' value={timeOfAppointment} onChange={(e) => setTimeOfAppointment(e.target.value)} />
        <div className='text-lg font-light my-2 mx-2 text-slate-100 '>Type of Appointment</div>
        <select className='w-[15rem] px-2 py-1 mx-2 my-2 rounded-lg text-slate-900' type="text" placeholder='Appointment Type' value={typeOfAppointment} onChange={(e) => setTypeOfAppointment(e.target.value)}>            {/* 557781 */}
              <option className='text-black w-10' value="Select Appointment Type">Select Type</option>
              <option className='text-black w-10' value="Online">Online</option>
              <option className='text-black w-10' value="Offline">Offline</option>
            </select>
        <div className='text-lg font-light my-2 mx-2 text-slate-100 '>Reason for Appointment</div>
        <input className='w-[15rem] px-2 py-1 mx-2 my-2 rounded-lg text-slate-900' type="text" placeholder='Description' value={reasonOfAppointment} onChange={(e) => setReasonOfAppointment(e.target.value)} />
        <div className='text-lg font-light my-2 mx-2 text-slate-100 '>Location Of Appointment</div>
        <input className='w-[15rem] px-2 py-1 mx-2 my-2 rounded-lg text-slate-900' type="text" placeholder='Specify Location of Appointment' value={locationOfAppointment} onChange={(e) => setLocationOfAppointment(e.target.value)} />
        <div className='text-lg font-light my-2 mx-2 text-slate-100 '>Duration</div>
        <input className='w-[15rem] px-2 py-1 mx-2 my-2 rounded-lg text-slate-900' type="text" placeholder='What is duration of appointment' value={durationOfAppointment} onChange={(e) => setDurationOfAppointment(e.target.value)} />
        <button className='w-fit px-4 py-2 my-2 font-light text-lg text-slate-100 bg-slate-900  self-center rounded-lg' onClick={()=>{handleAppointmentSubmit(), setAppoinmentPop(!appointmentPop)}}>Create Appointment</button>
      </div>
      <button className="border-2 border-blue-700 rounded-xl my-4 mx-4 py-2 px-2 hover:shadow-md hover:shadow-blue-500 duration-300 hover:-translate-y-1" onClick={handlePatientEditPanel}>{PatientEditPanel ? "Exit Patient Form" : "Add new Patient"}</button>
      <div className={`flex flex-col ml-10  border-2 border-black rounded-xl w-fit scrollbar scrollbar-thumb-gray-900 scrollbar-track-gray-100 z-50 absolute bg-white ${PatientEditPanel ? "" : "hidden"} `}>
        <div className="text-lg font-light my-2 mx-2 text-slate-900 ">Personal Information
        </div>
        <input className="border-2 border-black rounded-lg text-slate-900 font-light mx-5 my-1 py-2 px-4 " type="text" placeholder="Full name" value={fullName} onChange={(e) => setFullName(e.target.value)} />
        <input className="border-2 border-black rounded-lg text-slate-900 font-light mx-5 my-1 py-2 px-4 " type="text" placeholder="DOB" value={dob} onChange={(e) => setDob(e.target.value)} />
        <select className="border-2 border-black rounded-lg text-slate-900 font-light mx-5 my-1 py-2 px-4 " type="text" placeholder="Gender" value={gender} onChange={(e) => setGender(e.target.value)} >
              <option className='text-black w-10' value="Select Gender">Select Gender</option>
              <option className='text-black w-10' value="male">Male</option>
              <option className='text-black w-10' value="female">Female</option>
              <option className='text-black w-10' value="other">Other</option>
            </select>
        <div className="text-lg font-light my-2 mx-2 text-slate-900 ">Contact Information:</div>
        <input className="border-2 border-black rounded-lg text-slate-900 font-light mx-5 my-1 py-2 px-4 " type="text" placeholder="Contact Number" value={contactNumber} onChange={(e) => setContactNumber(e.target.value)} />
        <input className="border-2 border-black rounded-lg text-slate-900 font-light mx-5 my-1 py-2 px-4 " type="text" placeholder="Email if Available" value={email} onChange={(e) => setEmail(e.target.value)} />
        <div className="text-lg font-light my-2 mx-2 text-slate-900 ">Address</div>
        <input className="border-2 border-black rounded-lg text-slate-900 font-light mx-5 my-1 py-2 px-4 " type="text" placeholder="complete Address" value={address} onChange={(e) => setAddress(e.target.value)} />
        <div className="text-lg font-light my-2 mx-2 text-slate-900 ">Emergency Contact</div>
        <input className="border-2 border-black rounded-lg text-slate-900 font-light mx-5 my-1 py-2 px-4 " type="text" placeholder="Emeregency Contact" value={emergencyContactNumber} onChange={(e) => setEmergencyContactNumber(e.target.value)} />
        <input className="border-2 border-black rounded-lg text-slate-900 font-light mx-5 my-1 py-2 px-4 " type="text" placeholder="Emeregency ContactName" value={emergencyContactName} onChange={(e) => setEmergencyContactName(e.target.value)} />
        <div className="text-lg font-light my-2 mx-2 text-slate-900 ">Medical Information</div>
        <div className="text-lg font-light my-2 mx-2 text-slate-900 ">Medical History</div>
        <input className="border-2 border-black rounded-lg text-slate-900 font-light mx-5 my-1 py-2 px-4 " type="text" name="" id="" placeholder="Known Allergies (e.g., medications, foods, etc.)" />
        <input className="border-2 border-black rounded-lg text-slate-900 font-light mx-5 my-1 py-2 px-4 " type="text" name="" id="" placeholder="Chronic Conditions (e.g., diabetes, hypertension)" />
        <input className="border-2 border-black rounded-lg text-slate-900 font-light mx-5 my-1 py-2 px-4 " type="text" name="" id="" placeholder="Past Surgeries" />
        <input className="border-2 border-black rounded-lg text-slate-900 font-light mx-5 my-1 py-2 px-4 " type="text" name="" id="" placeholder="Family Medical History (e.g., hereditary diseases)" />
        <div className="text-lg font-light my-2 mx-2 text-slate-900 ">Current Medications</div>
        <input className="border-2 border-black rounded-lg text-slate-900 font-light mx-5 my-1 py-2 px-4 " type="text" placeholder="List of medications currently being taken" />
        <div className="text-lg font-light my-2 mx-2 text-slate-900 ">Blood Type</div>
        <input className="border-2 border-black rounded-lg text-slate-900 font-light mx-5 my-1 py-2 px-4 " type="text" placeholder="blood type" />
        <div className="text-lg font-light my-2 mx-2 text-slate-900 ">Smoking/Alcohol/Drug Use</div>
        <input className="border-2 border-black rounded-lg text-slate-900 font-light mx-5 my-1 py-2 px-4 " type="text" name="" id="" placeholder="Social history" />
        <div className="text-lg font-light my-2 mx-2 text-slate-900 ">Height</div>
        <input className="border-2 border-black rounded-lg text-slate-900 font-light mx-5 my-1 py-2 px-4 " type="text" placeholder="For baseline measurements" />
        <div className="text-lg font-light my-2 mx-2 text-slate-900 ">Height and Weight</div>
        <input className="border-2 border-black rounded-lg text-slate-900 font-light mx-5 my-1 py-2 px-4 " type="text" placeholder="For baseline measurements" />
        <div className="text-lg font-light my-2 mx-2 text-slate-900 ">Insurance Information</div>
        <input className="border-2 border-black rounded-lg text-slate-900 font-light mx-5 my-1 py-2 px-4 " type="text" placeholder="Insurance Provider" />
        <input className="border-2 border-black rounded-lg text-slate-900 font-light mx-5 my-1 py-2 px-4 " type="text" placeholder="Policy Number" />
        <div className="text-lg font-light my-2 mx-2 text-slate-900 ">Optional but useful Information</div>
        <input className="border-2 border-black rounded-lg text-slate-900 font-light mx-5 my-1 py-2 px-4 " type="text" placeholder="Occupation" />
        <input className="border-2 border-black rounded-lg text-slate-900 font-light mx-5 my-1 py-2 px-4 " type="text" placeholder="Marital Status" />
        <input className="border-2 border-black rounded-lg text-slate-900 font-light mx-5 my-1 py-2 px-4 " type="text" placeholder="Preferred Pharmacy" />
        <button onClick={handleOfflinePatientFormSubmit} className='text-slate-100 font-light my-2 py-2 px-2 border-2 w-fit self-center rounded-md border-slate-600 bg-slate-900'>Submit Form</button>
      </div>

      <div className='grid grid-cols-5'>
        {appointmentCardData.map((item) => (
          <div key={item._id} className='mx-5 my-5 flex flex-col text-center border-2 border-blue-900 py-2 px-4 rounded-xl h-fit '>
            <label className='' htmlFor="">{item.reasonOfAppointment}</label>
            <label htmlFor="review">{item.dateOfAppointment}</label>
            <label className='' htmlFor="description">{item.timeOfAppointment}</label>
            <label className='' htmlFor="description">{item.locationOfAppointment}</label>
            <button className={`border-2 border-black  rounded-full text-white py-1 px-2 m-1 ${item.appointmentStatus == "Booked" ? "bg-red-600" : "bg-slate-900"} `} disabled={item.appointmentStatus != "Booked"} onClick={()=>{handlePatientInfoToDoctor(item._id), setVeiwAppointmentDetails(true)}} >{item.appointmentStatus}</button>
            <button className={`border-2 border-black bg-slate-900 rounded-full text-white py-1 px-2 m-1 ${item.appointmentStatus == "Booked" ? "opacity-50" : ""} `} disabled={item.appointmentStatus === "Booked"} onClick={() => openModal(item)}>Edit appointment</button>
          </div>))}
      </div>

      {editAppointment && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
          <div className="bg-white p-6 rounded-lg shadow-lg max-w-lg w-full">
            <div className="flex justify-between items-center">
              <h2 className="text-xl font-semibold text-slate-900">Appointment Details</h2>
              <button className="text-red-500 text-lg" onClick={closeModal}>
                X
              </button>
            </div>
            <div className="mt-4 text-slate-900">
              <div className="mb-2"><strong>Doctor Name:</strong> {editAppointment.doctorName}</div>
              <div className="mb-2"><strong>Doctor Email:</strong> {editAppointment.doctorOtherInformation}</div>
              <div className="mb-2"><strong>Date for Appointment:</strong> {editAppointment.dateOfAppointment}</div>
              <div className="mb-2"><strong>Time for Appointment:</strong> {editAppointment.timeOfAppointment}</div>
              <div className="mb-2"><strong>Way To Talk to Doctor:</strong> {editAppointment.typeOfAppointment}</div>
              <div className="mb-2"><strong>Reason of Appointment:</strong> {editAppointment.reasonOfAppointment}</div>
              <div className="mb-2"><strong>Location Of Appointment:</strong> {editAppointment.locationOfAppointment}</div>
              <div className="mb-2"><strong>Duration for Appointment:</strong> {editAppointment.durationOfAppointment}</div>
            </div>
            <button className="mt-4 bg-blue-600 text-white py-2 px-4 rounded-lg" onClick={() => {handleDeleteAppointment(editAppointment._id), setEditAppointment(null)}}>Delete Appointment</button>

          </div>
        </div>
      )}
      {veiwAppointmentDetails && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
          <div className="bg-white p-6 rounded-lg shadow-lg max-w-lg w-full">
            <div className="flex justify-between items-center">
              <h2 className="text-xl font-semibold text-black">Appointment Details</h2>
              <button className="text-red-500 text-lg" onClick={()=>setVeiwAppointmentDetails(false)}>
                X
              </button>
            </div>
            <div className="mt-4 text-black">
              <div className="mb-2"><strong>Patient Name:</strong> {onlineAppointmentDetials.fullName}</div>
              <div className="mb-2"><strong>Patient Email:</strong> {onlineAppointmentDetials.email}</div>
              <div className="mb-2"><strong>Date of Birth:</strong> {onlineAppointmentDetials.dateOfBirth}</div>
              <div className="mb-2"><strong>Contact:</strong> {onlineAppointmentDetials.phone}</div>
              </div>
            <button className="mt-4 bg-blue-600 text-white py-2 px-4 rounded-lg" >NoWork Appointment</button>

          </div>
        </div>
      )}
      <div className='font-bold my-5 mx-10 '>Offline Appointment Entries </div>
      <div className="grid grid-cols-5  place-items-center">
        {OfflinePatientData.map((item) => (
          <div key={item._id} className="mx-5 my-5 flex flex-col text-center border-2 border-blue-900 py-2 px-4 rounded-xl h-fit items-center">
            <div className="text-sm capitalize">{item.patientType}</div>
            <img src="" alt="img" className="h-16 w-16 border-2 border-black rounded-full mt-2" />
            <div>{item.fullName}</div>
            <div>{item.contactNumber}</div>
            <div>{item.dob}</div>
            <button className={`bg-slate-900 text-white border-2 border-black rounded-full py-2 px-2 my-2 mx-2`} onClick={handlePatientHistoryPanel}>Check Patient</button>
            <div className={`bg-slate-700 absolute z-40 flex flex-col border-2 border-black rounded-lg ml-[400px] w-[450px] ${PatientHistoryPanel ? "" : "hidden"}`}>
            <div className="mb-2 mt-5"><strong>Patient Name:</strong> {item.fullName}</div>
              <div className="mb-2"><strong>Patient Email:</strong> {item.email}</div>
              <div className="mb-2"><strong>Gender:</strong> {item.gender}</div>
              <div className="mb-2"><strong>Date of Birth:</strong> {item.dob}</div>
              <div className="mb-2"><strong>Contact:</strong> {item.contactNumber}</div>
              <div className="mb-2"><strong>Address:</strong> {item.address}</div>
              <div className="mb-2"><strong>Emergency Contact Name:</strong> {item.emergencyContactName}</div>
              <div className="mb-2"><strong>Emergency Contact Phone:</strong> {item.emergencyContactNumber}</div>
              <div className='items-center'>
              <button className="bg-slate-900 text-white border-2 border-black rounded-full w-fit py-2 px-2 mx-2 my-4 hover:shadow-md hover:shadow-blue-500 duration-300 hover:-translate-y-1">Edit Details</button>
              <button className="bg-slate-900 text-white border-2 border-black rounded-full w-fit py-2 px-2 mx-2 my-4 hover:shadow-md hover:shadow-blue-500 duration-300 hover:-translate-y-1" onClick={handlePatientHistoryPanel}>Exit Details</button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

export default ManageAppoinment
