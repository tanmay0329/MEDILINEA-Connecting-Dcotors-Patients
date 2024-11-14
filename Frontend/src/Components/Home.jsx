import { useState } from 'react';
import { Link } from 'react-router-dom';
import bgOne from "../assets/upscale-3.jpeg";

const Home = () => {
  // State to control the modal visibility
  const [isSignUpModalOpen, setSignUpModalOpen] = useState(false);
  const [isSignInModalOpen, setSignInModalOpen] = useState(false);

  // Function to handle opening and closing the modal
  const toggleSignUpModal = () => {
    setSignUpModalOpen(!isSignUpModalOpen);
  };

  return (
    <div className='font-raleway'>
      <div className='flex justify-between py-8 px-4  bg-[#1c5081] font-light text-lg text-white'>
        <span className='font-raleway text-2xl text-[#9dc3e9] font-bold'>Medlinea</span>
        <div>
          <Link to="/user/aboutUs"><button className='mx-2 bg-[#96BADC] py-1 px-3 rounded-lg duration-300 hover:shadow-[#3794eb] hover:shadow-md hover:-translate-y-1'>About Us</button></Link>
          <button onClick={toggleSignUpModal} className='mx-2 bg-[#96BADC] py-1 px-3 rounded-lg duration-300 hover:shadow-[#3794eb] hover:shadow-md hover:-translate-y-1'>SignUp</button>
          <button onClick={() => setSignInModalOpen(!isSignInModalOpen)} className='mx-2 bg-[#96BADC] py-1 px-3 rounded-lg duration-300 hover:shadow-[#3794eb] hover:shadow-md hover:-translate-y-1' >SignIn</button>
        </div>
      </div>
      <div className='flex flex-col items-center bg-[#BFD2F0]'>
        <h1 className='text-5xl text-[#133657] py-5'>MedLinea</h1>
        <div className='px-10 text-center text-2xl mb-20'>Welcome to MedLinea - Your Complete Clinical Management Solution</div>
      </div>
      <div className="flex flex-col items-center z-0 h-screen"
        style={{
          backgroundImage: `url(${bgOne})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}>
        <div className='text-center text-xl my-5 mt-10 bg-white bg-opacity-40 mx-10 px-4 py-4 rounded-lg'>
          MedLinea is a comprehensive platform designed to streamline healthcare management for both doctors and patients.
          Whether you are managing patient records, scheduling appointments, or tracking medical history, our app provides
          the tools to ensure efficient, organized, and high-quality care.
        </div>
        <div className='text-xl my-5 bg-white bg-opacity-40 mx-10 px-4 py-4 rounded-lg'>
          <div className='font-bold mb-2'>For Doctors:</div>
          <div className='text-lg flex'><div className='font-medium text-xl'>1. Manage Your Appointments:</div>
            View your calendar, set availability, and manage patient appointments seamlessly.
          </div>
          <div className='text-lg'><div className='font-medium text-xl'>2. Patient Records at Your Fingertips:</div>
            Access complete patient profiles, including medical history, contact information, and more, with just a few clicks.
          </div>
          <div className='text-lg flex'><div className='font-medium text-xl'>3. Prescription Management:</div>
            Create and send prescriptions directly through the app, making the process quicker and more accurate.
          </div>
        </div>
        <div className='text-xl my-5 bg-white bg-opacity-40 mx-10 px-4 py-4 rounded-lg'>
          <div className='font-bold mb-2'>For Patients:</div>
          <div className='text-lg flex'><div className='font-medium text-xl'>1. Easy Appointment Booking:</div>
            Browse available appointments and book with your healthcare provider easily.
          </div>
          <div className='text-lg flex'><div className='font-medium text-xl'>2. Track Medical History:</div>
            Keep a detailed record of your consultations, treatments, and prescriptions all in one place.
          </div>
          <div className='text-lg flex'><div className='font-medium text-xl'>3. Secure Access to Health Information:</div>
            View and update your personal health details with the assurance of data privacy and security.
          </div>
        </div>
      </div>

      {/* Modal for sign up as Doctor or Patient */}
      {isSignUpModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
          <div className="bg-white p-8 rounded-lg">
            <h2 className="text-2xl mb-4">Sign Up As:</h2>
            <div className="flex justify-between">
              <Link to="/user/doctor/login-credentials">
                <button className="bg-[#1c5081] text-white py-2 px-4 rounded-lg mr-4 duration-300 hover:shadow-[#3794eb] hover:shadow-md hover:-translate-y-1">Doctor</button>
              </Link>
              <Link to="/user/patient/login-credentials">
                <button className="bg-[#96BADC] text-white py-2 px-4 rounded-lg duration-300 hover:shadow-[#3794eb] hover:shadow-md hover:-translate-y-1">Patient</button>
              </Link>
            </div>
            <button onClick={toggleSignUpModal} className="mt-4 text-red-500">Close</button>
          </div>
        </div>
      )}
      {isSignInModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
          <div className="bg-white p-8 rounded-lg">
            <h2 className="text-2xl mb-4">Sign In As:</h2>
            <div className="flex justify-between">
              <Link to="/user/login">
                <button className="bg-[#1c5081] text-white py-2 px-4 rounded-lg mr-4 duration-300 hover:shadow-[#3794eb] hover:shadow-md hover:-translate-y-1">Doctor</button>
              </Link>
              <Link to="/user/patient/login">
                <button className="bg-[#96BADC] text-white py-2 px-4 rounded-lg duration-300 hover:shadow-[#3794eb] hover:shadow-md hover:-translate-y-1">Patient</button>
              </Link>
            </div>
            <button onClick={() => setSignInModalOpen(!isSignInModalOpen)} className="mt-4 text-red-500">Close</button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Home;
