import React from "react";
import { Link } from 'react-router-dom';


const Navbar = () => {
  return (
    <header className="font-nunito fixed top-0 left-0 w-full z-40 bg-transparent/70 backdrop-blur-md shadow-md px-6 md:px-12 py-4 flex justify-between items-center transition-all">
      <div className="text-xl font-bold text-gray-800">
        {/* Ganti dengan logo/image jika ada */}
        <h1>Profile Picture</h1>
      </div>
      <nav className="hidden md:flex gap-8 items-center text-gray-900 font-medium">
        <Link to="/#about" className="hover:text-blue-600 transition">
          About us
        </Link>
        <Link to="/article" className="hover:text-blue-600 transition">
          Daily Tips
        </Link>
        <a href="/developer" className="hover:text-blue-600 transition">
          Developers
        </a>
        <Link
          to="/login" className="border border-blue-600 text-blue-600 px-5 py-1.5 rounded-full hover:bg-blue-600 hover:text-white transition">
        Sign Up
        </Link>
      </nav>
    </header>
  );
};

export default Navbar;