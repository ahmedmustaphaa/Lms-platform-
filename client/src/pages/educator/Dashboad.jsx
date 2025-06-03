import React, { useEffect, useState } from 'react';
import { ShareData } from '../../context/Appcontext';
import { assets, dummyDashboardData } from '../../assets/assets';
import Loading from '../../component/student/Loading';

function Dashboard() {
  const [dashboardData, setDashboardData] = useState(null);
  const { currency } = ShareData();

  const fetchDashboardData = () => {
    setDashboardData(dummyDashboardData);
  };

  useEffect(() => {
    fetchDashboardData();
  }, []);

  const stats = dashboardData && [
    {
      label: 'Total Students',
      value: dashboardData.enrolledStudentsData.length,
      icon: assets.patients_icon,
      border: 'border-blue-500',
    },
    {
      label: 'Total Courses',
      value: dashboardData.coursesCount || 0,
      icon: assets.appointments_icon,
      border: 'border-green-500',
    },
    {
      label: 'Total Earnings',
      value: `${dashboardData.totalEarnings || 0} ${currency}`,
      icon: assets.earning_icon,
      border: 'border-yellow-500',
    },
  ];

  return dashboardData ? (
    <div className="p-6 sm:p-10 bg-gray-50 min-h-screen">
      <h2 className="text-2xl font-bold text-gray-800 mb-8">📊 Educator Dashboard</h2>

      {/* Stats Cards */}
      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 mb-10">
        {stats.map((item, index) => (
          <div
            key={index}
            className={`flex items-center gap-4 bg-white border ${item.border} shadow-md hover:shadow-xl p-6 rounded-2xl transition duration-300`}
          >
            <img src={item.icon} alt={item.label} className="w-12 h-12" />
            <div>
              <p className="text-2xl font-semibold text-gray-900">{item.value}</p>
              <p className="text-gray-500 text-sm">{item.label}</p>
            </div>
          </div>
        ))}
      </div>

      {/* Recent Enrollments */}
      <div className="bg-white rounded-2xl shadow-md p-6">
        <h1 className="text-xl font-semibold text-gray-800 mb-4 border-b pb-2">
          🧑‍🎓 Latest Enrollments
        </h1>

        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200 text-sm">
            <thead className="bg-gray-100 text-gray-700 font-semibold">
              <tr>
                <th className="px-6 py-3 text-left">#</th>
                <th className="px-6 py-3 text-left">اسم الطالب</th>
                <th className="px-6 py-3 text-left">عنوان الدورة</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {dashboardData.enrolledStudentsData.length > 0 ? (
                dashboardData.enrolledStudentsData.map((item, index) => (
                  <tr
                    key={index}
                    className="hover:bg-gray-50 transition duration-200"
                  >
                    <td className="px-6 py-4 text-gray-800 font-medium">{index + 1}</td>
                    <td className="px-6 py-4 flex items-center gap-3">
                      <img
                        src={item.student.imageUrl}
                        alt={item.student.name}
                        className="w-10 h-10 rounded-full object-cover border border-gray-300"
                      />
                      <span className="text-gray-800">{item.student.name}</span>
                    </td>
                    <td className="px-6 py-4 text-gray-600">{item.courseTitle}</td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="3" className="px-6 py-6 text-center text-gray-500">
                    لا يوجد بيانات حالياً
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  ) : (
    <Loading />
  );
}

export default Dashboard;
