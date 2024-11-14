// import React from 'react'
import { Link } from 'react-router-dom'

const CheckLoginUser = () => {
  return (
    <div className='flex justify-center items-center'>
        <Link to="/user/login"><button className='m-5 py-2 px-4 border-slate-900 rounded-lg text-lg font-light bg-slate-50'>Doctor</button></Link>
        <Link to="/user/patient/login"><button className='m-5 py-2 px-4 border-slate-900 rounded-lg text-lg font-light bg-slate-50'>Patient</button></Link>
    </div>
  )
}

export default CheckLoginUser
