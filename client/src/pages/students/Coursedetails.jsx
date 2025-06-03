import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router';
import { ShareData } from '../../context/Appcontext';
import Loading from '../../component/student/Loading';
import { assets } from '../../assets/assets';
import humanizeDuration from 'humanize-duration';
import { motion } from 'framer-motion';
import Footer from '../../component/student/Footer'
import YouTube from 'react-youtube';
function Coursedetails() {
  const { id } = useParams();
  const [courseData, setCourseData] = useState(null);
  const [expandedChapters, setExpandedChapters] = useState({});
  const [isAlreadyEnrolled, setIsAlreadyEnrolled] = useState(false);
  const [playerData, setPlayerData] = useState(null);

  const {
    allcourses,
    calculatingRating,
    
    calcChapterTime,
    calculateCourseDuration,
    calculateNumberOfLectures,currency
  } = ShareData();

  useEffect(() => {
    const fetchCourseData = () => {
      const findCourse = allcourses.find((course) => course._id === id);
      setCourseData(findCourse);
    };
    fetchCourseData();
  }, [allcourses, id]);

          const toggleChapter=(index)=>{
            setExpandedChapters((prev)=>({
              ...prev, [index]: !prev[index]
            }))
          }

  return courseData ? (
    <div className="relative">
      <div className="absolute top-0 left-0 w-full h-[700px] -z-10 bg-gradient-to-b from-cyan-100/70"></div>

      <div className="relative z-10 flex flex-col md:flex-row gap-10 justify-between md:px-36 px-6 pt-24">
        {/* Left Side */}
        <div className="md:w-[55%] w-full text-gray-700">
          <h1 className="text-4xl font-bold text-gray-800 mb-2">{courseData.courseTitle}</h1>

          <p
            dangerouslySetInnerHTML={{ __html: courseData.courseDescription.slice(0, 200) }}
            className="text-gray-600 mt-2 text-base leading-relaxed"
          ></p>

          {/* Ratings */}
          <div className="flex items-center gap-3 mt-4 flex-wrap text-sm">
            <span className="text-yellow-500 font-semibold text-base">
              {calculatingRating(courseData)}
            </span>
            <div className="flex gap-1">
              {[...Array(5)].map((_, i) => (
                <img
                  key={i}
                  src={i < Math.floor(calculatingRating(courseData)) ? assets.star : assets.star_blank}
                  alt="star"
                  className="w-5 h-5"
                />
              ))}
            </div>
            <p className="text-gray-500">
              {courseData.courseRatings.length} {courseData.courseRatings.length > 1 ? 'ratings' : 'rating'}
            </p>
            <p className="text-gray-500">
              {courseData.enrolledStudents.length} {courseData.enrolledStudents.length > 1 ? 'students' : 'student'}
            </p>
          </div>

          <p className="text-sm mt-2">
            Course by <span className="text-blue-600 underline">Ahmed Mustapha</span>
          </p>

          {/* Course Structure */}
          <div className="mt-10">
            <h2 className="text-xl font-semibold text-gray-800 mb-4">Course Structure</h2>
            <div className="space-y-6">
              {courseData.courseContent.map((chapter, index) => {
                const isExpanded = expandedChapters[index];

                return (
                  <div
                    key={index}
                    className="bg-white shadow-md rounded-xl p-4 transition-all duration-500 ease-in-out"
                  >
                    <div
                      className="flex items-center gap-2 cursor-pointer"
                      onClick={() => toggleChapter(index)}
                    >
                      <img
                        src={assets.down_arrow_icon}
                        alt="Toggle"
                        className={`w-4 h-4 transform transition-transform ${
                          isExpanded ? 'rotate-180' : ''
                        }`}
                      />
                      <p className="font-semibold text-gray-800">{chapter.chapterTitle}</p>
                    </div>

                    <p className="text-sm text-gray-500 mt-1">
                      {chapter.chapterContent.length} lectures – {calcChapterTime(chapter)}
                    </p>

                    {/* Lectures */}
                    {isExpanded && (
                      <div className="overflow-hidden transition-all duration-300 max-h-96 mt-2">
                        <ul className="space-y-2">
                        {chapter.chapterContent.map((lecture, i) => (
  <motion.li
    key={`${index}-${i}`}
    initial={{ opacity: 0, x: -20 }}
    animate={{ opacity: 1, x: 0 }}
    transition={{ duration: 0.4, delay: i * 0.1 }}
    className="flex gap-3 items-start bg-gray-50 p-3 rounded-xl shadow-sm hover:bg-gray-100 transition"
  >
    <img src={assets.play_icon} className="w-5 h-5 mt-1" alt="Play Icon" />
    <div>
      <p className="font-medium text-gray-800">{lecture.lectureTitle}</p>
      <div className="flex gap-4 text-sm text-gray-500 mt-1">
        {lecture.lectureUrl && (
          <p
            className="text-green-600 font-medium cursor-pointer"
            onClick={() =>
              setPlayerData({
                videoId: lecture.lectureUrl.split('/').pop()
              })
            }
          >
            معاينة
          </p>
        )}
        <p>
          {humanizeDuration(lecture.lectureDuration * 60 * 1000, {
            units: ['h', 'm']
          })}
        </p>
      </div>
    </div>
  </motion.li>
))}

                        </ul>
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          </div>
          <div className='pt-4'> 
          <h3 className='text-xl font-semibold text-gray-800'>Course description </h3>
           <p
            dangerouslySetInnerHTML={{ __html: courseData.courseDescription }}
            className="text-gray-600 mt-2 text-base leading-relaxed"
          ></p>
          </div>
        </div>

        {/* Right Side - Summary Box */}
       <div className="md:w-[45%] w-full bg-white shadow-xl rounded-2xl p-6 text-start space-y-6 transition-transform duration-300 hover:scale-[1.02]">
  {/* صورة الكورس */}
  <div className="overflow-hidden rounded-xl">
    <img
      src={courseData.courseThumbnail}
      alt="Course Thumbnail"
      className="w-full h-[400px] object-fit"
    />
  </div>

  {/* الوقت المتبقي */}
  <div className="flex items-center  gap-3 pt-2">
  {playerData? <YouTube videoId={playerData.videoId} opts={{playerVars:{autoplay:1}}} iframeClassName='w-full aspect-video'/>  : <img src={assets.time_left_clock_icon} alt="Time Left" className="w-6 h-6" />}
    <img src={assets.time_left_clock_icon} alt="Time Left" className="w-6 h-6" />
    <p className="text-gray-600 text-sm font-medium">5 days left at this</p>
  </div>
  <div className='flex gap-4 items-center pt-2'>
  <p className='text-gray-500 md:text-4xl text-2xl font-semibold'>  { currency}  {(courseData.coursePrice -courseData.discount*courseData.coursePrice /100).toFixed(2)} </p>

  <p className='md:text-lg text-gray-500 line-through '>{currency} {courseData.coursePrice}</p>
  <p className='md:text-lg text-gray-500'> {courseData.discount}% off</p>
  </div>

  <div className='flex items-center text-sm md:text-default gap-4 pt-2 md:pt-4 text-gray-500'>
  <div className='flex items-center gap-4'>
   <img src={assets.star} alt='star-icon'></img>

   <p>{calculatingRating(courseData)}</p>
  </div>
  <div className='h-4 w-px bg-gray-500/40'></div>
  <div className='flex items-center gap-4'>
   <img src={assets.time_clock_icon} alt='time-icon'></img>

   <p>{calculateCourseDuration(courseData)}</p>
  </div>  <div className='h-4 w-px bg-gray-500/40'></div>
  <div className='flex items-center gap-4'>
   <img src={assets.lesson_icon} alt='time-icon'></img>

   <p>{calculateCourseDuration(courseData)} lessons</p>
  </div>  <div className='h-4 w-px bg-gray-500/40'></div>
  </div>
  

   <button className='bg-[#2F5EE6] px-[30px] py-[10px] text-[white] rounded-[6px] hover:bg-[#2f5de64f] w-[80%] flex items-center justify-center text-center m-auto transition duration-300'>
   {isAlreadyEnrolled? "Already Enrolled " :"Enroll now "}
   </button>

   <div className="pt-6 px-4">
  <h2 className="text-2xl font-semibold text-gray-800 mb-4">What’s Included in the Course</h2>
  <ul className="space-y-3">
    {[
      "Lifetime access with free updates",
      "Downloadable resources",
      "Certificate of completion",
      "Access on mobile and desktop",
      "Practical projects and examples"
    ].map((item, index) => (
      <li key={index} className="flex items-start text-gray-700">
        <svg
          className="w-5 h-5 text-green-600 mt-1 mr-2"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          viewBox="0 0 24 24"
        >
          <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
        </svg>
        {item}
      </li>
    ))}
  </ul>
</div>


</div>

      </div>
      <Footer/>
    </div>
  ) : (
    <Loading />
  );
}

export default Coursedetails;
