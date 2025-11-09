import React, { useState, useEffect } from "react";

export default function IncidentListSidebar({ user, incidents, onSelect, selected, onCreate }) {
  const [filtered, setFiltered] = useState([]);
  const [search, setSearch] = useState("");
  const [filters, setFilters] = useState({ status: "" });
  console.log(user)

  useEffect(() => {
    if (!user || !incidents) return;

    const result = incidents.filter((i) => {
      if (user.level === "zonal" && i.zone !== user.zone) return false;
      if (user.level === "state" && i.state !== user.state) return false;
      if (user.level === "agent" && i.state !== user.state) return false;

      const matchSearch = i.title?.toLowerCase().includes(search.toLowerCase());
      const matchStatus = filters.status
        ? i.status?.toLowerCase() === filters.status.toLowerCase()
        : true;

      return matchSearch && matchStatus;
    });

    setFiltered(result);
  }, [user, incidents, search, filters]);

  return (
    <div className="w-1/3 border-r border-gray-300 bg-gray-50 flex flex-col">
      {/* Header / Filters */}
      <div className="flex justify-between items-center p-4 border-b bg-white">
        <input
          type="text"
          placeholder="Search incident"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="border border-gray-300 rounded-md px-3 py-1 w-2/3"
        />
        {user.level === "state" && (
          <button
            onClick={onCreate}
            className="bg-yellow-400 hover:bg-yellow-500 text-black font-semibold px-3 py-1 rounded-md"
          >
            + New
          </button>
        )}
      </div>

      {/* Incident List */}
      <div className="overflow-y-auto flex-1">
        {filtered.length > 0 ? (
          filtered.map((i) => (
            <div
              key={i._id}
              onClick={() => onSelect(i)}
              className={`p-4 border-b cursor-pointer hover:bg-yellow-100 ${
                selected?._id === i._id ? "bg-yellow-200" : ""
              }`}
            >
              <h3 className="font-semibold text-black">{i.title}</h3>
              <p className="text-sm text-gray-600">{i.zone} • {i.state}</p>
              <p className="text-xs text-gray-500">{i.status}</p>
            </div>
          ))
        ) : (
          <p className="p-4 text-gray-500 italic">No incidents found</p>
        )}
      </div>
    </div>
  );
}
