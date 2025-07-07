import React from "react";
import { Link, useLocation } from "react-router-dom";

const Sidebar = () => {
  const { pathname } = useLocation();

  const isActive = (path: string) =>
    pathname === path ? "bg-blue-100 text-blue-800 font-semibold" : "text-gray-700";

  return (
    <aside className="w-64 h-full bg-white border-r p-4 space-y-2">
      <h2 className="text-xl font-bold text-blue-600 mb-6">Mentor × Match</h2>
      <nav className="flex flex-col gap-2">
        <Link to="/dashboard" className={`p-2 rounded ${isActive("/dashboard")}`}>
          Dashboard
        </Link>
        <Link to="dashboard/mentors" className={`p-2 rounded ${isActive("/mentors")}`}>
          Find Mentors
        </Link>
        <Link to="dashboard/requests" className={`p-2 rounded ${isActive("/requests")}`}>
          My Requests
        </Link>
        <Link to="dashboard/sessions" className={`p-2 rounded ${isActive("/sessions")}`}>
          My Sessions
        </Link>
      </nav>
    </aside>
  );
};
export default Sidebar;
