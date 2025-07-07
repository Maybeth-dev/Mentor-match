 import React from "react";
import Sidebar from "../Components/Sidebar";
import { Link } from "react-router-dom";

const Dashboard = () => {
  return (
    <div className="flex min-h-screen bg-gray-100">
      <Sidebar />
      <main className="flex-1 p-8">
        <div className="mb-6">
          <h1 className="text-2xl font-bold">Welcome back, Ayodeji Abimbola 👋</h1>
          <p className="text-sm text-gray-600">Role: <span className="font-medium text-blue-600">MENTEE</span></p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          <Link to="/mentors" className="bg-white shadow p-4 rounded hover:bg-blue-50">
            <h2 className="text-lg font-semibold mb-2">Find Mentors</h2>
            <p className="text-sm text-gray-600">Browse and connect with available mentors.</p>
          </Link>

          <Link to="/requests" className="bg-white shadow p-4 rounded hover:bg-blue-50">
            <h2 className="text-lg font-semibold mb-2">My Requests</h2>
            <p className="text-sm text-gray-600">Track the mentorship requests you’ve sent.</p>
          </Link>

          <Link to="/sessions" className="bg-white shadow p-4 rounded hover:bg-blue-50">
            <h2 className="text-lg font-semibold mb-2">My Sessions</h2>
            <p className="text-sm text-gray-600">View and manage upcoming sessions.</p>
          </Link>
        </div>
      </main>
    </div>
  );
};

export default Dashboard;
