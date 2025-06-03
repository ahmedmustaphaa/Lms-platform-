import React from 'react';
import { assets } from '../../assets/assets';
import { ShareData } from '../../context/Appcontext';
import { NavLink } from 'react-router-dom'; // تأكد من استخدام react-router-dom

function Sidebar() {
  const { IsEducator } = ShareData();

  const menuItems = [
    { name: 'Dashboard', path: '/educator/educator', icon: assets.home_icon },
    { name: 'Add Course', path: '/educator/add-course', icon: assets.add_icon },
{ name: 'My Courses', path: '/educator/my-courses', icon: assets.my_course_icon },

    { name: 'Student Enrolled', path: '/educator/student-enrolled', icon: assets.person_tick_icon },
  ];

  return IsEducator && (
    <aside className="w-60 min-h-screen bg-white border-r shadow-sm px-4 py-6 flex flex-col gap-6">
      <div className="text-xl font-bold text-gray-700 mb-4 px-2">
        لوحة المعلم 🎓
      </div>

      <nav className="flex flex-col gap-2">
        {menuItems.map((menu, index) => (
          <NavLink
            key={index}
            to={menu.path}
            className={({ isActive }) =>
              `flex items-center gap-3 px-3 py-2 rounded-lg font-medium transition-colors ${
                isActive
                  ? 'bg-blue-100 text-blue-600'
                  : 'text-gray-600 hover:bg-gray-100 hover:text-blue-500'
              }`
            }
          >
            <img src={menu.icon} alt={menu.name} className="w-5 h-5" />
            <span>{menu.name}</span>
          </NavLink>
        ))}
      </nav>
    </aside>
  );
}

export default Sidebar;
