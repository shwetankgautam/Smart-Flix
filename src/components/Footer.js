// Footer.js

import React from 'react';

const Footer = () => {
  return (
    <footer className="bg-black text-white p-8">
      <div className="container mx-auto flex flex-col md:flex-row items-center justify-between">
        <div className="flex items-center">
          <img
            src="https://www.freepnglogos.com/uploads/red-netflix-logo-text-png-3.png"
            alt="Netflix Logo"
            className="w-16 h-16 object-contain"
          />
        </div>
        <div className="mt-4 md:mt-0 flex space-x-6">
          <span className="hover:text-gray-300 transition duration-300 ease-in-out">
            Home
          </span>
          <span className="hover:text-gray-300 transition duration-300 ease-in-out">
            TV Shows
          </span>
          <span className="hover:text-gray-300 transition duration-300 ease-in-out">
            Movies
          </span>
          <span className="hover:text-gray-300 transition duration-300 ease-in-out">
            New & Popular
          </span>
          <span className="hover:text-gray-300 transition duration-300 ease-in-out">
            My List
          </span>
        </div>
        <div className="flex items-center">
          <span className="text-sm pr-4">Terms of Use</span>
          <span className="text-sm pr-4">Privacy Statement</span>
          <span className="text-sm">Help Center</span>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
