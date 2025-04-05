import React from 'react';
import { HiChevronDown } from 'react-icons/hi'; // Import dropdown icon
import navLogo from '../../assets/nav-logo.svg';
import profileImage from '../../assets/profile-image.avif';

const Navbar = () => {
  return (
    <nav className="bg-white shadow-md z-50 fixed w-full">
      <div className="max-w-[1400px] mx-auto flex justify-between items-center px-4 py-4">
        {/* Left: Logo & Title */}
        <div className="flex items-center space-x-2">
          <img src={navLogo} alt="Shopper Logo" className="h-10" />
        </div>

        {/* Right: Profile Image & Dropdown Icon */}
        <div className="flex items-center space-x-2 cursor-pointer">
          <img
            src={profileImage}
            alt="Profile"
            className="h-10 w-10 rounded-full border border-gray-300"
          />
          <HiChevronDown className="text-gray-600 text-xl" /> {/* Dropdown Icon */}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
