import React from 'react';
import { Link } from 'react-router';
import { ShareData } from '../../context/Appcontext';
import CourseCard from './CourseCard';

function Coursesection() {

  const {allcourses}=ShareData()
  return (
    <section className="  rounded-2xl shadow-md  w-[1200px]   ">


      <div className="  text-center py-[50px]">
        <h2 className="text-3xl md:text-4xl font-bold text-gray-800 mb-4">
          Learn from the Best
        </h2>

       
        <p className="text-gray-600 text-lg mb-6 leading-relaxed">
          Take online courses from the world’s top universities for free. Discover over 1,700 courses from institutions like Yale, MIT, Harvard, and Oxford. Learn at your own pace, from anywhere.
        </p>
  
        <div className='flex gap-4 my-[20px] m-[auto] w-[100%]  '>
        {allcourses.slice(0,4).map((course,i)=>{
          return(
             <CourseCard course={course}/>
          )
        })}
        </div>
        <Link
          to="/course-list"
          onClick={() => scrollTo(0, 0)}
          className="inline-block bg-blue-600 text-white font-semibold py-3 px-6 rounded-lg shadow hover:bg-blue-700 transition"
        >
          Show All Courses
        </Link>
      </div>
    </section>
  );
}

export default Coursesection;
