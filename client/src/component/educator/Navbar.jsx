import React from 'react';
import { assets, dummyEducatorData } from '../../assets/assets';
import { UserButton, useUser } from '@clerk/clerk-react';
import { Link } from 'react-router-dom'; // استخدم react-router-dom بدل من react-router

function Navbar() {
  const { user } = useUser();

  return (
    <nav className="w-full bg-white shadow-sm px-4 sm:px-10 py-3 flex items-center justify-between border-b border-gray-100">
      {/* Logo */}
      <Link to="/">
        <img src={assets.logo} alt="Logo" className="w-28 lg:w-32" />
      </Link>

      {/* Right Side */}
      <div className="flex items-center gap-4 sm:gap-6">
        <p className="text-sm sm:text-base text-gray-600 font-medium">
          👋 مرحبًا {user ? user.fullName : 'بك أيها الزائر'}
        </p>

        {/* Auth/Profile Button */}
        {user ? (
          <UserButton afterSignOutUrl="/" />
        ) : (
          <Link to="/sign-in">
            <img
              src={assets.profile_img}
              alt="User"
              className="w-9 h-9 rounded-full border border-gray-300 shadow-sm cursor-pointer hover:shadow-md transition"
            />
          </Link>
        )}
      </div>
    </nav>
  );
}

export default Navbar;
