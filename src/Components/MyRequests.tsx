 import React, { useEffect, useState } from 'react';
import axios from '../api/axiosInstance';
import { Link } from 'react-router-dom';

const MyRequests: React.FC = () => {
  const [requests, setRequests] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchRequests = async () => {
      try {
        const res = await axios.get('/requests/sent');
        setRequests(res.data.requests);
      } catch (err) {
        console.error('Error fetching requests', err);
      } finally {
        setLoading(false);
      }
    };
    fetchRequests();
  }, []);

  return (
    <div className="min-h-screen flex bg-gray-50">
      <aside className="w-64 bg-white border-r p-6">
        <h2 className="text-xl font-semibold text-blue-600 mb-8">Mentor × Match</h2>
        <nav className="space-y-4">
          <Link to="/dashboard" className="block text-gray-700 hover:text-blue-500">Dashboard</Link>
          <Link to="/dashboard/mentors" className="block text-gray-700 hover:text-blue-500">Find Mentors</Link>
          <Link to="/dashboard/requests" className="block text-blue-500 font-semibold">My Requests</Link>
          <Link to="/dashboard/sessions" className="block text-gray-700 hover:text-blue-500">My Sessions</Link>
        </nav>
      </aside>

      <main className="flex-1 p-8">
        <h1 className="text-2xl font-bold mb-6">My Requests</h1>
        {loading ? (
          <p className="text-sm text-gray-400">Loading your requests...</p>
        ) : requests.length === 0 ? (
          <p className="text-sm text-gray-400">You haven't sent any mentorship requests yet.</p>
        ) : (
          <div className="space-y-4">
            {requests.map((req) => (
              <div key={req._id} className="p-4 bg-white rounded shadow border">
                <h3 className="font-semibold text-lg">
                  {req.mentorId?.firstName} {req.mentorId?.lastName}
                </h3>
                <p className="text-sm text-gray-600 mt-1">{req.message}</p>
                <p className="text-xs text-gray-500 mt-2">Status: <span className={`font-medium ${req.status === 'accepted' ? 'text-green-600' : req.status === 'rejected' ? 'text-red-600' : 'text-yellow-600'}`}>{req.status.toUpperCase()}</span></p>
                <p className="text-xs text-gray-400 mt-1">Requested on: {new Date(req.createdAt).toLocaleString()}</p>
              </div>
            ))}
          </div>
        )}
      </main>
    </div>
  );
};

export default MyRequests;
