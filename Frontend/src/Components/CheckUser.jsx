// import React from 'react'
import { Link } from "react-router-dom";


const CheckUser = () => {
    return (
        <div>
            <div className='flex justify-center items-center'>
                <div className='flex-col'>
                    <h1 className='font-bold mx-4'>How you going to sign up as</h1>
                    <Link to="/user/doctor/login-credentials"><button className='font-semibold border-black border-2 rounded-md my-4 mx-8 py-1 px-2'>Doctor</button></Link>
                    <Link to="/user/patient/login-credentials"><button className='font-semibold border-black border-2 rounded-md my-4 mx-8 py-1 px-2'>Patient</button></Link>
                </div>
            </div>
        </div>
    )
}

export default CheckUser
