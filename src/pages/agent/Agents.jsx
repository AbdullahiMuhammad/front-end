import { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { toast } from "react-hot-toast";
import { updateLevel } from "../../services/user";
import AgentTableView from "./AgentTableView";
import AgentListView from "./AgentListView";
import { setUsers } from "../../component/redux/userSlice"; // update Redux

export default function Agents() {
  const dispatch = useDispatch();
  const users = useSelector((state) => state.user.users);
  const currentUser = useSelector((state) => state.user.currentUser); 
  const [filtered, setFiltered] = useState([]);
  const [search, setSearch] = useState("");
  const [filters, setFilters] = useState({ zone: "", state: "" });
  const [editing, setEditing] = useState(false);
  const [view, setView] = useState("table");
  const [loading, setLoading] = useState(true);

  // Filter users
  useEffect(() => {
    if (!users || !Array.isArray(users)) return;
    const result = users.filter((a) => {
      const matchSearch =
        a.firstName?.toLowerCase().includes(search.toLowerCase()) ||
        a.lastName?.toLowerCase().includes(search.toLowerCase()) ||
        a.email?.toLowerCase().includes(search.toLowerCase());

      const matchZone = filters.zone
        ? a.zone?.toLowerCase().includes(filters.zone.toLowerCase())
        : true;
      const matchState = filters.state
        ? a.state?.toLowerCase().includes(filters.state.toLowerCase())
        : true;

      return matchSearch && matchZone && matchState;
    });

    setFiltered(result);
    setLoading(false);
  }, [search, filters, users]);

  // Update user level
  const handleLevelUpdate = async (id, newLevel) => {
    if (!editing) return;

    // Only Admin can update levels
    if (currentUser?.level !== 4) {
      toast.error("You don't have permission to update this level");
      return;
    }

    // Optimistic update
    const previousState = [...filtered];
    setFiltered((prev) =>
      prev.map((a) => (a._id === id ? { ...a, level: newLevel } : a))
    );
    dispatch(
      setUsers(users.map((u) => (u._id === id ? { ...u, level: newLevel } : u)))
    );

    try {
      const res = await updateLevel(id, newLevel); // API call
      if (res.success) {
        toast.success(res.message || "User level updated successfully");
      } else {
        throw new Error(res.message || "Failed to update level");
      }
    } catch (err) {
      console.error(err);
      toast.error("Failed to update level. Reverting changes.");
      setFiltered(previousState);
      dispatch(setUsers(users)); // revert Redux store
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
        <h1 className="text-2xl font-bold">Inspectors</h1>
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
        {currentUser?.designation === "central" && (
          <input
            type="text"
            placeholder="Filter by Zone"
            value={filters.zone}
            onChange={(e) =>
              setFilters({ ...filters, zone: e.target.value })
            }
            className="border border-gray-300 rounded-md px-3 py-2 w-full md:w-1/4 focus:outline-none"
          />
        )}
        {(currentUser?.designation === "central" ||
          currentUser?.designation === "zone") && (
          <input
            type="text"
            placeholder="Filter by State"
            value={filters.state}
            onChange={(e) =>
              setFilters({ ...filters, state: e.target.value })
            }
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
