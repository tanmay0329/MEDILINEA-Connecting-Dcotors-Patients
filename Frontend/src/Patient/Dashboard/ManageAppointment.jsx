// import React from 'react'
import { useEffect, useState } from 'react'
import Header from './HeaderForDashboardComponent'
import axios from 'axios'
const ManageAppointment = () => {
  const [appointmentData, setAppointmentData] = useState([]);
  const [allAppointmentData, setAllAppointmentData] = useState(false);
  const [openViewPrescription, setOpenViewPrescription] = useState(false);
  const [singlePrescriptionData, setSinglePrescriptionData] = useState("");



  useEffect(() => {
    const handleGetAllApointment = async () => {
      try {
        const response = await axios.get("/api/user/patient/all-patient-appointment");
        console.log("Response for patient appointment = ", response.data.allAppointments);
        console.log("Response Lenght = ", response.data.allAppointments.length)
        console.log("Response Corrected = ", response.data.allAppointments[0])
        // Filter out appointments where the status is 'Unbooked'
        let filteredAppointments = []; // Initialize as an array to store all filtered results
        const appointmentsArray = Object.values(response.data.allAppointments);

        // Filter the array based on appointment status
        filteredAppointments = appointmentsArray.filter(appointment => appointment.appointmentStatus != 'Unbooked');

        console.log("Filtered result:", filteredAppointments);

        setAppointmentData(filteredAppointments);
      } catch (error) {
        console.log("Error while getting all appointment = ", error);
      }
    }
    handleGetAllApointment();
  }, []);

  function opneModel(item) {
    console.log("Model opned")
    setAllAppointmentData(item)
  }
  function closeModel() {
    console.log("close Model")
    setAllAppointmentData(null)
  }

  const handleGetAllPrescription = async (appointmentId) => {
    console.log("Appointment id = ", appointmentId)
    try {

      const response = await axios.get(`/api/user/doctor/show-prescription${appointmentId}`)
      console.log("Response of singl prescription = ", response.data.singlePrescription);

      if (response.data.singlePrescription.length != 0) {
        setSinglePrescriptionData(response.data.singlePrescription[0])
        console.log(response.data.singlePrescription[0])
      } else {
        // console.log("Udefind occure.??????????????????????/")
        setSinglePrescriptionData({
          medication: "No Data Available",
          instructions: "No Data Available",
          diagnosis: "No Data Available",
          createdAt: "No Data Available"
        })
      }

    } catch (error) {
      console.log("Error while getting all presc data = ", error);
    }
  }

  return (
    <div>
      <Header />
      <div>
        <div className='grid grid-cols-5 bg-slate-800 text-white min-h-screen'>
          {appointmentData ? (
            <>
              {appointmentData.map((item) => (
                <div key={item._id} className='mx-5 my-5 flex flex-col text-center border-2 border-blue-900 py-2  bg-[#081724] rounded-xl h-fit p hover:border-blue-600 hover:shadow-md hover:shadow-blue-600 duration-300 hover:-translate-y-1 delay-75'>
                  <label className='text-lg font-bold' htmlFor="">{item.reasonOfAppointment}</label>
                  <label className='text-lg font-bold' htmlFor="review">{item.dateOfAppointment}</label>
                  <label className='text-lg font-bold' htmlFor="description">{item.timeOfAppointment}</label>
                  <label className='text-lg font-bold' htmlFor="description">{item.locationOfAppointment}</label>
                  <button className={`border-2 border-black  rounded-full text-white py-2 px-4 m-4 w-fit self-center bg-[#103353] hover:shadow-md hover:shadow-blue-600 duration-300 hover:-translate-y-1 hover:border-blue-100`} onClick={() => { opneModel(item) }}>Check Details</button>
                </div>))}
            </>
          ) : (
            <>
              <div>No Information is Available</div>
            </>
          )}


          {allAppointmentData && (
            <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50 text-black">
              <div className="bg-white p-6 rounded-lg shadow-lg max-w-lg w-full">
                <div className="flex justify-between items-center">
                  <h2 className="text-xl font-semibold">Appointment Details</h2>
                </div>
                <div className="mt-4">
                  <div className="mb-2"><strong>Doctor Name:</strong> {allAppointmentData.doctorName}</div>
                  <div className="mb-2"><strong>Doctor Email:</strong> {allAppointmentData.doctorOtherInformation}</div>
                  <div className="mb-2"><strong>Date for Appointment:</strong> {allAppointmentData.dateOfAppointment}</div>
                  <div className="mb-2"><strong>Time for Appointment:</strong> {allAppointmentData.timeOfAppointment}</div>
                  <div className="mb-2"><strong>Way To Talk to Doctor:</strong> {allAppointmentData.typeOfAppointment}</div>
                  <div className="mb-2"><strong>Reason of Appointment:</strong> {allAppointmentData.reasonOfAppointment}</div>
                  <div className="mb-2"><strong>Location Of Appointment:</strong> {allAppointmentData.locationOfAppointment}</div>
                  <div className="mb-2"><strong>Duration for Appointment:</strong> {allAppointmentData.durationOfAppointment}</div>
                </div>
                <button className="mt-4 bg-blue-600 text-white py-2 px-4 rounded-lg mx-2 hover:shadow-md hover:shadow-black duration-200 hover:-translate-y-1" onClick={() => closeModel(null)}>Close Details</button>
                <button className="mt-4 bg-blue-600 text-white py-2 px-4 rounded-lg mx-2 hover:shadow-md hover:shadow-black duration-200 hover:-translate-y-1" onClick={() => { setOpenViewPrescription(true), handleGetAllPrescription(allAppointmentData._id) }}>View Prescripton</button>

              </div>
            </div>
          )}
          {openViewPrescription && (
            <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
              <div className="bg-white p-6 rounded-lg shadow-lg max-w-lg w-full">
                <div className="flex justify-between items-center">
                  <h2 className="text-xl font-semibold text-black">View Prescription</h2>
                  <button className="text-red-500 text-lg" onClick={() => setOpenViewPrescription(false)}>
                    X
                  </button>
                </div>
                <div className="mt-4 text-black flex flex-col">

                  <div className="mb-2"><strong>Medication:</strong> {singlePrescriptionData.medication}</div>
                  <div className="mb-2"><strong>Instruction:</strong> {singlePrescriptionData.instructions}</div>
                  <div className="mb-2"><strong>Diagnosis:</strong> {singlePrescriptionData.diagnosis}</div>
                  <div className="mb-2"><strong>Creation Date:</strong> {singlePrescriptionData.createdAt}</div>
                </div>
                {/* <button className="mt-4 bg-blue-600 text-white py-2 px-4 rounded-lg" onClick={()=>{handlePrescriptionDataSubmit(patientDataForPrescription.patientIdOfLogCred, patientDataForPrescription.appointmentId)}}>Submit Prescription</button> */}

              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

export default ManageAppointment
