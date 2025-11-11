import React, { useState, useEffect, useMemo } from "react";
import axios from "axios";

export default function IncidentMembers({ incidentId, currentUser }) {
  const [members, setMembers] = useState([]);
  const [search, setSearch] = useState("");

  const fetchMembers = async () => {
    try {
      const res = await axios.get(`/api/incidents/${incidentId}/members`);
      if (res.data.success) setMembers(res.data.data);
    } catch (err) {
      console.error("Failed to fetch members:", err);
    }
  };

  useEffect(() => {
    fetchMembers();
  }, [incidentId]);

  const handleDelete = async (memberId) => {
    if (!window.confirm("Are you sure you want to remove this member?")) return;
    try {
      const res = await axios.delete(`/api/incidents/${incidentId}/members/${memberId}`);
      if (res.data.success) setMembers(res.data.data);
    } catch (err) {
      console.error("Failed to delete member:", err);
    }
  };

  const handlePromote = async (memberId) => {
    try {
      const res = await axios.patch(`/api/incidents/${incidentId}/members/${memberId}/promote`);
      if (res.data.success) setMembers(res.data.data);
    } catch (err) {
      console.error("Failed to promote member:", err);
    }
  };

  const filteredMembers = useMemo(() => {
    if (!search.trim()) return members;
    const lower = search.toLowerCase();
    return members.filter(
      (m) =>
        m.name?.toLowerCase().includes(lower) ||
        m.email?.toLowerCase().includes(lower)
    );
  }, [members, search]);

  return (
    <div className="p-4 bg-gray-50 rounded shadow flex flex-col gap-4">
      <input
        type="text"
        placeholder="Search members..."
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        className="border border-gray-300 rounded px-3 py-2 mb-3"
      />

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {filteredMembers.length > 0 ? (
          filteredMembers.map((m) => {
            const isAdmin = m.roles?.includes("admin");

            return (
              <div
                key={m._id}
                className="border p-4 rounded shadow bg-white flex flex-col justify-between"
              >
                <div>
                  <p className="font-semibold text-indigo-900">
                    {m.name}{" "}
                    {isAdmin && (
                      <span className="text-xs bg-green-200 text-green-800 px-2 py-0.5 rounded ml-1">
                        Admin
                      </span>
                    )}
                  </p>
                  <p className="text-gray-700 text-sm">{m.email}</p>
                  <p className="text-gray-500 text-xs">{m.role || "Member"}</p>
                </div>

                {currentUser.roles?.includes("admin") && !isAdmin && (
                  <div className="flex gap-2 mt-2">
                    <button
                      onClick={() => handlePromote(m._id)}
                      className="bg-yellow-400 hover:bg-yellow-500 text-black px-2 py-1 rounded text-sm"
                    >
                      Promote
                    </button>
                    <button
                      onClick={() => handleDelete(m._id)}
                      className="bg-red-500 hover:bg-red-600 text-white px-2 py-1 rounded text-sm"
                    >
                      Delete
                    </button>
                  </div>
                )}
              </div>
            );
          })
        ) : (
          <p className="text-gray-500 italic col-span-full">No members found.</p>
        )}
      </div>
    </div>
  );
}
