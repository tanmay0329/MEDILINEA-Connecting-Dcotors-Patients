// import { useState } from "react"
import { Link } from "react-router-dom";
import instagram from "../assets/instagram.png"
import twitter from "../assets/twitter.png"
import mail from "../assets/mail.png"
import linkedin from "../assets/linkedin.png"
import pf from "../assets/portfolio.png"

const AboutUs = () => {
    return (
        <div>
            <div className="bg-[#93c5f3] font-raleway h-auto">
                <div className='flex justify-between py-5 px-4  bg-[#1c5081] font-light text-lg text-white'>
                    <span className='font-raleway text-2xl text-[#9dc3e9] font-bold'>Medlinea</span>
                    <Link to="/"><button className='mx-2 bg-[#96BADC] py-1 px-3 rounded-lg duration-300 hover:shadow-[#3794eb] hover:shadow-md hover:-translate-y-1'>Home</button></Link>

                </div>

                <div className="text-[#024686] flex-col justify-center items-center">
                    <div className="mx-60 text-center text-xl my-10 ">
                    Welcome to MedLinea! We are a group of passionate students dedicated to solving real-world problems through technology. Currently, MedLinea is a project born out of our love for healthcare and our desire to create innovative solutions that can make a difference.
                    </div>
                    <div className="mx-60 text-center text-xl my-10 ">
                    As students from Vishwakarma Institute Of Technology, Pune, we are constantly learning, experimenting, and building. MedLinea is a result of combining our academic knowledge with practical experience, and we are proud to showcase what we{"'"}ve developed so far.
                    </div>
                    <div className="mx-60 text-center text-xl my-10 ">
                    Our mission is to  make healthcare more accessible, We believe that even as students, we can create meaningful impact by leveraging the power of technology.
                    </div>
                    <div className="mx-60 text-center text-xl my-10 ">
                    Thank you for visiting MedLinea! We hope you find it useful, and we’re always excited to hear feedback from our users. Feel free to reach out to us for suggestions, collaborations, or just to say hello!
                    </div>
                    <div className="mx-60 text-center text-xl my-10 flex underline decoration-blue-600">
                        <img src={mail} className="w-7 mr-2 " alt="" /> <a href="https://mail.google.com/mail/u/0/#inbox?compose=GTvVlcSMSclrDppqFLPPxfRNTJhCkmbQfXRbBvBljbSVqPNVKmZVjwZScqtmPwfrdzkhWSQGtJHxF">akhileshpimple3@gmail.com</a>
                    </div>
                    <div className="mx-60 text-center text-xl my-10 flex underline decoration-blue-600">
                        <img src={pf} className="w-7 mr-2 " alt="" /> <a href="https://akhilesh1326.github.io/Personal-Portfolio/">Portfolio</a>
                    </div>
                    <div className="mx-60 text-center text-xl my-10 flex ">
                        Social Media <a href="https://www.linkedin.com/in/akhilesh-pimple-8a57b6249/"><img src={linkedin} className="w-7 mx-1" alt="" /></a>
                        <a href="https://x.com/Akhilesh_P26"><img src={twitter} className="w-7 mx-1" alt="" /></a>
                        <a href="https://www.instagram.com/akhilesh_p_198/"><img src={instagram} className="w-7 mx-1 mb-[10rem]" alt="" /></a>
                    </div>
                    
                </div>
            </div>
            <div className="bg-black h-10">
                
            </div>
        </div>
    )
};

export default AboutUs;