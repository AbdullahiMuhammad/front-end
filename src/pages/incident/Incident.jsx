import React, { useState, useEffect } from "react";
import IncidentModal from "./IncidentModal";
import IncidentForm from "./IncidentForm";
import { useDispatch, useSelector } from "react-redux";

//import { incidents } from '../../assets/data.js/incident'


export default function IncidentPage() {
  const {user} = useSelector((state) => state.user);
  const dispatch = useDispatch();
  const incidents = useSelector((state) => state.incident.incidents || []);
  
  const [selectedIncident, setSelectedIncident] = useState(null);
  const [creating, setCreating] = useState(false);
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState("");





  const filteredIncidents = (incidents || []).filter((i) => {
  const title = i?.title?.toLowerCase() || "";
  const matchSearch = title.includes(search.toLowerCase());
  const matchStatus = statusFilter ? i?.status === statusFilter : true;
  return matchSearch && matchStatus;
});


  const handleCreate = () => {
    setSelectedIncident(null);
    setCreating(true);
  };

  const handleBack = () => {
    setSelectedIncident(null);
    setCreating(false);
  };

  return (
    <div className="flex h-screen flex-col md:flex-row bg-gray-100">
      {/* Sidebar */}
      <aside
        className={`w-full md:w-1/3 bg-white border-gray-300 flex flex-col
          ${selectedIncident || creating ? "hidden md:flex" : "flex"}`}
      >
        {/* Header / Create Button */}
        <div className="flex justify-between items-center p-4 ">
          <h2 className="text-2xl font-bold text-black mb-6">Incidents</h2>
          <button
            onClick={handleCreate}
            className="bg-yellow-400 hover:bg-yellow-500 text-black px-3 py-1 rounded-md font-semibold"
          >
            + Create
          </button>
        </div>

        {/* Filters */}
        <div className="flex flex-wrap p-3 gap-2 ">
          <input
            type="text"
            placeholder="Search incidents..."
            className="flex-1 border border-gray-300 rounded-md px-2 py-1 focus:outline-none"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
          <select
            className="border border-gray-300 rounded-md px-2 py-1"
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
          >
            <option value="">All Status</option>
            <option value="open">Open</option>
            <option value="in progress">In Progress</option>
            <option value="closed">Closed</option>
          </select>
        </div>

        {/* Incident List */}
        <div className="flex-1 overflow-y-auto p-3 space-y-3">
          {filteredIncidents.map((i,index) => (
            <div
              key={index}
              onClick={() => setSelectedIncident(i)}
              className={`p-3 bg-white rounded-lg shadow-sm hover:shadow-md cursor-pointer flex flex-col ${
                selectedIncident?._id === i._id ? "bg-yellow-100" : "bg-white"
              }`}
            >
              <div className="flex justify-between items-center mb-1">
                <h3 className="font-semibold text-black text-lg">{i.title}</h3>
                <span
                  className={`px-2 py-1 text-xs rounded-full font-semibold ${
                    i.status === "open"
                      ? "bg-green-600 text-white"
                      : i.status === "in progress"
                      ? "bg-yellow-400 text-black"
                      : "bg-gray-300 text-black"
                  }`}
                >
                  {i.status}
                </span>
              </div>
              <p className="text-gray-600 text-sm">
                {i.zone} • {i.state}
              </p>
              <p className="text-gray-400 text-xs">
                {new Date(i.date).toLocaleDateString()}
              </p>
            </div>
          ))}
          {filteredIncidents.length === 0 && (
            <p className="text-gray-500 text-center py-6">No incidents found.</p>
          )}
        </div>
      </aside>

      {/* Right Panel */}
      <main className="flex-1 p-2 overflow-y-auto">
        {/* Mobile Back Button */}
        {(selectedIncident || creating) && (
          <div className="flex items-center mb-4 md:hidden">
            <button
              onClick={handleBack}
              className="px-3 py-2 bg-gray-200 rounded-md mr-2"
            >
              Back
            </button>
          </div>
        )}

        {/* Content */}
        {creating ? (
          <IncidentForm back={handleBack} />
        ) : selectedIncident ? (
          <div className="bg-white rounded-lg shadow p-2 flex flex-col h-full ">
            <IncidentModal incident={selectedIncident} user={user} />
          </div>
        ) : (
          <div className="flex justify-center items-center text-gray-400 h-full italic">
            Select an incident or click "+ Create"
          </div>
        )}
      </main>
    </div>
  );
}
