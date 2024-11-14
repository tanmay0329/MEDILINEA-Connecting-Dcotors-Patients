import { useNavigate, Link } from "react-router-dom"
import bgOne from "../assets/upscale1.jpeg";

// import React from 'react'

const Doctor_Validation = () => {
  return (
    <div>
    <div className="flex flex-col justify-center items-center z-0 h-screen"
      style={{
        backgroundImage: `url(${bgOne})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}>
      <h1 className='font-bold text-2xl text-[#034458] mt-10'>User Validation</h1>

      <div className="flex lg:border-[#35b5dc] lg:border-4 rounded-xl mt-5 mb-20 md:w-[80%]">
        <div className="hidden flex-row lg:block  lg:w-[70%] text-center font-raleway">
          <div className=" bg-green-300 mb-20">
            logo
          </div>
          <div className='text-3xl font-extrabold text-[#181f20] mb-10'>Welcom To MedLinea</div>
          <div className='text-xl font-light m-1 mb-20'>
          Empower your healthcare experience! Join us to manage appointments effortlessly and access personalized care. <span className='text-blue-700 '>Know More</span>
          </div>
          <div>Already a have an Account</div>
          <button className='border-2 border-[#287e98] font-light rounded-full px-4 py-2 mt-2 hover:shadow-lg hover:shadow-[#034458] duration-300 hover:-translate-y-1'>Sign In</button>
        </div>
        <div className="flex flex-col w-screen lg:bg-[#034458] opacity-90 lg:rounded- rounded-bl-3xl rounded-tl-3xl rounded-r-lg ">
          <label htmlFor="full name" className='font-bold text-[#03627f] pt-3 pb-1 pl-4 sm:ml-5 md:ml-9 text-sm opacity-100 lg:font-light  lg:text-xl  lg:text-white lg:ml-20 lg:mt-8 '>Upload Proof of Medical License</label>
          <input className="lg:w-[70%] lg:self-center lg:m-0 ml-4 sm:ml-8 md:ml-12 rounded-lg py-1 px-1 lg:border-[#35b5dc] lg:border-b-2 lg:border-0 border-2 lg:outline-none lg:rounded-lg text-[#034458] lg:hover:shadow-[#0688b0] lg:hover:shadow-[0px_10px_10px_0px] lg:focus:hover:shadow-[#0688b0] lg:focus:hover:shadow-[0px_10px_10px_0px]  lg:focus-within:pl-5 lg:text-white shadow-lg font-semibold w-[90%] h-12 lg:bg-[#034458] focus-within:-translate-y-1 hover:-translate-y-1  duration-300 opacity-100 " type="text" placeholder='Image must be clear' value={null} onChange={null} />
          <label htmlFor="Phone" className='font-bold text-[#03627f] pt-3 pb-1 pl-4 sm:ml-5 md:ml-9 text-sm opacity-100 lg:font-light  lg:text-xl  lg:text-white lg:ml-20 '>Government-Issued ID</label>
          <input className="lg:w-[70%] lg:self-center lg:m-0 ml-4 sm:ml-8 md:ml-12 rounded-lg py-1 px-1 lg:border-[#35b5dc] lg:border-b-2 lg:border-0 border-2 lg:outline-none lg:rounded-lg text-[#034458] lg:hover:shadow-[#0688b0] lg:hover:shadow-[0px_10px_10px_0px] lg:focus:hover:shadow-[#0688b0] lg:focus:hover:shadow-[0px_10px_10px_0px]  lg:focus-within:pl-5 lg:text-white shadow-lg font-semibold w-[90%] h-12 lg:bg-[#034458] focus-within:-translate-y-1 hover:-translate-y-1  duration-300 opacity-100 " type="text" placeholder='Image must be clear' value={null} onChange={null} />
          <label htmlFor="Phone" className='font-bold text-[#03627f] pt-3 pb-1 pl-4 sm:ml-5 md:ml-9 text-sm opacity-100 lg:font-light  lg:text-xl  lg:text-white lg:ml-20 '>Adhar Number</label>
          <input className="lg:w-[70%] lg:self-center lg:m-0 ml-4 sm:ml-8 md:ml-12 rounded-lg py-1 px-1 lg:border-[#35b5dc] lg:border-b-2 lg:border-0 border-2 lg:outline-none lg:rounded-lg text-[#034458] lg:hover:shadow-[#0688b0] lg:hover:shadow-[0px_10px_10px_0px] lg:focus:hover:shadow-[#0688b0] lg:focus:hover:shadow-[0px_10px_10px_0px]  lg:focus-within:pl-5 lg:text-white shadow-lg font-semibold w-[90%] h-12 lg:bg-[#034458] focus-within:-translate-y-1 hover:-translate-y-1  duration-300 opacity-100 " type="text" placeholder='Enter Adhar Card Number' value={null} onChange={null} />
          <label htmlFor="dob" className='font-bold text-[#03627f] pt-3 pb-1 pl-4 sm:ml-5 md:ml-9 text-sm opacity-100 lg:font-light  lg:text-xl  lg:text-white lg:ml-20 '>Certifications</label>
          <input className="lg:w-[70%] lg:self-center lg:m-0 ml-4 sm:ml-8 md:ml-12 rounded-lg py-1 px-1 lg:border-[#35b5dc] lg:border-b-2 lg:border-0 border-2 lg:outline-none lg:rounded--[#034458] lg:hover:shadow-[#0688b0] lg:hover:shadow-[0px_10px_10px_0px] lg:focus:hover:shadow-[#0688b0] lg:focus:hover:shadow-[0px_10px_10px_0px]  lg:focus-within:pl-5 lg:text-white shadow-lg font-semibold w-[90%] h-12 lg:bg-[#034458] focus-within:-translate-y-1 hover:-translate-y-1  duration-300 opacity-100 " type="text" placeholder='Image Must be clear' value={null} onChange={null} />
         
          <button className="font-light text-lg text-white py-2 mt-7 rounded-lg bg-black w-[50%] self-center opacity-100 hover:shadow-lg hover:shadow-[#0688b0] hover:-translate-y-1 duration-500 mb-8 "  onClick={null}>Submit</button>
          <Link to="/user/doctor/dashboard"><button className="font-light text-lg text-white py-2 mt-5 rounded-lg bg-black w-[50%] self-center opacity-100 hover:shadow-md hover:shadow-[#0688b0] duration-500" >Submit</button></Link>
          <div className='lg:hidden flex justify-center mb-2'>
            <label htmlFor="login question" className='self-center text-sm mt-4 font-semibold text-[#034458]'>Already have an account?</label>
            <label htmlFor="signup" className='self-center text-sm mt-4 font-bold text-black ml-2'>Sign In</label>
          </div>
        </div>
      </div>
    </div>
  </div>
  )
}

export default Doctor_Validation
