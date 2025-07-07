 import React, { useEffect, useState } from 'react'; 
 import axios from '../../api/axiosInstance';
import { Link } from 'react-router-dom';

const IncomingRequests: React.FC = () => {
  const [requests, setRequests] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  const fetchRequests = async () => {
    try {
      const res = await axios.get('/requests/received');
      setRequests(res.data.requests);
    } catch (err) {
      console.error('Error loading incoming requests', err);
    } finally {
      setLoading(false);
    }
  };

  const updateStatus = async (id: string, status: string) => {
    try {
      await axios.put(`/requests/${id}`, { status });
      fetchRequests();
    } catch (err) {
      alert('Could not update request');
    }
  };

  useEffect(() => {
    fetchRequests();
  }, []);

  return (
    <div className="min-h-screen flex bg-gray-50">
      <aside className="w-64 bg-white border-r p-6">
        <h2 className="text-xl font-semibold text-blue-600 mb-8">Mentor × Match</h2>
        <nav className="space-y-4">
          <Link to="/dashboard" className="block text-gray-700 hover:text-blue-500">Dashboard</Link>
          <Link to="/dashboard/requests" className="block text-blue-500 font-semibold">Incoming Requests</Link>
          <Link to="/dashboard/sessions" className="block text-gray-700 hover:text-blue-500">My Sessions</Link>
        </nav>
      </aside>

      <main className="flex-1 p-8">
        <h1 className="text-2xl font-bold mb-6">Incoming Mentorship Requests</h1>
        {loading ? (
          <p className="text-sm text-gray-400">Loading...</p>
        ) : requests.length === 0 ? (
          <p className="text-sm text-gray-400">No incoming requests yet.</p>
        ) : (
          <div className="space-y-4">
            {requests.map((req) => (
              <div key={req._id} className="p-4 bg-white rounded shadow border">
                <h3 className="text-lg font-semibold">
                  {req.menteeId?.firstName} {req.menteeId?.lastName}
                </h3>
                <p className="text-sm text-gray-600 mt-1">{req.message}</p>
                <p className="text-xs text-gray-500 mt-2">Status: {req.status.toUpperCase()}</p>
                <div className="mt-2 space-x-2">
                  <button onClick={() => updateStatus(req._id, 'accepted')} className="bg-green-600 text-white px-3 py-1 rounded">Accept</button>
                  <button onClick={() => updateStatus(req._id, 'rejected')} className="bg-red-600 text-white px-3 py-1 rounded">Reject</button>
                </div>
              </div>
            ))}
          </div>
        )}
      </main>
    </div>
  );
};

export default IncomingRequests;
