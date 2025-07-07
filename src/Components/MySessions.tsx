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












// import React, { useEffect, useState } from 'react';
// import axios from '../api/axiosInstance';
// import { Link } from 'react-router-dom';

// const MySessions: React.FC = () => {
//   const [sessions, setSessions] = useState<any[]>([]);
//   const [loading, setLoading] = useState(true);

//   const fetchSessions = async () => {
//     try {
//       const res = await axios.get('/sessions/mentee');
//       setSessions(res.data.sessions);
//     } catch (err) {
//       try {
//         const res = await axios.get('/sessions/mentor');
//         setSessions(res.data.sessions);
//       } catch (err2) {
//         console.error('Error loading sessions');
//       }
//     } finally {
//       setLoading(false);
//     }
//   };

//   useEffect(() => {
//     fetchSessions();
//   }, []);

//   return (
//     <div className="min-h-screen flex bg-gray-50">
//       <aside className="w-64 bg-white border-r p-6">
//         <h2 className="text-xl font-semibold text-blue-600 mb-8">Mentor × Match</h2>
//         <nav className="space-y-4">
//           <Link to="/dashboard" className="block text-gray-700 hover:text-blue-500">Dashboard</Link>
//           <Link to="/dashboard/mentors" className="block text-gray-700 hover:text-blue-500">Find Mentors</Link>
//           <Link to="/dashboard/requests" className="block text-gray-700 hover:text-blue-500">My Requests</Link>
//           <Link to="/dashboard/sessions" className="block text-blue-500 font-semibold">My Sessions</Link>
//         </nav>
//       </aside>

//       <main className="flex-1 p-8">
//         <h1 className="text-2xl font-bold mb-6">Scheduled Sessions</h1>
//         {loading ? (
//           <p className="text-sm text-gray-400">Loading sessions...</p>
//         ) : sessions.length === 0 ? (
//           <p className="text-sm text-gray-400">No sessions found.</p>
//         ) : (
//           <div className="space-y-4">
//             {sessions.map((session) => (
//               <div key={session._id} className="p-4 bg-white rounded shadow border">
//                 <h3 className="text-lg font-semibold">
//                   {session.mentorId ? (
//                     <>Mentor: {session.mentorId.firstName} {session.mentorId.lastName}</>
//                   ) : (
//                     <>Mentee: {session.menteeId.firstName} {session.menteeId.lastName}</>
//                   )}
//                 </h3>
//                 <p className="text-sm text-gray-600">Scheduled: {new Date(session.scheduledAt).toLocaleString()}</p>
//                 <p className="text-sm text-gray-500">Duration: {session.duration} mins</p>
//                 {session.feedback && (
//                   <p className="text-xs text-green-600 mt-2">Feedback: {session.feedback.comment}</p>
//                 )}
//               </div>
//             ))}
//           </div>
//         )}
//       </main>
//     </div>
//   );
// };

// export default MySessions;
