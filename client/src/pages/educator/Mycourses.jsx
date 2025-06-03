import React, { useEffect, useState } from 'react';
import { ShareData } from '../../context/Appcontext';
import Loading from '../../component/student/Loading';

function Mycourses() {
  const { currency, allcourses } = ShareData();

  const [courses, setCourses] = useState(null);

  const fetchAllCourses = () => {
    setCourses(allcourses);
  };

  useEffect(() => {
    fetchAllCourses();
  }, []);

  return courses ? (
    <div className="h-screen w-full flex flex-col items-center justify-start p-6 bg-gray-50">
      <div className="w-full max-w-6xl bg-white rounded-lg shadow-lg p-8">
        <h1 className="text-3xl font-bold text-gray-800 mb-6">My Courses</h1>

        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-100">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                  Course Title
                </th>
                <th className="px-6 py-3 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                  Earnings
                </th>
                <th className="px-6 py-3 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                  Students
                </th>
                <th className="px-6 py-3 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                  Published On
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {courses.length === 0 && (
                <tr>
                  <td
                    colSpan="4"
                    className="text-center py-6 text-gray-500 italic"
                  >
                    No courses found.
                  </td>
                </tr>
              )}

              {courses.map((course, index) => (
                <tr
                  key={index}
                  className="hover:bg-gray-50 transition-colors duration-200"
                >
                  <td className="px-6 py-4 whitespace-nowrap text-gray-900 font-medium">
                    {course.courseTitle || 'N/A'}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-gray-700">
{currency}{" "}
{Math.floor(
  (course.enrolledStudents?.length || 0) *
  ((course.coursePrice || 0) - (course.courseDiscount || 0))
)}

                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-gray-700">
                    {course.enrolledStudents.length || 0}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-gray-700">
                    {course.createdAt
                      ? new Date(course.createdAt).toLocaleDateString()
                      : 'N/A'}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  ) : (
    <Loading />
  );
}

export default Mycourses;
