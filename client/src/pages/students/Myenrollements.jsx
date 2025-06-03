import React, { useState } from 'react'
import { ShareData } from '../../context/Appcontext'
import { motion } from 'framer-motion'
import {Line} from 'rc-progress'
import Footer from '../../component/student/Footer'
function Myenrollements() {
  const { enrolledCourses, calculateCourseDuration,navigate } = ShareData();

   const [progressArray, setProgressArray] = useState([
    { lectureCompleted: 2, totallecture: 4 },
    { lectureCompleted: 3, totallecture: 5 },
    { lectureCompleted: 1, totallecture: 4 },
    { lectureCompleted: 2, totallecture: 6 },
    { lectureCompleted: 4, totallecture: 8 },
    { lectureCompleted: 2, totallecture: 4 },
    { lectureCompleted: 3, totallecture: 6 },
    { lectureCompleted: 1, totallecture: 4 },
    { lectureCompleted: 2, totallecture: 4 },
    { lectureCompleted: 2, totallecture: 5 },
    { lectureCompleted: 4, totallecture: 4 },
    { lectureCompleted: 0, totallecture: 3 },
    { lectureCompleted: 3, totallecture: 6 },
    { lectureCompleted: 2, totallecture: 4 },
  ])

  return (
    <div className="md:px-36 px-6 py-10">
      <h1 className="text-2xl font-bold mb-6 text-amber-600">My Enrollments</h1>

      <div className="overflow-x-auto">
        <motion.table
          className="w-full border border-amber-500 text-sm shadow-md rounded-lg overflow-hidden"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <thead className="bg-amber-100 text-gray-800">
            <tr>
              <th className="px-6 py-4 text-left">Course</th>
              <th className="px-6 py-4 text-left">Duration</th>
              <th className="px-6 py-4 text-left">Completed</th>
              <th className="px-6 py-4 text-left">Status</th>
            </tr>
          </thead>

          <tbody className="bg-white divide-y divide-gray-200">
            {enrolledCourses.map((enrolled, index) => (
              <motion.tr
                key={index}
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.05 * index }}
                className="hover:bg-gray-50 transition"
              >
                <td className="px-6 py-4 flex items-center gap-4">
                  <img
                    src={enrolled.courseThumbnail}
                    alt="Thumbnail"
                    className="w-14 h-14 rounded-md object-cover border"
                  />
                  <div>
                    <p className="font-medium text-gray-900">{enrolled.courseTitle}</p>
                    <Line strokeWidth={2} percent={progressArray[index ] ?( progressArray[index].lectureCompleted *100)/progressArray[index].totallecture:50} className='bg-gray-300 rounded-full '/>
                  </div>
                </td>

                <td className="px-6 py-4 text-gray-700">
                  {calculateCourseDuration(enrolled)}
                </td>

             <td className="px-6 py-4 text-gray-700">
  {progressArray[index] && `${progressArray[index].lectureCompleted} / ${progressArray[index].totallecture} محاضرة`}
</td>


                <td className="px-6 py-4">
                  <span className="inline-block px-3 py-1 text-sm font-semibold text-green-800 bg-green-100 rounded-full cursor-pointer"  onClick={()=>navigate('/player/'+enrolled._id)}>

                  {progressArray[index]  && progressArray[index].lectureCompleted /progressArray[index].totallecture === 1? " completed " :"   On going" }
                 
                  </span>
                </td>
              </motion.tr>
            ))}
          </tbody>
        </motion.table>
      </div>
      <Footer/>
    </div>
  )
}

export default Myenrollements
