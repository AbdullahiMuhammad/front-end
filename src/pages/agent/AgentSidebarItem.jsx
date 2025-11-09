import React from "react";

export default function AgentSidebarItem({ agent, active, onClick }) {
  return (
    <button
      onClick={onClick}
      className={`w-full flex items-center gap-3 p-3 rounded-lg transition ${
        active ? "bg-yellow-400 text-black" : "hover:bg-gray-100"
      }`}
    >
      {agent.profile ? (
        <img
          src={agent.profile}
          alt="Profile"
          className="w-10 h-10 rounded-full"
        />
      ) : (
        <div className="w-10 h-10 bg-green-600 text-white flex items-center justify-center rounded-full font-bold">
          {agent.firstName?.[0]?.toUpperCase() || "A"}
        </div>
      )}
      <div className="flex-1 text-left">
        <p className="font-semibold text-sm">
          {agent.firstName} {agent.lastName}
        </p>
        <p className="text-xs text-gray-600 truncate">{agent.email}</p>
      </div>
    </button>
  );
}
