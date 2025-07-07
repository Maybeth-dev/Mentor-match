 import React from "react"; 
 import Header from "../Components/header";
import { Link } from "react-router-dom";

const HomePage = () => {
  return (
      <> 
      <div className="min-h-screen bg-white flex flex-col justify-between">
      <header className="flex justify-between items-center px-6 py-4 border-b">
        <h1 className="text-xl font-bold text-blue-600">Mentor × Match</h1>
        <Link
          to="/dashboard"
          className="bg-black text-white px-4 py-2 rounded-full hover:bg-gray-800"
        >
          Dashboard
        </Link>
      </header>

      <main className="flex-1 flex flex-col items-center justify-center px-6 text-center">
        <p className="text-xs tracking-widest text-blue-500 mb-2">A SOCIAL MEDIA FOR LEARNERS</p>
        <h2 className="text-4xl font-extrabold mb-3">Connect & learn from the experts</h2>
        <p className="text-gray-500 mb-6 max-w-md">
          Grow your career fast with the right mentor.
        </p>
        <Link
          to="/dashboard"
          className="bg-yellow-400 hover:bg-yellow-500 text-black px-6 py-3 rounded-full font-medium"
        >
          Go to Dashboard
        </Link>

        <div className="mt-12 grid grid-cols-2 sm:grid-cols-4 gap-6">
          <div className="flex flex-col items-center">
            <img src="https://randomuser.me/api/portraits/men/32.jpg" alt="" className="w-16 h-16 rounded-full border-2 border-yellow-400" />
          </div>
          <div className="flex flex-col items-center">
            <img src="https://randomuser.me/api/portraits/women/55.jpg" alt="" className="w-16 h-16 rounded-full border-2 border-purple-400" />
          </div>
          <div className="text-center">
            <div className="text-xs uppercase text-gray-500">Active Professionals</div>
            <div className="text-2xl font-bold">13,422</div>
          </div>
          <div className="text-center">
            <div className="text-xs uppercase text-gray-500">Online Courses</div>
            <div className="text-2xl font-bold">2,582</div>
          </div>
        </div>
      </main>

      <footer className="text-center text-xs py-4 text-gray-400">&copy; 2025 Mentor × Match</footer>
    </div>
      </>
  );
};

export default HomePage;
