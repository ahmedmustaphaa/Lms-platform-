import React, { useEffect, useState } from 'react'
import { ShareData } from '../../context/Appcontext'
import Searchbar from '../../component/student/Searchbar';
import { useParams } from 'react-router';
import CourseCard from '../../component/student/CourseCard';
import { assets } from '../../assets/assets';
import Footer from '../../component/student/Footer';

function Courseslist() {

  const {navigate,allcourses}=ShareData();
  const {input} =useParams();
  const [filteredCourse,setFilteredCourse]=useState([])

  useEffect(()=>{
    if(allcourses  && allcourses.length >0){
      const tempCourses=allcourses.slice();

      input ? setFilteredCourse(tempCourses.filter((item)=>item.courseTitle.toLowerCase().includes(input.toLowerCase())))   :setFilteredCourse(tempCourses)
    }

  },[allcourses,input])
  return (
    <div>
    
    <div className='relative md:px-36 px-8 pt-20 text-left '>
  <div className="container mx-auto px-4">
  {/* Header Section */}
  <div className="flex flex-col md:flex-row items-center justify-between py-7 text-center md:text-start gap-4">
    <div>
      <h1 className="font-bold text-3xl sm:text-4xl text-gray-800">Courses List</h1>
      <p className="text-gray-600 py-2">
        <span
          className="text-blue-600 cursor-pointer hover:underline"
          onClick={() => navigate('/')}
        >
          Home
        </span>{' '}
        / <span>Courseslist</span>
      </p>
    </div>
    <div className="w-full md:w-auto flex justify-center md:justify-end">
      <Searchbar data={input} />
    </div>
  
  </div>
  {input &&<div>   
      <p>{ input}</p>
      <img src={assets.cross_icon} alt='' className='cursor-pointer' onClick={(()=>navigate('/course-list'))}></img>
      </div>}
  {/* Courses Grid */}
  <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-[70px]  ">
    {filteredCourse.map((course, index) => (
      <CourseCard key={index} course={course} />
    ))}
  </div>
</div>

    </div>
    <Footer/>
    </div>
  )
}

export default Courseslist