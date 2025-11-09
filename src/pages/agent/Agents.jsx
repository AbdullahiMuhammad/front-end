import { useEffect, useState } from "react";
import {  updateLevel } from "../../services/user";
import { toast } from "react-hot-toast";
import { useSelector } from "react-redux";
import AgentTableView from "./AgentTableView";
import AgentListView from "./AgentListView";




export default function Agents() {
  const [user, setUser] = useState(null);
  const { users } = useSelector((state) => state.user);
  const [filtered, setFiltered] = useState([]);
  const [search, setSearch] = useState("");
  const [filters, setFilters] = useState({ zone: "", state: "" });
  const [editing, setEditing] = useState(false);
  const [view, setView] = useState("table");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!users || !Array.isArray(users)) return;

    const result = users.filter((a) => {
      const matchSearch =
        a.firstName?.toLowerCase().includes(search.toLowerCase()) ||
        a.lastName?.toLowerCase().includes(search.toLowerCase()) ||
        a.email?.toLowerCase().includes(search.toLowerCase());

      const matchZone = filters.zone
        ? a.zone?.toLowerCase() === filters.zone.toLowerCase()
        : true;
      const matchState = filters.state
        ? a.state?.toLowerCase() === filters.state.toLowerCase()
        : true;

      return matchSearch && matchZone && matchState;
    });

    setFiltered(result);
    setLoading(false);
  }, [search, filters, users]);

  const handleLevelUpdate = async (id, newDesignation) => {
    if (!editing || !user) return;

    const canUpdate =
      user.designation === "central" ||
      (user.designation === "zone" && !["central"].includes(newDesignation));

    if (!canUpdate) {
      toast.error("You don't have permission to update this level");
      return;
    }

    const res = await updateLevel(id, newDesignation);
    if (res.success) {
      toast.success(res.message);
      setFiltered((prev) =>
        prev.map((a) =>
          a._id === id ? { ...a, level: newDesignation } : a
        )
      );
    } else {
      toast.error(res.message);
    }
  };

  if (loading)
    return (
      <div className="flex justify-center items-center h-64 text-gray-500">
        Loading agents...
      </div>
    );

  return (
    <div className="p-6 text-black bg-white min-h-screen">
      {/* Header */}
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold text-black mb-6">Agents</h1>
        <select
          value={view}
          onChange={(e) => setView(e.target.value)}
          className="border border-gray-300 rounded-md px-3 py-2 focus:outline-none"
        >
          <option value="table">Table View</option>
          <option value="list">List View</option>
        </select>
      </div>

      {/* Filters */}
      <div className="flex flex-wrap gap-3 mb-5">
        <input
          type="text"
          placeholder="Search by name or email"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="border border-gray-300 rounded-md px-3 py-2 w-full md:w-1/3 focus:outline-none"
        />
        {user?.designation === "central" && (
          <input
            type="text"
            placeholder="Filter by Zone"
            value={filters.zone}
            onChange={(e) => setFilters({ ...filters, zone: e.target.value })}
            className="border border-gray-300 rounded-md px-3 py-2 w-full md:w-1/4 focus:outline-none"
          />
        )}
        {(user?.designation === "central" || user?.designation === "zone") && (
          <input
            type="text"
            placeholder="Filter by State"
            value={filters.state}
            onChange={(e) => setFilters({ ...filters, state: e.target.value })}
            className="border border-gray-300 rounded-md px-3 py-2 w-full md:w-1/4 focus:outline-none"
          />
        )}

        <button
          onClick={() => setEditing(!editing)}
          className={`px-4 py-2 rounded-md font-semibold ${
            editing
              ? "bg-black text-white"
              : "bg-yellow-400 text-black hover:bg-yellow-500"
          }`}
        >
          {editing ? "Exit Edit Mode" : "Edit Levels"}
        </button>
      </div>

      {/* Views */}
      {view === "table" ? (
        <AgentTableView
          agents={filtered}
          editing={editing}
          handleLevelUpdate={handleLevelUpdate}
        />
      ) : (
        <AgentListView agents={filtered} />
      )}
    </div>
  );
}
