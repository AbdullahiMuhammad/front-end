import React from "react";

export default function AgentTableView({ agents, editing, handleLevelUpdate }) {
  return (
    <div className="overflow-x-auto">
      <table className="w-full border border-gray-300 rounded-md">
        <thead className="bg-gray-100">
          <tr>
            <th className="text-left p-3">Profile</th>
            <th className="text-left p-3">Full Name</th>
            <th className="text-left p-3">Zone</th>
            <th className="text-left p-3">State</th>
            <th className="text-left p-3">LGA</th>
            <th className="text-left p-3">Level</th>
          </tr>
        </thead>
        <tbody>
          {agents.map((a) => (
            <tr key={a._id} className="border-t hover:bg-gray-50">
              <td className="p-3">
                {a.profile ? (
                  <img src={a.profile} alt="Profile" className="w-9 h-9 rounded-full" />
                ) : (
                  <div className="w-9 h-9 bg-green-600 text-white flex items-center justify-center rounded-full font-bold">
                    {a.firstName?.[0]?.toUpperCase() || "A"}
                  </div>
                )}
              </td>
              <td className="p-3 font-medium">
                {a.firstName} {a.lastName}
              </td>
              <td className="p-3">{a.zone || "—"}</td>
              <td className="p-3">{a.state || "—"}</td>
              <td className="p-3">{a.localGovernment || "—"}</td>
              <td className="p-3">
                {editing ? (
                  <select
                    value={a.designation}
                    onChange={(e) => handleLevelUpdate(a._id, e.target.value)}
                    className="border border-gray-300 rounded-md p-1 text-sm"
                  >
                    <option value="central">Central</option>
                    <option value="zone">Zone</option>
                    <option value="state">State</option>
                    <option value="local">Local</option>
                  </select>
                ) : (
                  <span
                    className={`px-3 py-1 rounded-full text-xs font-semibold ${
                      a.designation === "central"
                        ? "bg-black text-white"
                        : a.designation === "zone"
                        ? "bg-green-600 text-white"
                        : a.designation === "state"
                        ? "bg-yellow-400 text-black"
                        : "bg-gray-300 text-black"
                    }`}
                  >
                    {a.designation}
                  </span>
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
