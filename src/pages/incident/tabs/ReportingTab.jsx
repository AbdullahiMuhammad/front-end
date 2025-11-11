import React, { useState, useEffect } from "react";
import axios from "axios";

export default function IncidentReportingTab({ incidentId, user }) {
  const [reports, setReports] = useState([]);
  const [message, setMessage] = useState("");

  const fetchReports = async () => {
    try {
      const res = await axios.get(`/api/incidents/${incidentId}/briefings`);
      if (res.data.success) setReports(res.data.data);
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    fetchReports();
  }, [incidentId]);

  const sendReport = async () => {
    if (!message.trim()) return;
    try {
      const res = await axios.post(`/api/incidents/${incidentId}/reporting`, { message });
      if (res.data.success) {
        setReports(res.data.data);
        setMessage("");
      }
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div className="flex flex-col h-full p-4 bg-gray-50 rounded shadow">
      {/* Reporting Header */}
      <h2 className="text-lg font-bold mb-2">Reporting</h2>

      {/* Reports List */}
      <div className="flex-1 overflow-y-auto mb-2">
        {reports.length > 0 ? (
          reports.map((r) => (
            <div key={r._id || Math.random()} className="mb-2 p-3 border rounded bg-white">
              <p className="text-sm text-gray-700 font-semibold">
                {r.userName} <span className="text-xs text-gray-500">{new Date(r.createdAt).toLocaleString()}</span>
              </p>
              <p>{r.message}</p>
            </div>
          ))
        ) : (
          <p className="p-4 text-gray-500 italic">No reporting notes yet</p>
        )}
      </div>

      {/* Input Box */}
      <div className="flex gap-2">
        <input
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          placeholder="Add reporting note..."
          className="flex-1 border rounded px-2 py-1"
          onKeyDown={(e) => e.key === "Enter" && sendReport()}
        />
        <button onClick={sendReport} className="bg-indigo-700 text-white px-4 py-2 rounded">
          Send
        </button>
      </div>
    </div>
  );
}
