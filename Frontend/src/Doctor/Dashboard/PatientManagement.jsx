import { useEffect, useState } from 'react';
import axios from "axios";
import HeaderForDashboardComponent from "./HeaderForDashboardComponent";

const PatientManagement = () => {
    const [OfflinePatientData, setOfflinePatientData] = useState([]);
    const [onlinePatientData, setOnlinePatientData] = useState([]);
    const [selectedOfflinePatient, setSelectedOfflinePatient] = useState(null); // To track the selected offline patient
    const [selectedOnlinePatient, setSelectedOnlinePatient] = useState(null); // To track the selected online patient
    const [allAppointmentInfo, setAllAppointmentInfo] = useState("");

    useEffect(() => {
        const handleOfflinePatientCardInfo = async () =>    {
            try {
                const resp = await axios.get("/api/user/patient-show/");
                setOfflinePatientData(resp.data.data);
            } catch (err) {
                console.log(err);
            }
        };
        const handleOnlinePatientCardInfo = async () => {
            try {
                const response = await axios.get("/api/user/doctor/online-booking-show");
                console.log("Online Patient Data = ", response.data.msg);
                setOnlinePatientData(response.data.msg);
            } catch (error) {
                console.log("Error while getting online patients: ", error);
            }
        };
        const handleAppoinmentInfo = async () => {
            try {
                const response = await axios.get("/api/user/doctor/online-booking-info-show");
                console.log("All appointment =  ", response.data.appointmentData);
                setAllAppointmentInfo(response.data.appointmentData);
            } catch (error) {
                console.log("Error while getting online appointment info: ", error);
            }
        };

        handleOfflinePatientCardInfo();
        handleOnlinePatientCardInfo();
        handleAppoinmentInfo();
    }, []);

    const toggleOfflinePatientDetails = (patientId) => {
        setSelectedOfflinePatient(selectedOfflinePatient === patientId ? null : patientId);
    };

    const toggleOnlinePatientDetails = (patientId) => {
        setSelectedOnlinePatient(selectedOnlinePatient === patientId ? null : patientId);
    };

    return (
        <div className="bg-slate-800 text-white">
            <HeaderForDashboardComponent />
            <div>Patient History</div>
            <div className="grid grid-cols-4 gap-4 mx-10 place-items-center">
                {/* Offline Patients */}
                {OfflinePatientData.map((item) => (
                    <div key={item.appointmentId} className="flex flex-col border-2 border-[#4292dc] rounded-lg w-fit items-center py-0 px-4 my-5 duration-300 hover:shadow-md hover:shadow-[#4292dc] hover:-translate-y-1">
                        <div className="text-sm capitalize">{item.patientType}</div>
                        <img src="" alt="img" className="h-16 w-16 border-2 border-[#2370b8] rounded-full mt-2" />
                        <div className="mb-2"><strong>Patient Name:</strong> {item.fullName}</div>
                        <div className="mb-2"><strong>Patient Contact:</strong> {item.contactNumber}</div>
                        <div className="mb-2"><strong>DOB:</strong> {item.dob}</div>

                        <button className="bg-slate-800 text-white border-2 border-[#1f6eb8] rounded-full my-5 py-2 px-4 duration-300 hover:shadow-md hover:shadow-[#4292dc] hover:-translate-y-1" onClick={() => toggleOfflinePatientDetails(item._id)}>
                            Check Patient
                        </button>
                        {selectedOfflinePatient === item._id && (
                            <div className={`bg-slate-700 absolute z-40 flex flex-col border-2 border-black rounded-lg ml-[400px] w-[450px]`}>
                                <div className="mb-2"><strong>Patient Name:</strong> {item.fullName}</div>
                                <div className="mb-2"><strong>Patient Email:</strong> {item.email}</div>
                                <div className="mb-2"><strong>Gender:</strong> {item.gender}</div>
                                <div className="mb-2"><strong>Date of Birth:</strong> {item.dob}</div>
                                <div className="mb-2"><strong>Contact:</strong> {item.contactNumber}</div>
                                <div className="mb-2"><strong>Address:</strong> {item.address}</div>
                                <div className="mb-2"><strong>Emergency Contact Name:</strong> {item.emergencyContactName}</div>
                                <div className="mb-2"><strong>Emergency Contact Phone:</strong> {item.emergencyContactNumber}</div>
                                <button className="bg-slate-800 text-white border-2 border-black rounded-full w-fit" onClick={() => toggleOfflinePatientDetails(item._id)}>Exit Details</button>
                            </div>
                        )}
                    </div>
                ))}

                {/* Online Patients */}
                {onlinePatientData.map((item) => (
                    <div key={item._id} className="flex flex-col border-2 border-[#4292dc] rounded-lg w-fit items-center py-0 px-4 my-5 duration-300 hover:shadow-md hover:shadow-[#4292dc] hover:-translate-y-1">
                        <div className="text-sm">{item.patientType}</div>
                        <img src="" alt="img" className="h-16 w-16 border-2 border-[#2370b8] rounded-full mt-2" />

                        <div className="mb-2"><strong>Full Name:</strong> {item.fullName}</div>
                        <div className="mb-2"><strong>Contact:</strong> {item.phone}</div>
                        <div className="mb-2"><strong>DOB:</strong> {item.dateOfBirth}</div>
                        <div className="mb-2"><strong>Appointment Time:</strong> {allAppointmentInfo.find(appointment => appointment._id === item.appointmentId)?.timeOfAppointment}</div>
                        <div className="mb-2"><strong>Appointment Date:</strong> {allAppointmentInfo.find(appointment => appointment._id === item.appointmentId)?.dateOfAppointment}</div>
                        <button className="bg-slate-800 text-white border-2 border-[#1f6eb8] rounded-full my-5 py-2 px-4 duration-300 hover:shadow-md hover:shadow-[#4292dc] hover:-translate-y-1" onClick={() => toggleOnlinePatientDetails(item.appointmentId)}>
                            Check Patient
                        </button>
                        {selectedOnlinePatient === item.appointmentId && (
                            <div className="bg-slate-800 absolute z-40 flex flex-col border-2 border-[black] rounded-lg ml-[400px] w-[450px]">
                                <button className='ml-[90%] text-red-600 text-xl mt-1' onClick={() => toggleOnlinePatientDetails(item._id)}>X</button>
                                <div className='py-2 px-2 mx-10 mb-5'>
                                    <div className='my-1'>Full Name: {item.fullName}</div>
                                    <div className='my-1'>Date of Birth: {item.dateOfBirth}</div>
                                    <div className='my-1'>Contact: {item.phone}</div>
                                    <div className='my-1'>Emergency Name: {item.emergenecyContactName}</div>
                                    <div className='my-1'>Emergency Contact: {item.emergencyContactPhone}</div>
                                </div>
                            </div>
                        )}
                    </div>
                ))}
            </div>
        </div>
    );
};

export default PatientManagement;
