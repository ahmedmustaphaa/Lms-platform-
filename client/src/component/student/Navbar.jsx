import React from 'react';
import { Link } from 'react-router-dom';
import { assets } from '../../assets/assets';
import { useClerk,UserButton,useUser } from '@clerk/clerk-react';
import { ShareData } from '../../context/Appcontext';
function Navbar() {

  const  {openSignIn}=useClerk();


  const {IsEducator,setIsEducator,navigate}=ShareData();


  const {user} =useUser();
  const isCourseListPage=location.pathname.includes('/course-list')
  return (
    <nav className={`shadow-md sticky top-0 z-50 ${isCourseListPage ? 'bg-white' :'bg-[#E2FDFC]'}`}>
      <div className="max-w-7xl mx-auto px-6 py-4 flex justify-between items-center">
        {/* Left: Logo */}
        <div className="flex items-center gap-3">
          <img

          onClick={(()=>navigate('/'))}
            src={assets.logo}
            alt="Logo"
            className="h-10 w-auto object-contain"
          />
         
        </div>

        {/* Right: Navigation + CTAs */}
        <div className="hidden md:flex items-center gap-6">
        {user && <div className='flex items-center gap-4'> <Link

        
          to="/educator"
          className="bg-white border border-[#2F5EE6] text-[#2F5EE6] hover:bg-[#2F5EE6]
           hover:text-white font-semibold px-5 py-2 rounded-full transition duration-300"
        >
        {IsEducator?"   Educator Dashboard":"  Become Educator"}
        </Link>
            {/* Navigation Links */}
            <Link to="/my-enrollment" className="text-[#2F5EE6] hover:text-[#1c46c7] font-medium transition duration-300">
              My Enrollment
            </Link></div>}

          {/* Primary Buttons */}
         
           { user ? <UserButton/> :
            <Link
              to="/signup"
  
              onClick={()=>openSignIn()}
              className="bg-[#2F5EE6] hover:bg-[#1c46c7] text-white font-semibold px-6 py-2 rounded-full shadow-md transition duration-300"
            >
              Create Account
            </Link>}
        </div>
        <div  className='md:hidden flex items-center gap-2 sm:gap-5 text-gray-500'>
          <div>
          <Link

        
          to="/educator"
          className="bg-white border border-[#2F5EE6] text-[#2F5EE6] hover:bg-[#2F5EE6]
           hover:text-white font-semibold px-5 py-2 rounded-full transition duration-300"
        >
        {IsEducator?"   Educator Dashboard":"  Become Educator"}
        </Link>
            {/* Navigation Links */}
            <Link to="/my-enrollment" className="text-[#2F5EE6] hover:text-[#1c46c7] font-medium transition duration-300">
              My Enrollment
            </Link>
          </div>
          <button> <img src={assets.user_icon} ></img> </button>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
