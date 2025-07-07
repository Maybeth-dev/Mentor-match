 import React, { useEffect, useState } from "react";
import axios from "../api/axiosInstance";
import { User } from "../types/User";

const MentorSearch= () => {
  const [mentors, setMentors] = useState<User[]>([]);
  const [loading, setLoading  ] = useState(true);
  const [requesting, setRequesting] = useState<string | null>(null);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchMentors = async () => {
      try {
        const res = await axios.get("/users");
        const filtered = res.data.users.filter((user: User) => user.role === "mentor");
        setMentors(filtered);
      } catch (err) {
        console.error("Error fetching mentors", err);
        setError("Could not load mentors.");
      } finally {
        setLoading(false);
      }
    };

    fetchMentors();
  }, []);

  const sendRequest = async (mentorId: string) => {
    try {
      setRequesting(mentorId);
      await axios.post("/requests", { mentorId });
      alert("Mentorship request sent!");
    } catch (err) {
      console.error("Request failed", err);
      alert("Failed to send request.");
    } finally {
      setRequesting(null);
    }
  };

  if (loading) return <p className="text-center">Loading mentors...</p>;
  if (error) return <p className="text-center text-red-500">{error}</p>;

  return (
    <div>
      <h2 className="text-xl font-semibold mb-4">Browse Mentors</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {mentors.map((mentor) => (
          <div key={mentor._id} className="bg-white p-4 rounded shadow">
            <h3 className="text-lg font-bold">{mentor.firstName} {mentor.lastName}</h3>
            <p className="text-sm text-gray-600 mb-2">{mentor.bio || "No bio yet."}</p>
            {mentor.skills?.length && (
              <p className="text-xs text-gray-500 mb-2">Skills: {mentor.skills.join(", ")}</p>
            )}
            <button
              onClick={() => sendRequest(mentor._id)}
              disabled={requesting === mentor._id}
              className="mt-2 bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
            >
              {requesting === mentor._id ? "Sending..." : "Request Mentorship"}
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default MentorSearch;
