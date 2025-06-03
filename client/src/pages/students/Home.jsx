import React from 'react'
import Hero from '../../component/student/Hero'
import Searchbar from '../../component/student/Searchbar'
import Campanies from '../../component/student/Campanies'
import Coursesection from '../../component/student/Coursesection'
import Testimonilsection from '../../component/student/Testimonilsection'
import CalltoAction from '../../component/student/CalltoAction'
import Footer from '../../component/student/Footer'

function Home() {
  return (
    <div className='flex flex-col items-center pt-[120px] min-h-48-[100vh] bg-[#EDFFFF]'>
    <Hero/>

    <Searchbar/>

    <Campanies/>

    <Coursesection/>

    <Testimonilsection/>
    <CalltoAction/>

    <Footer/>

    </div>
  )
}


export default Home