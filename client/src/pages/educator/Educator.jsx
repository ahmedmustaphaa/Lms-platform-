import React from 'react'
import { Outlet } from 'react-router'
import Navbar from '../../component/educator/Navbar'
import Sidebar from '../../component/educator/Sidebar'
import Footer from '../../component/student/Footer'

function Educator() {
  return (
    <div>
    <Navbar/>
    
    <div className='flex '>
    <div>
    <Sidebar/>
    </div>
    <Outlet/>
    </div>
    <Footer/>
    </div>
  )
}

export default Educator