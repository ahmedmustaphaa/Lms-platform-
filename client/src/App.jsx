import { useState } from 'react'
import reactLogo from './assets/react.svg'

import './App.css'
import { Route, Routes, useMatch } from 'react-router'
import Home from './pages/students/Home'
import Courseslist from './pages/students/Courseslist'
import Coursedetails from './pages/students/Coursedetails'
import Myenrollements from './pages/students/Myenrollements'
import Player from './pages/students/Player'
import Loading from './component/student/Loading'
import Educator from './pages/educator/Educator'
import Dashboad from './pages/educator/Dashboad'
import Addcourse from './pages/educator/Addcourse'

import StudentsEnroll from './pages/educator/StudentsEnroll'
import Navbar from './component/student/Navbar'
import Mycourses from './pages/educator/Mycourses'
function App() {


  const isEducator=useMatch('/educator/*')
 

  return (
    <div className='h-screen bg-white text-default'>

    {!isEducator && <Navbar/>}
  
 
    <Routes>
    <Route path='/'  element={<Home/>}></Route>
    <Route path='/course-list'  element={<Courseslist/>}></Route>
    <Route path='/course-list/:input'  element={<Courseslist/>}></Route>
    <Route path='/course/:id'  element={<Coursedetails/>}></Route>
    <Route path='/my-enrollment'  element={<Myenrollements/>}></Route>
    <Route path='/player/:courseId'  element={<Player/>}></Route>
    <Route path='/loading/:path'  element={<Loading/>}></Route>
<Route path='/educator' element={<Educator />}>
  <Route path='educator' element={<Dashboad />} ></Route>
  <Route path='add-course' element={<Addcourse />} />
  <Route path='my-courses' element={<Mycourses />} />  {/* هذا صحيح */}
  <Route path='student-enrolled' element={<StudentsEnroll />} />
</Route>


    </Routes>
    </div>
  )
}

export default App
