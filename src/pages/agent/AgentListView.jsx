import React, { useState } from "react";
import AgentSidebarItem from "./AgentSidebarItem";
import AgentInfoModal from "./AgentInfoModal";

export default function AgentListView({ agents }) {
  const [selectedAgent, setSelectedAgent] = useState(null);

  return (
    <div className="flex flex-col md:flex-row border border-gray-300 rounded-lg overflow-hidden bg-white shadow-sm">
      {/* Sidebar */}
      <aside className="md:w-1/3 w-full border-b md:border-b-0 md:border-r border-gray-200 bg-gray-50">
        <div className="max-h-[75vh] overflow-y-auto p-2">
          {agents.map((agent) => (
            <AgentSidebarItem
              key={agent._id}
              agent={agent}
              active={selectedAgent?._id === agent._id}
              onClick={() => setSelectedAgent(agent)}
            />
          ))}
          {agents.length === 0 && (
            <p className="text-gray-500 text-sm text-center py-6">
              No agents found.
            </p>
          )}
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 p-6 flex justify-center items-center bg-white">
        {selectedAgent ? (
          <div className="max-w-md text-center">
            <div className="flex flex-col items-center">
              {selectedAgent.profile ? (
                <img
                  src={selectedAgent.profile}
                  alt="Profile"
                  className="w-20 h-20 rounded-full mb-3"
                />
              ) : (
                <div className="w-20 h-20 bg-green-600 text-white rounded-full flex items-center justify-center text-3xl font-bold mb-3">
                  {selectedAgent.firstName?.[0]?.toUpperCase() || "A"}
                </div>
              )}
              <h3 className="text-xl font-bold text-black mb-1">
                {selectedAgent.firstName} {selectedAgent.lastName}
              </h3>
              <p className="text-gray-600 mb-3">{selectedAgent.email}</p>
              <span
                className={`px-3 py-1 text-xs rounded-full font-semibold ${
                  selectedAgent.designation === "central"
                    ? "bg-black text-white"
                    : selectedAgent.designation === "zone"
                    ? "bg-green-600 text-white"
                    : selectedAgent.designation === "state"
                    ? "bg-yellow-400 text-black"
                    : "bg-gray-300 text-black"
                }`}
              >
                {selectedAgent.designation}
              </span>
            </div>

            <button
              onClick={() => setSelectedAgent(null)}
              className="mt-5 bg-black text-white px-4 py-2 rounded-md hover:bg-gray-800 transition"
            >
              Close
            </button>
          </div>
        ) : (
          <p className="text-gray-500">Select an agent from the list.</p>
        )}
      </main>

      {/* Modal for mobile view */}
      {selectedAgent && (
        <div className="md:hidden">
          <AgentInfoModal
            agent={selectedAgent}
            onClose={() => setSelectedAgent(null)}
          />
        </div>
      )}
    </div>
  );
}
