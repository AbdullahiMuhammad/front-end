import React, { useState } from "react";

export default function IncidentSettings({ incident, currentUser, onUpdate }) {
  const [confidentiality, setConfidentiality] = useState(incident.confidentiality || "Restricted");
  const [notificationsEnabled, setNotificationsEnabled] = useState(incident.notificationsEnabled ?? true);
  const [members, setMembers] = useState(incident.members || []);
  const [searchMember, setSearchMember] = useState("");

  // Filter members by search
  const filteredMembers = members.filter((m) =>
    m.userName?.toLowerCase().includes(searchMember.toLowerCase()) ||
    m.email?.toLowerCase().includes(searchMember.toLowerCase())
  );

  const handleRemoveMember = (userId) => {
    if (userId === incident.createdBy) return alert("Cannot remove the admin!");
    const updated = members.filter((m) => m.userId !== userId);
    setMembers(updated);
    onUpdate?.({ members: updated });
  };

  const handleAssignInspector = (user) => {
    if (members.some((m) => m.userId === user.userId)) return;
    const updated = [...members, { ...user, role: "Inspector", canView: true, canEdit: true }];
    setMembers(updated);
    onUpdate?.({ members: updated });
  };

  const handleSaveSettings = () => {
    onUpdate?.({ confidentiality, notificationsEnabled, members });
    alert("Settings updated!");
  };

  return (
    <div className="space-y-6 p-4 md:p-6 bg-white rounded shadow-md">
      <h2 className="text-xl font-bold text-black border-b border-gray-200 pb-2 mb-4">
        Incident Settings
      </h2>

      {/* Confidentiality */}
      <div className="flex items-center gap-4">
        <label className="font-semibold text-black">Confidentiality:</label>
        <select
          value={confidentiality}
          onChange={(e) => setConfidentiality(e.target.value)}
          className="border border-black rounded px-2 py-1 text-black"
        >
          <option value="Public">Public</option>
          <option value="Restricted">Restricted</option>
          <option value="Confidential">Confidential</option>
        </select>
      </div>

      {/* Notifications */}
      <div className="flex items-center gap-2">
        <label className="font-semibold text-black">Notifications:</label>
        <input
          type="checkbox"
          checked={notificationsEnabled}
          onChange={(e) => setNotificationsEnabled(e.target.checked)}
          className="w-5 h-5 accent-green-600"
        />
      </div>

      {/* Members */}
      <div>
        <label className="font-semibold text-black">Members:</label>
        <input
          type="text"
          placeholder="Search members..."
          value={searchMember}
          onChange={(e) => setSearchMember(e.target.value)}
          className="ml-2 border border-black px-2 py-1 rounded w-full md:w-64 text-black"
        />

        <div className="mt-2 space-y-2 max-h-64 overflow-y-auto">
          {filteredMembers.map((m) => (
            <div
              key={m.userId}
              className={`flex justify-between items-center border rounded p-2 ${
                m.userId === incident.createdBy ? "bg-green-100" : "bg-yellow-50"
              }`}
            >
              <div>
                <p className="font-semibold text-black">{m.userName}</p>
                <p className="text-sm text-black">{m.email} • {m.role}</p>
              </div>
              {m.userId !== incident.createdBy && (
                <button
                  onClick={() => handleRemoveMember(m.userId)}
                  className="text-red-600 hover:text-red-800 font-semibold"
                >
                  Remove
                </button>
              )}
            </div>
          ))}
          {filteredMembers.length === 0 && (
            <p className="italic text-gray-600 mt-2">No members found</p>
          )}
        </div>

        {/* Assign Inspector Example */}
        <button
          onClick={() =>
            handleAssignInspector({
              userId: "123",
              userName: "New Inspector",
              email: "inspector@example.com",
            })
          }
          className="mt-3 bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded font-semibold"
        >
          Assign New Inspector
        </button>
      </div>

      {/* Save Button */}
      <div>
        <button
          onClick={handleSaveSettings}
          className="bg-black hover:bg-gray-800 text-white px-4 py-2 rounded font-semibold"
        >
          Save Settings
        </button>
      </div>
    </div>
  );
}
