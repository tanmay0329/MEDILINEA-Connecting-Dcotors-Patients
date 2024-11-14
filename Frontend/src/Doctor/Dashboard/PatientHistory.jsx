import { useEffect, useState } from 'react';
import Header from './HeaderForDashboardComponent';
import axios from 'axios';
// import jsPDF from 'jspdf';
// import html2canvas from 'html2canvas';

const PatientHistory = () => {
  const [patientDataForOnlinePatient, setPatientDataForOnlinePatient] = useState([]);
  const [appointmentDataForOnlinePatient, setAppointmentDataForOnlinePatient] = useState([]);
  const [prescriptionDataForOnlinePatient, setPrescriptionDataForOnlinePatient] = useState([]);
  const [billingDataForOnlinePatient, setBillingDataForOnlinePatient] = useState([]); // New state for billing data

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
                              
                          </div>
                      );
                  })
              ) : (
                  <p>No online appointments found.</p>
              )}
              
          </div>
      </div>
  );
}

export default PatientHistory
