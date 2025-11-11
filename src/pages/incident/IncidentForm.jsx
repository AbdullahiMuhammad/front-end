import React, { useState } from "react";
import { toast } from "react-toastify";
import { BiArrowBack } from "react-icons/bi";
import { createIncident, updateIncident } from "../../services/incident";
import { useNavigate } from "react-router-dom";
import statesAndLGAs from "../../assets/data.js/states";

const IncidentForm = ({ users = [], authUser, back, initialData = null }) => {
  const navigate = useNavigate();

  const isEdit = !!initialData;
  const [loading, setLoading] = useState(false);

  const [formData, setFormData] = useState(
    initialData || {
      title: "",
      incidentType: "",
      description: "",
      dateOfIncident: new Date().toISOString().split("T")[0],
      timeOfIncident: "",
      facilityType: "",
      state: "",
      lga: "",
      address: "",
      coordinates: { lat: "", lng: "" },
      cause: "",
      immediateActionsTaken: "",
      injured: 0,
      fatalities: 0,
      environmentalImpact: "",
      regulatoryBodiesNotified: [],
      mediaCoverage: false,
      photos: [],
      investigationFindings: "",
      rootCauseAnalysis: "",
      correctiveActions: "",
      preventiveActions: "",
      followUpStatus: "Not Started",
      confidentiality: "Restricted",
      members: [],
      notificationsEnabled: true,
      createdBy: authUser?._id,
    }
  );

  const facilityTypes = [
    "Depot",
    "Pipeline",
    "Filling Station",
    "Refinery",
    "Vessel",
    "Storage Tank",
    "Transport Vehicle",
    "Other",
  ];
  const incidentTypes = [
    "Fire",
    "Explosion",
    "Oil Spill",
    "Gas Leak",
    "Vandalism",
    "Equipment Failure",
    "Other",
  ];
  const followStatuses = ["Not Started", "Ongoing", "Completed"];
  const confidentialityLevels = ["Public", "Restricted", "Confidential"];

  // ---------------- Handlers ----------------
  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;

    if (name.startsWith("coordinates.")) {
      const field = name.split(".")[1];
      setFormData((prev) => ({
        ...prev,
        coordinates: { ...prev.coordinates, [field]: value },
      }));
    } else if (type === "checkbox") {
      setFormData((prev) => ({ ...prev, [name]: checked }));
    } else {
      setFormData((prev) => ({ ...prev, [name]: value }));
    }
  };

  const handleArrayChange = (name, value) => {
    setFormData((prev) => ({
      ...prev,
      [name]: prev[name].includes(value)
        ? prev[name].filter((item) => item !== value)
        : [...prev[name], value],
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const response = isEdit
        ? await updateIncident(initialData._id, formData)
        : await createIncident(formData);

      if (response?.success) {
        toast.success(response.message || "Incident saved successfully!");
        back();
      } else {
        toast.error(response?.message || "Failed to save incident");
      }
    } catch (err) {
      console.error(err);
      toast.error("Something went wrong. Try again.");
    } finally {
      setLoading(false);
    }
  };

  // ---------------- Render ----------------
  return (
    <div className="w-[85%] md:w-full mx-auto p-6 bg-white shadow-md rounded-md">
      <div className="flex items-center gap-3 mb-6">
        <button onClick={back} className="text-gray-600 hover:text-black">
          <BiArrowBack size={22} />
        </button>
        <h2 className="text-2xl font-semibold">
          {isEdit ? "Edit Incident" : "Incident Report"}
        </h2>
      </div>

      <form onSubmit={handleSubmit} className="space-y-4">
        {/* BASIC INFO */}
        <section>
          <h3 className="font-semibold text-lg mb-2">Basic Information</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <input
              type="text"
              name="title"
              placeholder="Incident Title"
              value={formData.title}
              onChange={handleChange}
              required
              className="border p-2 rounded"
            />
            <select
              name="incidentType"
              value={formData.incidentType}
              onChange={handleChange}
              required
              className="border p-2 rounded"
            >
              <option value="">Select Type</option>
              {incidentTypes.map((t) => (
                <option key={t}>{t}</option>
              ))}
            </select>

            <select
              name="facilityType"
              value={formData.facilityType}
              onChange={handleChange}
              className="border p-2 rounded"
            >
              <option value="">Facility Type</option>
              {facilityTypes.map((f) => (
                <option key={f}>{f}</option>
              ))}
            </select>

            <input
              type="date"
              name="dateOfIncident"
              value={formData.dateOfIncident}
              onChange={handleChange}
              required
              className="border p-2 rounded"
            />
            <input
              type="time"
              name="timeOfIncident"
              value={formData.timeOfIncident}
              onChange={handleChange}
              className="border p-2 rounded"
            />

            <textarea
              name="description"
              placeholder="Description"
              value={formData.description}
              onChange={handleChange}
              required
              className="col-span-2 border p-2 rounded"
            />
          </div>
        </section>

        {/* LOCATION */}
        <section>
          <h3 className="font-semibold text-lg mb-2">Location</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <select
              name="state"
              value={formData.state}
              onChange={handleChange}
              required
              className="border p-2 rounded"
            >
              <option value="">Select State</option>
              {Object.keys(statesAndLGAs).map((state) => (
                <option key={state}>{state}</option>
              ))}
            </select>
            <select
              name="lga"
              value={formData.lga}
              onChange={handleChange}
              disabled={!formData.state}
              required
              className="border p-2 rounded"
            >
              <option value="">
                {formData.state ? "Select LGA" : "Select State First"}
              </option>
              {formData.state &&
                statesAndLGAs[formData.state].map((lga) => (
                  <option key={lga}>{lga}</option>
                ))}
            </select>
            <input
              type="text"
              name="address"
              placeholder="Address"
              value={formData.address}
              onChange={handleChange}
              className="border p-2 rounded col-span-2"
            />
            <div className="flex gap-2">
              <input
                type="number"
                step="any"
                name="coordinates.lat"
                placeholder="Latitude"
                value={formData.coordinates.lat}
                onChange={handleChange}
                className="border p-2 rounded w-1/2"
              />
              <input
                type="number"
                step="any"
                name="coordinates.lng"
                placeholder="Longitude"
                value={formData.coordinates.lng}
                onChange={handleChange}
                className="border p-2 rounded w-1/2"
              />
            </div>
          </div>
        </section>

        {/* BRIEFING */}
        <section>
          <h3 className="font-semibold text-lg mb-2">Inspectors Report</h3>
          <textarea
            name="cause"
            placeholder="Cause"
            value={formData.cause}
            onChange={handleChange}
            className="w-full border p-2 rounded"
          />
          <textarea
            name="immediateActionsTaken"
            placeholder="Immediate Actions Taken"
            value={formData.immediateActionsTaken}
            onChange={handleChange}
            className="w-full border p-2 rounded mt-2"
          />

          <div className="grid grid-cols-3 gap-3 mt-2">
            <input
              type="number"
              name="injured"
              placeholder="Injured"
              value={formData.injured}
              onChange={handleChange}
              className="border p-2 rounded"
            />
            <input
              type="number"
              name="fatalities"
              placeholder="Fatalities"
              value={formData.fatalities}
              onChange={handleChange}
              className="border p-2 rounded"
            />
            <input
              type="text"
              name="environmentalImpact"
              placeholder="Environmental Impact"
              value={formData.environmentalImpact}
              onChange={handleChange}
              className="border p-2 rounded"
            />
          </div>
        </section>

        {/* FOLLOW-UP */}
        <section>
          <h3 className="font-semibold text-lg mb-2">Follow-Up</h3>
          <textarea
            name="investigationFindings"
            placeholder="Investigation Findings"
            value={formData.investigationFindings}
            onChange={handleChange}
            className="w-full border p-2 rounded"
          />
          <textarea
            name="correctiveActions"
            placeholder="Corrective Actions"
            value={formData.correctiveActions}
            onChange={handleChange}
            className="w-full border p-2 rounded mt-2"
          />
          <select
            name="followUpStatus"
            value={formData.followUpStatus}
            onChange={handleChange}
            className="border p-2 rounded mt-2"
          >
            {followStatuses.map((s) => (
              <option key={s}>{s}</option>
            ))}
          </select>
        </section>

        {/* CONFIDENTIALITY */}
        <section>
          <h3 className="font-semibold text-lg mb-2">Settings</h3>
          <select
            name="confidentiality"
            value={formData.confidentiality}
            onChange={handleChange}
            className="border p-2 rounded"
          >
            {confidentialityLevels.map((c) => (
              <option key={c}>{c}</option>
            ))}
          </select>
          <div className="mt-2 flex items-center gap-2">
            <input
              type="checkbox"
              name="notificationsEnabled"
              checked={formData.notificationsEnabled}
              onChange={handleChange}
            />
            <label>Enable Notifications</label>
          </div>
        </section>

        {/* SUBMIT */}
        <button
          type="submit"
          disabled={loading}
          className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700 transition"
        >
          {loading ? "Saving..." : isEdit ? "Update Incident" : "Create Incident"}
        </button>
      </form>
    </div>
  );
};

export default IncidentForm;
