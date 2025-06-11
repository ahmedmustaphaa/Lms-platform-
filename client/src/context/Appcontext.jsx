
import React, { createContext, useContext, useEffect, useState } from 'react'
import { dummyCourses } from '../assets/assets';
import { useNavigate } from 'react-router';
import humanizeDuration from 'humanize-duration';
import  {useAuth,useUser} from '@clerk/clerk-react'
const appContextProvider=createContext();



function Appcontext({children}) {


   const currency=import.meta.env.VITE_CURRENCY
  const [allcourses,setAllCourses]=useState([]);
  const [IsEducator,setIsEducator]=useState(true);
  const [enrolledCourses,setenrolledCourses]=useState([]);

   
     const navigate=useNavigate();
     const {getToken}=useAuth();
     const {user}=useUser();

     console.log(user)
const userId = user?.id;
console.log("User ID:", userId);

     const fetchUserEnrolledCourses=async()=>{
      setenrolledCourses(dummyCourses)
     }

  const fetchAllCourses=async()=>{
         setAllCourses(dummyCourses)
  }

  const calculatingRating=(course)=>{
    if(course.courseRatings.length===0){
      return 0;
    }

    let totalRating=0;
    course.courseRatings.forEach(element => {
      totalRating +=element.rating
    });

    return totalRating/course.courseRatings.length
  }

  // function to calcluate course chapter time 



// 🔹 1. حساب مدة فصل (chapter)
const calcChapterTime = (chapter) => {
  let time = 0;

  if (Array.isArray(chapter.chapterContent)) {
    chapter.chapterContent.forEach((lecture) => {
      time += lecture.lectureDuration; // المدة بالدقائق
    });
  }

  return humanizeDuration(time * 60 * 1000, { units: ["h", "m"], round: true });
};

// 🔹 2. حساب مدة الكورس بالكامل
const calculateCourseDuration = (course) => {
  let time = 0;

  if (Array.isArray(course.coursecontent)) {
    course.coursecontent.forEach((chapter) => {
      if (Array.isArray(chapter.chapterContent)) {
        chapter.chapterContent.forEach((lecture) => {
          time += lecture.lectureDuration;
        });
      }
    });
  }

  return humanizeDuration(time * 60 * 1000, { units: ["h", "m"], round: true });
};

// 🔹 3. حساب عدد المحاضرات
const calculateNumberOfLectures = (course) => {
  let totalLectures = 0;

  if (Array.isArray(course.coursecontent)) {
    course.coursecontent.forEach((chapter) => {
      if (Array.isArray(chapter.chapterContent)) {
        totalLectures += chapter.chapterContent.length;
      }
    });
  }

  return totalLectures;
};


const logToken=async ()=>{
   console.log(  await getToken())
}

useEffect(()=>{
  if(user){

    logToken();

  }
},[user])


  useEffect(()=>{
    fetchAllCourses();
    fetchUserEnrolledCourses();
 
  })
    const val={

      currency,
         enrolledCourses,
      allcourses,
      navigate,
      calculatingRating,IsEducator,setIsEducator,    calcChapterTime,calculateCourseDuration ,calculateNumberOfLectures
    }
  return (
      <appContextProvider.Provider value={val}>
        {children}
      </appContextProvider.Provider>
  )
}


export const ShareData=()=>{
    return useContext(appContextProvider)
}

export default Appcontext