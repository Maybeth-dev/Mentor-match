 import React, { useState } from "react";

const tabs = ["Requests", "Mentees", "Sessions", "Profile", "Schedule"] as const;

const MentorProfile = () => {
  const [activeTab, setActiveTab] = useState<typeof tabs[number]>("Requests");

  const renderTab = () => {
    switch (activeTab) {
      case "Requests":
        return <p>Incoming mentorship requests...</p>;
      case "Mentees":
        return <p>List of accepted mentees...</p>;
      case "Sessions":
        return <p>Session schedule here...</p>;
      case "Profile":
        return <p>Mentor profile form goes here...</p>;
      case "Schedule":
        return <p>Availability setting UI...</p>;
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 p-6">
      <h1 className="text-2xl font-bold mb-4">Mentor Dashboard</h1>
      <div className="flex gap-2 mb-6">
        {tabs.map((tab) => (
          <button
            key={tab}
            onClick={() => setActiveTab(tab)}
            className={`px-4 py-2 rounded-full ${
              activeTab === tab ? "bg-purple-600 text-white" : "bg-white text-purple-600 border"
            }`}
          >
            {tab}
          </button>
        ))}
      </div>
      <div>{renderTab()}</div>
    </div>
  );
};

export default MentorProfile;
