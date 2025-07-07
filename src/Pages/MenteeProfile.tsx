 import React, { useState } from "react";
 import MentorSearch from "../Components/MentorSearch";
 import MyRequests from "../Components/MyRequests";
 import MySessions from "../Components/MySessions";
  import MyProfile from "../Components/MyProfile";
 

const tabs = ["Browse", "Requests", "Sessions", "Profile"] as const;

const MenteeProfile = () => {
  const [activeTab, setActiveTab] = useState<typeof tabs[number]>("Browse");

  const renderTab = () => {
    switch (activeTab) {
      case "Browse":
        return <MentorSearch />;
      case "Requests":
        return <MyRequests />;
      case "Sessions":
        return <MySessions />;
      case "Profile":
        return <MyProfile />;
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 p-6">
      <h1 className="text-2xl font-bold mb-4">Mentee Dashboard</h1>
      <div className="flex gap-2 mb-6">
        {tabs.map((tab) => (
          <button
            key={tab}
            onClick={() => setActiveTab(tab)}
            className={`px-4 py-2 rounded-full ${
              activeTab === tab ? "bg-blue-600 text-white" : "bg-white text-blue-600 border"
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

export default MenteeProfile;
