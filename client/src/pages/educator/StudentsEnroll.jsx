import React, { useEffect, useState } from 'react';
import { dummyStudentEnrolled } from '../../assets/assets';
import Loading from '../../component/student/Loading';

function StudentsEnroll() {
  const [enrolledStudents, setEnrolledStudents] = useState(null);

  const fetchEnrolledStudent = () => {
    setEnrolledStudents(dummyStudentEnrolled);
  };

  useEffect(() => {
    fetchEnrolledStudent();
  }, []); // تشغيل مرة واحدة فقط

  return enrolledStudents ? (
    <div className="p-4 sm:p-8">
      <h1 className="text-2xl font-semibold text-gray-800 mb-6">📚 Students Enrolled</h1>

      <div className="overflow-x-auto">
        <table className="min-w-full divide-y divide-gray-200 border rounded-lg">
          <thead className="bg-gray-100 text-gray-700 font-semibold">
            <tr>
              <th className="px-6 py-3 text-left">#</th>
              <th className="px-6 py-3 text-left">Student Name</th>
              <th className="px-6 py-3 text-left">Course Title</th>
              <th className="px-6 py-3 text-left">Enrollment Date</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-100">
            {enrolledStudents.map((item, index) => (
              <tr key={index} className="hover:bg-gray-50 transition duration-200">
                <td className="px-6 py-4">{index + 1}</td>
                <td className="px-6 py-4 flex items-center gap-3">
                  <img
                    src={item.student.imageUrl}
                    alt={item.student.name}
                    className="w-10 h-10 rounded-full object-cover border"
                  />
                  <span>{item.student.name}</span>
                </td>
                <td className="px-6 py-4">{item.courseTitle}</td>
                <td className="px-6 py-4 text-sm text-gray-600">  {item.purchaseDate
                      ? new Date(item.purchaseDate).toLocaleDateString()
                      : 'N/A'}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  ) : (
    <Loading />
  );
}

export default StudentsEnroll;
