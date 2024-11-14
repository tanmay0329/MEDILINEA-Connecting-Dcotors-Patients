import { useEffect, useState } from 'react';
import Header from './HeaderForDashboardComponent';
import axios from 'axios';
import jsPDF from 'jspdf';
import html2canvas from 'html2canvas';

const DoctorBilling = () => {
    const [patientDataForOnlinePatient, setPatientDataForOnlinePatient] = useState([]);
    const [appointmentDataForOnlinePatient, setAppointmentDataForOnlinePatient] = useState([]);
    const [prescriptionDataForOnlinePatient, setPrescriptionDataForOnlinePatient] = useState([]);
    const [billingDataForOnlinePatient, setBillingDataForOnlinePatient] = useState([]); // New state for billing data

    const [change, setChange] = useState(false);

    // form useStates
    const [serviceorTreatment, setService] = useState("");
    const [durationOfService, setDurationOfService] = useState("");
    const [costOfService, setCostOfService] = useState("");
    const [discount, setDiscount] = useState("");
    const [totalAmount, setTotalAmount] = useState("");
    const [paymentMethod, setPaymentMethod] = useState("");
    const [billingNotes, setBillingNotes] = useState("");

    const [patientDataForPrescription, setPatientDataForPrescriptioin] = useState(null);

    const openNewPrescriptionForm = (patientData) => {
        setPatientDataForPrescriptioin(patientData);
    };
    
    const closeNewPrescriptionForm = () => {
        setPatientDataForPrescriptioin(null);
    };

    useEffect(() => {
        async function handlePatientDataForOnlinePatient() {
            try {
                const resp1 = await axios.get('/api/user/doctor/billing/online-patient-data');
                setPatientDataForOnlinePatient(resp1.data.msg);
            } catch (error) {
                console.log('Error occurred while getting all patient data = ', error);
            }
        }

        async function handleAppointmentDataForOnlinePatient() {
            try {
                const resp2 = await axios.get('/api/user/doctor/billing/online-appointment-data');
                setAppointmentDataForOnlinePatient(resp2.data.msg);
            } catch (error) {
                console.log('Error occurred while getting all appointment data = ', error);
            }
        }

        async function handlePrescriptionDataForOnlinePatient() {
            try {
                const resp3 = await axios.get('/api/user/doctor/billing/online-prescription-data');
                setPrescriptionDataForOnlinePatient(resp3.data.msg);
            } catch (error) {
                console.log('Error occurred while getting all prescription data = ', error);
            }
        }

        async function handleInitialBillingDataForOnlinePatient() {
            try {
                const resp4 = await axios.get('/api/user/doctor/billing/initial-billing/get-info');

                setBillingDataForOnlinePatient(resp4.data.msg); // Set billing data here
            } catch (error) {
                console.log('Error occurred while getting all complete billing data = ', error);
            }
        }

        handleInitialBillingDataForOnlinePatient();
        handlePatientDataForOnlinePatient();
        handleAppointmentDataForOnlinePatient();
        handlePrescriptionDataForOnlinePatient();
    }, []);

    const getPatientDetails = (appointmentId) => {
        const patient = patientDataForOnlinePatient.find(p => p.appointmentId === appointmentId);
        const appointment = appointmentDataForOnlinePatient.find(a => a._id === appointmentId);
        const prescription = prescriptionDataForOnlinePatient.find(p => p.appointmentId === appointmentId);
        const billing = billingDataForOnlinePatient.find(b => b.appointmentId === appointmentId); // Find billing data

        return {
            patient,
            appointment,
            prescription,
            billing // Include billing data in the return object
        };
    };

    async function handleInitialBillingOnlinePatient(allinfo) {
        const patientId = allinfo.patient.patientIdOfLogCred;
        const appointmentId = allinfo.patient.appointmentId;
        const doctorId = allinfo.appointment.doctorId;

        const billingData = {
            patientId,
            doctorId,
            appointmentId,
            serviceorTreatment,
            durationOfService,
            costOfService,
            discount,
            totalAmount,
            paymentMethod,
            billingNotes,
        };

        try {
            const resp = await axios.post("/api/user/doctor/billing/inital-billing", billingData);
            console.log('Billing submitted successfully', resp.data);
        } catch (error) {
            console.log("Error while submitting billing data", error);
        }
    }

    const handleGeneratePDF = (billingData) => {
        const input = document.getElementById('billing-details');
        html2canvas(input).then((canvas) => {
            const imgData = canvas.toDataURL('image/png');
            const pdf = new jsPDF();
            pdf.addImage(imgData, 'PNG', 0, 0);
            pdf.save("billing-info.pdf");
        });
    };

    const handleSendBillingInfo = async (billingData) => {
        try {
            console.log('Billing info sent successfully = ', billingData);
        } catch (error) {
            console.log('Error sending billing info:', error);
        }
    };

    return (
        <div>
            <Header />
            <div className="p-6">
                <h2 className="text-2xl font-bold mb-4">Billing Information for Online Patients</h2>

                {appointmentDataForOnlinePatient.length > 0 ? (
                    appointmentDataForOnlinePatient.map((appointment) => {
                        const { patient, prescription, billing } = getPatientDetails(appointment._id); // Get billing data along with others
                        const billingData = { appointment, patient, prescription, billing };

                        return (
                            <div key={appointment._id} className="border p-4 mb-6 rounded-lg shadow-sm">
                                <div id="billing-details">
                                    {/* Appointment Information */}
                                    <h3 className="text-xl font-semibold mb-2">Appointment Details</h3>
                                    <p><strong>Date of Appointment:</strong> {appointment.dateOfAppointment}</p>
                                    <p><strong>Doctor Name:</strong> {appointment.doctorName}</p>
                                    <p><strong>Location:</strong> {appointment.locationOfAppointment}</p>
                                    <p><strong>Reason:</strong> {appointment.reasonOfAppointment}</p>

                                    {/* Patient Information */}
                                    {patient ? (
                                        <div className="mt-4">
                                            <h3 className="text-xl font-semibold mb-2">Patient Information</h3>
                                            <p><strong>Full Name:</strong> {patient.fullName}</p>
                                            <p><strong>Email:</strong> {patient.email}</p>
                                            <p><strong>Phone:</strong> {patient.phone}</p>
                                            <p><strong>Adhar Number:</strong> {patient.adharNumber}</p>
                                        </div>
                                    ) : (
                                        <p className="mt-4 text-red-500">Patient information not available for this appointment.</p>
                                    )}

                                    {/* Prescription Information */}
                                    {prescription ? (
                                        <div className="mt-4">
                                            <h3 className="text-xl font-semibold mb-2">Prescription</h3>
                                            <p><strong>Diagnosis:</strong> {prescription.diagnosis}</p>
                                            <p><strong>Medication:</strong> {prescription.medication}</p>
                                            <p><strong>Instructions:</strong> {prescription.instructions}</p>
                                        </div>
                                    ) : (
                                        <p className="mt-4 text-red-500">Prescription not available for this appointment.</p>
                                    )}

                                    {/* Billing Information */}
                                    {billing ? (
                                        <div className="mt-4">
                                            <h3 className="text-xl font-semibold mb-2">Billing Information</h3>
                                            <p><strong>Service/Treatment:</strong> {billing.serviceorTreatment}</p>
                                            <p><strong>Duration:</strong> {billing.durationOfService}</p>
                                            <p><strong>Cost:</strong> {billing.costOfService}</p>
                                            <p><strong>Discount:</strong> {billing.discount}</p>
                                            <p><strong>Total Amount:</strong> {billing.totalAmount}</p>
                                            <p><strong>Payment Method:</strong> {billing.paymentMethod}</p>
                                        </div>
                                    ) : (
                                        <p className="mt-4 text-red-500">Billing information not available for this appointment.</p>
                                    )}
                                </div>

                                {/* Action Buttons */}
                                <div className="mt-4 flex space-x-4">
                                    <button
                                        onClick={() => { handleGeneratePDF(billingData), handleSendBillingInfo(billingData) }}
                                        className="bg-blue-500 text-white py-2 px-4 rounded"
                                    >
                                        Download as PDF
                                    </button>
                                    <button
                                        onClick={() => { openNewPrescriptionForm(billingData) }}
                                        className={`bg-green-500 text-white py-2 px-4 rounded  ${billingData.billing ? "bg-green-200" : ""}`}
                                        disabled={billingData.billing}
                                    >
                                        Send Billing Info
                                    </button>
                                </div>
                            </div>
                        );
                    })
                ) : (
                    <p>No online appointments found.</p>
                )}
                {patientDataForPrescription && (
                    <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
                        <div className="bg-white p-6 rounded-lg shadow-lg max-w-lg w-full">
                            <div className="flex justify-between items-center">
                                <h2 className="text-xl font-semibold">Appointment Details</h2>
                                <button className="text-red-500 text-lg" onClick={() => closeNewPrescriptionForm()}>
                                    X
                                </button>
                            </div>
                            <div className="mt-4 text-black flex flex-col">
                                <input type="text" placeholder='Service' className='border-2 border-black py-2 px-2 my-1 rounded-lg' value={serviceorTreatment} onChange={(e) => setService(e.target.value)} />
                                <input type="text" placeholder='Duration Of Service' className='border-2 border-black py-2 px-2 my-1 rounded-lg' value={durationOfService} onChange={(e) => setDurationOfService(e.target.value)} />
                                <input type="text" placeholder='Cost Of Service' className='border-2 border-black py-2 px-2 my-1 rounded-lg' value={costOfService} onChange={(e) => setCostOfService(e.target.value)} />
                                <input type="text" placeholder='Discount' className='border-2 border-black py-2 px-2 my-1 rounded-lg' value={discount} onChange={(e) => setDiscount(e.target.value)} />
                                <input type="text" placeholder='Total Amount' className='border-2 border-black py-2 px-2 my-1 rounded-lg' value={totalAmount} onChange={(e) => setTotalAmount(e.target.value)} />
                                <input type="text" placeholder='Payment Method' className='border-2 border-black py-2 px-2 my-1 rounded-lg' value={paymentMethod} onChange={(e) => setPaymentMethod(e.target.value)} />
                                <textarea rows={4} type="text" placeholder='Billing Notes or Comments' className='border-2 border-black py-2 px-2 my-1 rounded-lg ' value={billingNotes} onChange={(e) => setBillingNotes(e.target.value)} />
                            </div>
                            <button className="mt-4 bg-blue-600 text-white py-2 px-4 rounded-lg" onClick={() => {handleInitialBillingOnlinePatient(patientDataForPrescription), setChange(!change)}}>Submit Prescription</button>

                        </div>
                    </div>
                )}
            </div>
        </div>
    );
};

export default DoctorBilling;
