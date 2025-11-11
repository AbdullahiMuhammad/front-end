import React, { useState, useEffect } from "react";
import axiosInstance from "../../../services/api";
import { useSelector } from "react-redux";



export default function IncidentBriefings({ incident}) {
    const {user} = useSelector((state) => state.user);
  const [briefs, setBriefs] = useState([]);
  const [message, setMessage] = useState("");
  console.log(briefs)

  const fetchBriefs = async () => {
  try {
    const res = await axiosInstance.get(`/incident/${incident._id}/briefings`);
    if (res.data.success) setBriefs(res.data.data);
  } catch (err) {
    console.error("Error fetching briefs:", err);
  }
};
console.log(incident._id);
console.log(user.fullName);

useEffect(() => {
  if (incident._id) fetchBriefs();
}, [incident._id]);

const sendMessage = async () => {
  if (!message.trim()) return;

  try {
    const res = await axiosInstance.post(`/incident/${incident._id}/briefings`, { message, userId: user._id, email: user.fullName });
    if (res.data.success) {
      setBriefs(res.data.data);
      setMessage("");
    }
  } catch (err) {
    console.error("Error sending briefing:", err);
  }
};
  

  return (
    <div className="flex flex-col h-full p-4 bg-gray-50 rounded shadow">
      <div className="flex-1 overflow-y-auto mb-2">
         {briefs.length > 0 ? (
          briefs.map((r) => (
            <div key={r._id || Math.random()} className="mb-2 p-3 border rounded bg-white">
              <p className="text-sm text-gray-700 font-semibold">
                {r.fullName} <span className="text-xs text-gray-500">{new Date(r.createdAt).toLocaleString()}</span>
              </p>
              <p>{r.message}</p>
            </div>
          ))
        ) : (
          <p className="p-4 text-gray-500 italic">No briefs notes yet</p>
        )}
      </div>
      <div className="flex gap-2">
        <input
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          placeholder="Add briefing note..."
          className="flex-1 border rounded px-2 py-1"
          onKeyDown={(e) => e.key === "Enter" && sendMessage()}
        />
        <button onClick={sendMessage} className="bg-indigo-700 text-white px-4 py-2 rounded">
          Send
        </button>
      </div>
    </div>
  );
}
