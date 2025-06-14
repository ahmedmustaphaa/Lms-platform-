import React, { useEffect, useState } from 'react'
import { ShareData } from '../../context/Appcontext'
import Searchbar from '../../component/student/Searchbar';
import { useParams } from 'react-router';
import CourseCard from '../../component/student/CourseCard';
import { assets } from '../../assets/assets';
import Footer from '../../component/student/Footer';

function Courseslist() {
  const { navigate, allcourses } = ShareData();
  const { input } = useParams();
  const [filteredCourse, setFilteredCourse] = useState([]);

  useEffect(() => {
    if (allcourses && allcourses.length > 0) {
      const tempCourses = allcourses.slice();
      input
        ? setFilteredCourse(
            tempCourses.filter((item) =>
              item.courseTitle.toLowerCase().includes(input.toLowerCase())
            )
          )
        : setFilteredCourse(tempCourses);
    }
  }, [allcourses, input]);

  return (
    <div>
      <div className='relative md:px-36 px-8 pt-20 text-left'>
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

          {/* Show input + clear button if search active */}
          {input && (
            <div className="flex items-center gap-2 mb-6">
              <p className="text-gray-700">Search result for: <strong>{input}</strong></p>
              <img
                src={assets.cross_icon}
                alt="Clear"
                className="cursor-pointer w-5 h-5"
                onClick={() => navigate('/course-list')}
              />
            </div>
          )}

          {/* Conditional Rendering */}
          {filteredCourse.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-[70px]">
              {filteredCourse.map((course, index) => (
                <CourseCard key={index} course={course} />
              ))}
            </div>
          ) : (
            <div className="flex items-center justify-center mt-20 mb-40">
              <div className="bg-gradient-to-r from-blue-100 to-blue-300 shadow-xl rounded-2xl px-8 py-6 w-[80%] max-w-xl text-center">
                <h1 className="text-3xl font-semibold text-gray-800 flex flex-col items-center gap-2">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-12 w-12 text-blue-600"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M9.75 9.75h.008v.008H9.75V9.75zm4.5 0h.008v.008H14.25V9.75zM12 14.25v.008h.008V14.25H12zm-6 7.5h12a2.25 2.25 0 002.25-2.25V4.5A2.25 2.25 0 0018 2.25H6A2.25 2.25 0 003.75 4.5v15a2.25 2.25 0 002.25 2.25z"
                    />
                  </svg>
                  Sorry, no courses found
                </h1>
                <p className="text-gray-600 mt-2">
                  Please try a different search or check back later.
                </p>
              </div>
            </div>
          )}
        </div>
      </div>

      <Footer />
    </div>
  );
}

export default Courseslist;
