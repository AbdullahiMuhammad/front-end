import React, { useRef, useState } from "react";
import html2pdf from "html2pdf.js";

// Sample incident data


export default function IncidentViewPDF({incident }) {
  const ref = useRef();
  const [editMode, setEditMode] = useState(false);
  const [formData, setFormData] = useState({ ...incident });

  const handleDownloadPDF = () => {
    if (!ref.current) return;

    const opt = {
      margin: 0.5,
      filename: `incident_${formData.incidentType}_${new Date().toISOString()}.pdf`,
      image: { type: "jpeg", quality: 1 },
      html2canvas: { scale: 2, useCORS: true, scrollY: -window.scrollY },
      jsPDF: { unit: "in", format: "letter", orientation: "portrait" },
    };

    html2pdf().set(opt).from(ref.current).save();
  };

  const handleChange = (key, value) => {
    setFormData((prev) => ({ ...prev, [key]: value }));
  };

  const handleSave = () => {
    // TODO: send `formData` to backend API to save changes
    console.log("Saved data:", formData);
    setEditMode(false);
  };

  return (
    <div className="p-4 md:p-6 bg-gray-100 min-h-screen">
      <div className="flex justify-between mb-4">
        <div className="flex gap-2">
          <button
            onClick={() => setEditMode(!editMode)}
            className="bg-yellow-500 hover:bg-yellow-600 text-white px-4 py-2 rounded shadow"
          >
            {editMode ? "View Mode" : "Edit Mode"}
          </button>
          <button
            onClick={handleDownloadPDF}
            className="bg-indigo-700 hover:bg-indigo-800 text-white px-4 py-2 rounded shadow"
          >
            Download PDF
          </button>
        </div>

        {editMode && (
          <button
            onClick={handleSave}
            className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded shadow"
          >
            Save Changes
          </button>
        )}
      </div>

      <div ref={ref} className="bg-white p-6 rounded shadow">
        <h2 className="text-xl font-bold mb-4 text-center">Incident Details</h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {Object.entries(formData).map(([key, value]) => {
            if (["_id", "password", "createdBy", "photos"].includes(key)) return null;

            // Display editable fields
            if (editMode) {
              return (
                <div key={key}>
                  <label className="font-semibold capitalize block mb-1">
                    {key.replace(/([A-Z])/g, " $1")}
                  </label>
                  <input
                    type="text"
                    value={value ?? ""}
                    onChange={(e) => handleChange(key, e.target.value)}
                    className="border border-gray-300 rounded px-2 py-1 w-full"
                  />
                </div>
              );
            }

            // Display view mode
            return (
              <div key={key}>
                <p className="font-semibold capitalize">{key.replace(/([A-Z])/g, " $1")}</p>
                <p>{Array.isArray(value) ? value.join(", ") : value?.toString()}</p>
              </div>
            );
          })}
        </div>

        {/* Photos */}
        {formData.photos?.length > 0 && (
          <div className="mt-4">
            <p className="font-semibold mb-2">Photos:</p>
            <div className="flex flex-wrap gap-2">
              {formData.photos.map((url, idx) => (
                <img
                  key={idx}
                  src={url}
                  alt={`incident-${idx}`}
                  className="w-32 h-32 object-cover border rounded"
                />
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
