import { useEffect, useState } from "react";
import { io } from "socket.io-client";
import axios from "axios";
import { Link } from "react-router-dom";
import bgOne from "../assets/upscale4.jpeg";
// import { io } from "socket.io-client";


const MyComponent = () => {
    const [appointmentData, setAppointmentData] = useState([]);
    const [socketMsg, setSocketMsg] = useState("");
    const [selectedAppointment, setSelectedAppointment] = useState(null);
    const [appointmentPostResp, setAppointmentPostResp] = useState("")
    const [loadAppointmentBook, setLoadAppointmentBook] = useState(false);

    const [bookStateMessage, setBookStateMessage] = useState("Book An Appointment")

    useEffect(() => {
        async function handleCardAppointmentData() {
            try {
                const resp = await axios.get("/api/user/all-appointment-data");
                const UnbookedAppointmentCard = resp.data.result.filter(appointment => appointment.appointmentStatus != 'Booked');

                setAppointmentData(UnbookedAppointmentCard);
                console.log(resp.data.result);
            } catch (err) {
                console.log("Error = ", err);
            }
        }

        const socket = io("http://localhost:8000");

        socket.on("connect", () => {
            console.log("Socket is connected");
        });

        socket.on("message", (message) => {
            setSocketMsg(message);
        });

        handleCardAppointmentData();

        return () => {
            socket.disconnect();
        };
    }, [socketMsg]);

    async function handleBookingOfAppointment(appointmentId, doctorId) {
        const msg = `Appointment Booked In Common Area`
        const socket = io("http://localhost:8000");

        socket.emit('common-area-message', msg);
        // console.log("Message Sent");

        // console.log("appointment web-socket has sent")
        try {
            const resp = await axios.post("/api/user/commonArea/book-appointment", {
                appointmentId,
                doctorId,
            });
            console.log("Hello = ", resp);
            if (resp.data.msg == "Booked") {
                setLoadAppointmentBook(false)
                setAppointmentPostResp("Booked");

            }
        } catch (error) {
            console.log("Error occured while send appointment id = ", error);
        }
    }

    const openModal = (appointment) => {
        setSelectedAppointment(appointment);
    };

    const closeModal = () => {
        setSelectedAppointment(null);
    };



    return (
        <div>
            <div className="flex justify-between py-4 px-2 bg-slate-700 text-white">
                <div className="flex">
                    <div className="py-2 px-4 mx-1 my-2 border-slate-600 border-2 rounded-lg font-raleway">Medlinea</div>
                    <input type="text" placeholder="Search appointments" className="py-2 px-2 mx-1 my-2 border-slate-600 border-2 rounded-lg" />
                </div>
                <div className="flex text-black">
                    <Link to="/user/patient/profile"><button className="border-2 mx-1 border-[#0b1d2e] px-4 py-2 rounded-lg bg-[#EDE9E3] hover:-translate-y-1 shadow-[0px_0px_0px_1px_#206ef6] hover:shadow-[0px_0px_5px_2px_#206ef6] duration-300" >Profile</button></Link>
                    <Link to="/user/patient/dashboard"><button className="border-2 mx-1 border-[#0b1d2e] px-4 py-2 rounded-lg bg-[#EDE9E3] hover:-translate-y-1 shadow-[0px_0px_0px_1px_#206ef6] hover:shadow-[0px_0px_5px_2px_#206ef6] duration-300" >Dashboard</button></Link>
                </div>
            </div>
            <div className="flex flex-col justify-center items-center z-0 h-screen bg-slate-900">
                <h1 className="font-light text-2xl mx-10 mt-20 mb-10 text-slate-200">Appointments</h1>
                <div className="grid grid-cols-4 gap-7">
                    {appointmentData.map((item) => (
                        <div key={item._id} className='w-fit flex flex-col text-center border-2 border-blue-900 py-2 px-4 rounded-xl bg-white bg-opacity-80 shadow-md'>
                            <label htmlFor="appointment status">{item.appointmentStatus}</label>
                            <img src="no" alt="img" className='bg-slate-700 rounded-full w-16 h-16 self-center mb-2' />
                            <label htmlFor="Doctor name" className="font-semibold">{item.doctorName}</label>
                            <label htmlFor="review">{item.timeOfAppointment}</label>
                            <label htmlFor="description">{item.dateOfAppointment}</label>
                            <label htmlFor="description">{item.locationOfAppointment}</label>
                            <button className={`border-2 border-black bg-slate-900 rounded-full text-white py-1 px-2 mt-2 ${item.appointmentStatus == "Booked" ? "opacity-50" : ""}`} onClick={() => openModal(item)} disabled={item.appointmentStatus === "Booked"} >
                                {bookStateMessage}</button>
                        </div>
                    ))}
                </div>
            </div>

            {selectedAppointment && (
                <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
                    <div className="bg-white p-6 rounded-lg shadow-lg max-w-lg w-full">
                        <div className="flex justify-between items-center">
                            <h2 className="text-xl font-semibold">Appointment Details</h2>
                            <button className="text-red-500 text-lg" onClick={closeModal}>
                                X
                            </button>
                        </div>
                        <div className="mt-4">
                            <div className="mb-2"><strong>Doctor Name:</strong> {selectedAppointment.doctorName}</div>
                            <div className="mb-2"><strong>Doctor Email:</strong> {selectedAppointment.doctorOtherInformation}</div>
                            <div className="mb-2"><strong>Date for Appointment:</strong> {selectedAppointment.dateOfAppointment}</div>
                            <div className="mb-2"><strong>Time for Appointment:</strong> {selectedAppointment.timeOfAppointment}</div>
                            <div className="mb-2"><strong>Way To Talk to Doctor:</strong> {selectedAppointment.typeOfAppointment}</div>
                            <div className="mb-2"><strong>Reason of Appointment:</strong> {selectedAppointment.reasonOfAppointment}</div>
                            <div className="mb-2"><strong>Location Of Appointment:</strong> {selectedAppointment.locationOfAppointment}</div>
                            <div className="mb-2"><strong>Duration for Appointment:</strong> {selectedAppointment.durationOfAppointment}</div>
                        </div>
                        <button
                            className={`mt-4 bg-blue-600 text-white py-2 px-4 rounded-lg ${loadAppointmentBook ? "animate-spin" : "animate-none"} ${appointmentPostResp === "Booked" ? "bg-green-500" : ""} `}
                            onClick={() => {
                                handleBookingOfAppointment(selectedAppointment._id, selectedAppointment.doctorId);
                                setLoadAppointmentBook(true);
                            }}
                            disabled={appointmentPostResp === "Booked"}
                        >
                            {
                                appointmentPostResp === "Booked"
                                    ? "Booking Done"
                                    : loadAppointmentBook
                                        ? "/"
                                        : "Book Your Appointment"
                            }
                        </button>

                    </div>
                </div>
            )}
        </div>
    );
};

export default MyComponent;
