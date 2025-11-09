import React from "react";

export default function AgentInfoModal({ agent, onClose }) {
  if (!agent) return null;

  return (
    <div className="fixed inset-0 bg-black/40 backdrop-blur-sm flex justify-center items-center z-50 p-4">
      <div className="bg-white rounded-xl shadow-lg max-w-md w-full p-6 relative">
        {/* Close button */}
        <button
          onClick={onClose}
          className="absolute top-3 right-3 text-gray-600 hover:text-black"
        >
          ✕
        </button>

        {/* Profile */}
        <div className="flex flex-col items-center mb-4">
          {agent.profile ? (
            <img
              src={agent.profile}
              alt="Profile"
              className="w-20 h-20 rounded-full mb-3"
            />
          ) : (
            <div className="w-20 h-20 bg-green-600 text-white flex items-center justify-center rounded-full text-3xl font-bold mb-3">
              {agent.firstName?.[0]?.toUpperCase() || "A"}
            </div>
          )}
          <h2 className="text-xl font-bold text-black">
            {agent.firstName} {agent.lastName}
          </h2>
          <span
            className={`mt-1 px-3 py-1 text-xs rounded-full font-semibold ${
              agent.designation === "central"
                ? "bg-black text-white"
                : agent.designation === "zone"
                ? "bg-green-600 text-white"
                : agent.designation === "state"
                ? "bg-yellow-400 text-black"
                : "bg-gray-300 text-black"
            }`}
          >
            {agent.designation}
          </span>
        </div>

        {/* Info */}
        <div className="space-y-2 text-gray-700">
          <p>
            <b>Email:</b> {agent.email || "N/A"}
          </p>
          <p>
            <b>Zone:</b> {agent.zone || "N/A"}
          </p>
          <p>
            <b>State:</b> {agent.state || "N/A"}
          </p>
          <p>
            <b>Local Government:</b> {agent.localGovernment || "N/A"}
          </p>
          <p>
            <b>Phone:</b> {agent.phone || "N/A"}
          </p>
        </div>
      </div>
    </div>
  );
}
