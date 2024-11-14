import axios from 'axios';
import { useEffect, useState } from 'react';
import Header from './HeaderForDashboardComponent'

const PrescriptionBillingHistory = () => {
    const [appointments, setAppointments] = useState([]);
    const [prescriptions, setPrescriptions] = useState([]);
    const [billings, setBillings] = useState([]);

    // Fetch data from the backend when the component mounts
    useEffect(() => {
        async function handleAllAppointmentInfo() {
            try {
                const resp1 = await axios.get("/api/user/patient/all-appointment-info");
                
                const appointmentArray = Object.values(resp1.data.msg)
                setAppointments(appointmentArray); // Assuming `msg` is where the data is stored
                
                console.log("All appointment info = ", appointmentArray);
                // console.log("lengt = ",appointments.length)
            } catch (error) {
                console.log("Error while getting data of appointment = ", error);
            }
        }

        async function handlePrescriptionInfo() {
            try {
                const resp2 = await axios.get("/api/user/patient/all-prescription-info");
                setPrescriptions(resp2.data.msg); // Assuming `msg` is where the data is stored
                console.log("All prescription info = ", resp2.data.msg);
            } catch (error) {
                console.log("Error while getting data of prescription = ", error);
            }
        }

        async function handleBillingInfo() {
            try {
                const resp3 = await axios.get("/api/user/patient/all-billing-info");
                setBillings(resp3.data.msg); // Assuming `msg` is where the data is stored
                console.log("All billing info = ", resp3.data.msg);
            } catch (error) {
                console.log("Error while getting data of billing = ", error);
            }
        }

        // Call the functions to fetch data
        handleAllAppointmentInfo();
        handlePrescriptionInfo();
        handleBillingInfo();
    }, []);

    // Find the associated prescription and billing data for each appointment
    const findRelatedData = (appointmentId, type) => {
        if (type === 'prescription') {
            // console.log("appointmentid = ",appointmentId, " pres appointmetn id = ",prescriptions.appointmentId)
            return prescriptions.find(prescription => prescription.appointmentId == appointmentId) || {};
        } else if (type === 'billing') {
            return billings.find(billing => billing.appointmentId === appointmentId) || {};
        }
        return {};
    };

    return (
        <div>
        <div>
            <Header/>
        </div>
        
        <div className="p-6">
            <h2 className="text-2xl font-bold mb-4">Prescription and Billing History</h2>

            {/* Iterate through appointments and display related data */}
            {appointments.length > 0 ? (
                appointments.map((appointment) => {
                    const relatedPrescription = findRelatedData(appointment._id, 'prescription');
                    const relatedBilling = findRelatedData(appointment._id, 'billing');

                    return (
                        <div key={appointment._id} className="border p-4 mb-6 rounded-lg shadow-sm">
                            {/* Appointment Information */}
                            <h3 className="text-xl font-semibold mb-2">Appointment Information</h3>
                            <p><strong>Date of Appointment:</strong> {appointment.dateOfAppointment}</p>
                            <p><strong>Time:</strong> {appointment.timeOfAppointment}</p>
                            <p><strong>Doctor Name:</strong> {appointment.doctorName}</p>   
                            <p><strong>Location:</strong> {appointment.locationOfAppointment}</p>
                            <p><strong>Reason:</strong> {appointment.reasonOfAppointment}</p>
                            <p><strong>Appointment Status:</strong> {appointment.appointmentStatus}</p>
                            <p><strong>Type of Appointment:</strong> {appointment.typeOfAppointment}</p>
                            <p><strong>Duration:</strong> {appointment.durationOfAppointment}</p>

                            {/* Prescription Information */}
                            {Object.keys(relatedPrescription).length > 0 ? (
                                <>
                                    <h3 className="text-xl font-semibold mt-4 mb-2">Prescription Information</h3>
                                    <p><strong>Diagnosis:</strong> {relatedPrescription.diagnosis}</p>
                                    <p><strong>Medication:</strong> {relatedPrescription.medication}</p>
                                    <p><strong>Instructions:</strong> {relatedPrescription.instructions}</p>
                                    <p><strong>Date:</strong> {new Date(relatedPrescription.createdAt).toLocaleDateString()}</p>
                                </>
                            ) : (
                                <p className="text-gray-500">No prescription information available for this appointment.</p>
                            )}

                            {/* Billing Information */}
                            {Object.keys(relatedBilling).length > 0 ? (
                                <>
                                    <h3 className="text-xl font-semibold mt-4 mb-2">Billing Information</h3>
                                    <p><strong>Service/Treatment:</strong> {relatedBilling.serviceorTreatment}</p>
                                    <p><strong>Cost of Service:</strong> {relatedBilling.costOfService}</p>
                                    <p><strong>Discount:</strong> {relatedBilling.discount}%</p>
                                    <p><strong>Total Amount:</strong> {relatedBilling.totalAmount}</p>
                                    <p><strong>Payment Method:</strong> {relatedBilling.paymentMethod}</p>
                                    <p><strong>Billing Notes:</strong> {relatedBilling.billingNotes}</p>
                                    <p><strong>Date:</strong> {new Date(relatedBilling.createdAt).toLocaleDateString()}</p>
                                </>
                            ) : (
                                <p className="text-gray-500">No billing information available for this appointment.</p>
                            )}
                        </div>
                    );
                })
            ) : (
                <p>No appointment information available.</p>
            )}
        </div>
        </div>
    );
};

export default PrescriptionBillingHistory;
    