import { Link } from "react-router-dom"

const HeaderForDashboardComponent = () => {
  return (
    <div>
      <header className='w-full border-b-2 border-[#174876] flex justify-between  bg-[#96BADC] px-5 py-4'>
      <span className='font-raleway pt-2 text-2xl text-[#1e3348]'>Medlinea</span>
        <div>
        <Link to="/user/doctor/dashboard"><button className='bg-[#1c5081] py-2 px-2 rounded-md font-thin hover:shadow-md hover:shadow-[#3794eb] duration-300 hover:-translate-y-1 text-white'>Dashboard</button></Link>
        </div>
      </header>
    </div>
  )
}

export default HeaderForDashboardComponent
