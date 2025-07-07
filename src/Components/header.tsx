import React from "react";
import { Link } from "react-router-dom";

const Header = () => {
  return (
    <header className="flex justify-between items-center px-6 py-4 bg-white shadow">
      <Link to="/" className="text-xl font-bold text-blue-600">
        Mentor <span className="text-black">×</span> Match
      </Link>
      <nav>
        <Link to="/dashboard" className="bg-black text-white px-4 py-2 rounded-full text-sm hover:bg-gray-800">
          Dashboard
        </Link>
      </nav>
    </header>
  );
};

export default Header;
