import React, { useState } from "react";
import InfoTab from "./tabs/InfoTab";
import BriefsTab from "./tabs/BriefsTab";
import ReportingTab from "./tabs/ReportingTab";
import MembersTab from "./tabs/MembersTab";
import SettingsTab from "./tabs/SettingsTab";

export default function IncidentModal({ incident, user, onClose }) {
  const [activeTab, setActiveTab] = useState("info");

  const allowedTabs = (() => {
    if (!user) return ["info"];

    switch (user.level) {
      case "central":
        return ["info", "briefs", "reporting", "members", "settings"];
      case "state":
        return ["info", "briefs", "reporting", "members", "settings"];
      case "zone":
        return ["info", "briefs"];
      case "agent":
        return ["info"];
      default:
        return ["info"];
    }
  })();

  return (
    <div className="bg-white rounded-lg shadow p-2 flex flex-col h-full ">
      {/* Header */}
      <div className="flex justify-between items-center  pb-2 mb-4">
        <h2 className="text-xl font-bold text-black">{incident.title}</h2>
      </div>

      {/* Tabs */}
      <div className="flex mb-4 overflow-x-auto">
        {allowedTabs.map((t) => (
          <button
            key={t}
            onClick={() => setActiveTab(t)}
            className={`px-4 py-2 font-semibold whitespace-nowrap ${
              activeTab === t ? "border-b-2 border-yellow-400 text-black" : "text-gray-500"
            }`}
          >
            {t.charAt(0).toUpperCase() + t.slice(1)}
          </button>
        ))}
      </div>

      {/* Tab Content */}
      <div className="flex-1 overflow-y-auto">
        {activeTab === "info" && <InfoTab incident={incident} />}
        {activeTab === "briefs" && <BriefsTab incident={incident} />}
        {activeTab === "reporting" && <ReportingTab incident={incident} />}
        {activeTab === "members" && <MembersTab incident={incident} />}
        {activeTab === "settings" && <SettingsTab incident={incident} />}
      </div>
    </div>
  );
}
