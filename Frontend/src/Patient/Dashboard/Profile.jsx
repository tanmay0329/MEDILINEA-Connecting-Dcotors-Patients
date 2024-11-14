import { useEffect, useState } from 'react';
import axios from 'axios';
import Header from './HeaderForDashboardComponent'


const Profile = () => {
  const [profileData, setProfileData] = useState(null);

  useEffect(() => {
    async function handlePatientProfileInfo() {
      try {
        const resp = await axios.get('/api/user/patient/all-profile-data');
        setProfileData(resp.data.PatientData);
        console.log(resp.data.PatientData)
      } catch (error) {
        console.log('Error while getting all patient profile data = ', error);
      }
    }
    handlePatientProfileInfo();
  }, []);

  if (!profileData) {
    return <div className="text-center text-lg">Loading...</div>;
  }

  return (
    <div>
      <Header />
    <div className="max-w-4xl mx-auto p-6 bg-gray-100 rounded-lg shadow-md">
      
      <h2 className="text-2xl font-semibold text-center mb-6">Patient Profile</h2>

      {/* Personal Information */}
      <div className="mb-6 p-4 bg-white rounded-lg shadow">
        <h3 className="text-xl font-medium mb-4">Personal Information</h3>
        <p className="text-gray-700"><strong>Name:</strong> {profileData.fullName}</p>
        <p className="text-gray-700"><strong>Date of Birth:</strong> {profileData.dateOfBirth}</p>
        <p className="text-gray-700"><strong>Gender:</strong> {profileData.gender}</p>
        <p className="text-gray-700"><strong>Age:</strong> {profileData.age}</p>
      </div>

      {/* Contact Information */}
      <div className="mb-6 p-4 bg-white rounded-lg shadow">
        <h3 className="text-xl font-medium mb-4">Contact Information</h3>
        <p className="text-gray-700"><strong>Email:</strong> {profileData.email}</p>
        <p className="text-gray-700"><strong>Phone:</strong> {profileData.phone}</p>
        <p className="text-gray-700"><strong>Address:</strong> {profileData.address}</p>
      </div>

      {/* Medical Information */}
      <div className="mb-6 p-4 bg-white rounded-lg shadow">
        <h3 className="text-xl font-medium mb-4">Medical Information</h3>
        <p className="text-gray-700"><strong>Allergies:</strong> {profileData.knowAllergies}</p>
        <p className="text-gray-700"><strong>Past Surgeries</strong> {profileData.pastSurgeries} cm</p>
        <p className="text-gray-700"><strong>Family Medical History:</strong> {profileData.familyMedicalHistory} kg</p>
        <p className="text-gray-700"><strong>Medical History:</strong> {profileData.medicalHistory}</p>
      </div>

      {/* Emergency Contact */}
      <div className="mb-6 p-4 bg-white rounded-lg shadow">
        <h3 className="text-xl font-medium mb-4">Emergency Contact</h3>
        <p className="text-gray-700"><strong>Name:</strong> {profileData.emergenecyContactName}</p>
        <p className="text-gray-700"><strong>Phone:</strong> {profileData.emergencyContactPhone}</p>
        {/* <p className="text-gray-700"><strong>Relation:</strong> {profileData.emergencyContact.relation}</p> */}
      </div>
    </div>
    </div>
  );
};

export default Profile;
