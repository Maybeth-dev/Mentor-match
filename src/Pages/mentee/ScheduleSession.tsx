import React, { useState } from 'react';
import axios from '../../api/axiosInstance';
import { useNavigate } from 'react-router-dom';

const ScheduleSession: React.FC = () => {
  const [mentorId, setMentorId] = useState('');
  const [scheduledAt, setScheduledAt] = useState('');
  const [duration, setDuration] = useState(30);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setSuccess('');

    if (!mentorId || !scheduledAt) {
      setError('Please provide both mentor ID and date/time.');
      return;
    }

    try {
      const res = await axios.post('/sessions', {
        mentorId,
        scheduledAt,
        duration,
      });

      setSuccess('Session scheduled successfully!');
      setTimeout(() => navigate('/dashboard/sessions'), 1000);
    } catch (err: any) {
      setError(
        err?.response?.data?.message || 'Something went wrong. Try again.'
      );
    }
  };

  return (
    <div className="max-w-md mx-auto mt-10 p-6 bg-white rounded shadow">
      <h2 className="text-2xl font-bold mb-4">Schedule a Session</h2>
      {error && <p className="text-red-600 text-sm mb-2">{error}</p>}
      {success && <p className="text-green-600 text-sm mb-2">{success}</p>}
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block text-sm mb-1">Mentor ID</label>
          <input
            type="text"
            value={mentorId}
            onChange={(e) => setMentorId(e.target.value)}
            className="w-full border px-3 py-2 rounded"
            placeholder="Enter Mentor ID"
          />
        </div>
        <div>
          <label className="block text-sm mb-1">Date & Time</label>
          <input
            type="datetime-local"
            value={scheduledAt}
            onChange={(e) => setScheduledAt(e.target.value)}
            className="w-full border px-3 py-2 rounded"
          />
        </div>
        <div>
          <label className="block text-sm mb-1">Duration (minutes)</label>
          <input
            type="number"
            value={duration}
            onChange={(e) => setDuration(parseInt(e.target.value))}
            className="w-full border px-3 py-2 rounded"
          />
        </div>
        <button
          type="submit"
          className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded w-full"
        >
          Schedule
        </button>
      </form>
    </div>
  );
};

export default ScheduleSession;
