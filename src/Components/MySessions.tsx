import React, { useEffect, useState } from 'react';
import axios from '../api/axiosInstance';
import SessionFeedback from './SessionFeedback';

const MySessions: React.FC = () => {
  const [sessions, setSessions] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  const fetchSessions = async () => {
    try {
      const menteeRes = await axios.get('/sessions/mentee');
      setSessions(menteeRes.data.sessions);
    } catch {
      try {
        const mentorRes = await axios.get('/sessions/mentor');
        setSessions(mentorRes.data.sessions);
      } catch (err) {
        console.error('Error loading sessions', err);
      }
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchSessions();
  }, []);

  return (
    <div>
      <h2 className="text-xl font-bold mb-4">My Sessions</h2>
      {loading ? (
        <p className="text-sm text-gray-400">Loading sessions...</p>
      ) : sessions.length === 0 ? (
        <p className="text-sm text-gray-400">No sessions found.</p>
      ) : (
        <div className="space-y-4">
          {sessions.map((session) => (
            <div key={session._id} className="bg-white p-4 rounded shadow border">
              <h3 className="font-semibold">
                {session.mentorId
                  ? `Mentor: ${session.mentorId.firstName} ${session.mentorId.lastName}`
                  : `Mentee: ${session.menteeId.firstName} ${session.menteeId.lastName}`}
              </h3>
              <p className="text-sm text-gray-600">
                Date: {new Date(session.scheduledAt).toLocaleString()}
              </p>
              <p className="text-sm text-gray-500">Duration: {session.duration} mins</p>
              {session.feedback && (
                <p className="text-xs text-green-600 mt-1">
                  Feedback: {session.feedback.comment}
                </p>
              )} 
         <SessionFeedback sessionId={session._id} />

            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default MySessions;