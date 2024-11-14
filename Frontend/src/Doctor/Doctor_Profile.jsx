import { useEffect, useState } from "react";
import axios from "axios";
import HeaderForDashboardComponent from "./Dashboard/HeaderForDashboardComponent"


const DoctorProfile = () => {
  const [doctorData, setDoctorData] = useState(null);

  useEffect(() => {
    async function handleDoctorAllProfileData() {
      try {
        const resp = await axios.get("/api/user/doctor/all-profile-data");
        setDoctorData(resp.data.ProfileData);
        console.log(resp.data.ProfileData);
      } catch (error) {
        console.log("Error while getting doctor profile data ", error);
      }
    }
    handleDoctorAllProfileData();
  }, []);

  if (!doctorData) {
    return <div className="text-center text-lg">Loading...</div>;
  }

  return (
    <div>
      <HeaderForDashboardComponent />

    <div className="max-w-4xl mx-auto p-6 bg-gray-100 rounded-lg shadow-md">
      <h2 className="text-2xl font-semibold text-center mb-6">Doctor Profile</h2>

      {/* Personal Information */}
      <div className="mb-6 p-4 bg-white rounded-lg shadow">
        <h3 className="text-xl font-medium mb-4">Personal Information</h3>
        <p className="text-gray-700"><strong>Name:</strong> {doctorData.fullName}</p>
        <p className="text-gray-700"><strong>Gender:</strong> {doctorData.gender}</p>
        <p className="text-gray-700"><strong>Date Of Birth:</strong> {doctorData.dateOfBirth}</p>
        <p className="text-gray-700"><strong>Contact:</strong> {doctorData.phone}</p>
      </div>

      {/* Contact Information */}
      <div className="mb-6 p-4 bg-white rounded-lg shadow">
        <h3 className="text-xl font-medium mb-4">Contact Information</h3>
        <p className="text-gray-700"><strong>Email:</strong> {doctorData.email}</p>
        <p className="text-gray-700"><strong>Phone:</strong> {doctorData.phone}</p>
        <p className="text-gray-700"><strong>Address:</strong></p>
      </div>

      {/* Professional Information */}
      <div className="mb-6 p-4 bg-white rounded-lg shadow">
        <h3 className="text-xl font-medium mb-4">Professional Information</h3>
        <p className="text-gray-700"><strong>Medical License Number:</strong> {doctorData.medicalLicenseNumber}</p>
        <p className="text-gray-700"><strong>Medical School:</strong> {doctorData.medicalSchool}</p>
        <p className="text-gray-700"><strong>Hospital Affiliation:</strong> {doctorData.hospitalOrClinic}</p>
      </div>

      {/* Emergency Contact */}
      <div className="mb-6 p-4 bg-white rounded-lg shadow">
        <h3 className="text-xl font-medium mb-4">Other Professsional Information</h3>
        <p className="text-gray-700"><strong>Specialization:</strong> {doctorData.specialization}</p>
        <p className="text-gray-700"><strong>Experience:</strong> {doctorData.yearsOfExperience} years</p>
      </div>
      {/* <div className="mb-6 p-4 bg-white rounded-lg shadow">
        <h3 className="text-xl font-medium mb-4">Emergency Contact</h3>
        <p className="text-gray-700"><strong>Name:</strong> {doctorData.emergencyContact.name}</p>
        <p className="text-gray-700"><strong>Phone:</strong> {doctorData.emergencyContact.phone}</p>
        <p className="text-gray-700"><strong>Relation:</strong> {doctorData.emergencyContact.relation}</p>
      </div> */}
    </div>
    </div>
  );
};

export default DoctorProfile;
