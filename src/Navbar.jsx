import React from 'react';
import { Globe, Bookmark, User, Search } from 'lucide-react';

function Navbar() {
  return (
    <nav className="bg-white font-dmSans">
      <div className="container mx-auto px-4 py-3 flex items-center justify-between">
        {/* Logo */}
        <div className="flex items-center">
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M3.871 16.393C2.795 15.439 2.167 14.145 2.167 12.692C2.167 11.239 2.795 9.945 3.871 8.991L11.25 2.309C11.447 2.128 11.693 2.037 11.938 2.037C12.184 2.037 12.43 2.128 12.626 2.309L20.005 8.991C21.081 9.945 21.709 11.239 21.709 12.692C21.709 14.145 21.081 15.439 20.005 16.393L12.626 23.075C12.43 23.256 12.184 23.347 11.938 23.347C11.693 23.347 11.447 23.256 11.25 23.075L3.871 16.393Z" fill="black"/>
          </svg>
          <span className="ml-2 font-semibold text-lg">Mobbin</span>
        </div>

        {/* Navigation Links */}
        <div className="flex items-center space-x-6">
          <a href="#" className="text-gray-500 hover:text-gray-700">iOS</a>
          <a href="#" className="text-gray-500 hover:text-gray-700">Android</a>
          <a href="#" className="text-gray-500 hover:text-gray-700">Web</a>
        </div>

        {/* Search Bar */}
        <div className="relative">
          <input
            type="text"
            placeholder="Search on Web..."
            className="px-4 py-2 rounded-full bg-gray-100 focus:outline-none focus:ring-2 focus:ring-blue-500 w-64 placeholder-gray-400 text-sm"
          />
          <div className="absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none">
            <Search className="h-5 w-5 text-gray-400" />
          </div>
        </div>

        {/* Right Side Buttons */}
        <div className="flex items-center space-x-4">
          <Bookmark className="h-6 w-6 text-gray-500 hover:text-gray-700" />
          <Globe className="h-6 w-6 text-gray-500 hover:text-gray-700" />
          <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-full text-sm">
            Get Pro
          </button>
          <User className="h-7 w-7 bg-indigo-500 text-white rounded-full flex items-center justify-center font-bold text-sm">A</User>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
