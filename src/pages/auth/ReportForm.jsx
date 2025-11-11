import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import InputField from "../../component/input/InputField";
import FileUploadField from "../../component/input/FileUploadField";
import { InputTextarea } from "../../component/input/InputField";
import logo from "../../assets/logo.png";
import { incidentForm } from "../../services/incident-form";
import statesAndLGAs from "../../assets/data.js/states";
import { createReport } from "../../services/report";

export default function ReportForm() {
  const navigate = useNavigate();

  const [form, setForm] = useState({
    title: "",
    information: "",
    zone: "",
    state: "",
    localGovernment: "",
    address: "",
    facilityType: "",
    facilityName: "",
    reporterName: "",
    reporterEmail: "",
    reporterPhone: "",
    attachments: [],
  });

  // Nigerian zones
  const zones = [
    "North Central",
    "North East",
    "North West",
    "South East",
    "South South",
    "South West",
  ];

  // Facility types
  const facilityTypes = [
    "Filling Station",
    "Depot",
    "Refinery",
    "Storage Tank",
    "Pipeline",
  ];

  const handleChange = (e) => {
    const { name, value } = e.target;

    // Reset dependent fields when needed
    if (name === "zone") {
      setForm({ ...form, zone: value, state: "", localGovernment: "" });
    } else if (name === "state") {
      setForm({ ...form, state: value, localGovernment: "" });
    } else {
      setForm({ ...form, [name]: value });
    }
  };

  const handleFileChange = (files) => {
    setForm({ ...form, attachments: files });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Validation
    const requiredFields = [
      "title",
      "information",
      "zone",
      "state",
      "localGovernment",
      "address",
      "facilityType",
      "reporterName",
      "reporterPhone",
    ];

    const missing = requiredFields.filter((f) => !form[f]);
    if (missing.length > 0) {
      toast.error(`Please fill in: ${missing.join(", ")}`);
      return;
    }

    try {
      const response = await createReport(form);
      if (response.success) {
        toast.success(response.message);
        setTimeout(() => navigate("/"), 2000);
      } else {
        toast.error(response.message);
      }
    } catch (err) {
      toast.error(err?.message || "Something went wrong. Please try again.");
    }
  };

  return (
    <div className="min-h-screen flex items-center overflow-y-auto justify-center bg-gradient-to-br from-green-600 via-black to-yellow-500 px-4 py-8">
      <div className="w-full max-w-[750px] h-auto flex flex-col gap-4 bg-white rounded-2xl shadow-xl p-4 sm:p-10 relative">
        <div className="absolute inset-0 rounded-2xl bg-gradient-to-tr from-green-400 via-yellow-300 to-green-700 opacity-10 pointer-events-none"></div>

        <img src={logo} alt="logo" width={100} height={100} className="self-center" />
        <h1 className="text-center text-2xl font-bold mb-6 text-green-700 tracking-tight">
          Incident Report Form
        </h1>

        <div className="max-h-[75vh] overflow-y-auto pr-2">
          <form onSubmit={handleSubmit} className="space-y-3 pb-5 relative z-10">
            {/* Title */}
            <InputField
              label="Incident Title"
              type="text"
              name="title"
              value={form.title}
              onChange={handleChange}
            />

            {/* Information / Description */}
            <InputTextarea
              label="Information / Description"
              name="information"
              value={form.information}
              onChange={handleChange}
              cNmae="min-h-30"
            />

            {/* Zone */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Zone
              </label>
              <select
                name="zone"
                value={form.zone}
                onChange={handleChange}
                className="w-full border border-gray-300 rounded-md p-2 focus:ring-2 focus:ring-green-400 focus:outline-none"
              >
                <option value="">Select Zone</option>
                {zones.map((zone) => (
                  <option key={zone} value={zone}>
                    {zone}
                  </option>
                ))}
              </select>
            </div>

            {/* State */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                State
              </label>
              <select
                name="state"
                value={form.state}
                onChange={handleChange}
                disabled={!form.zone}
                className="w-full border border-gray-300 rounded-md p-2 focus:ring-2 focus:ring-green-400 focus:outline-none"
              >
                <option value="">
                  {form.zone ? "Select State" : "Select a Zone first"}
                </option>
                {Object.keys(statesAndLGAs).map((state) => (
                  <option key={state} value={state}>
                    {state}
                  </option>
                ))}
              </select>
            </div>

            {/* Local Government */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Local Government
              </label>
              <select
                name="localGovernment"
                value={form.localGovernment}
                onChange={handleChange}
                disabled={!form.state}
                className="w-full border border-gray-300 rounded-md p-2 focus:ring-2 focus:ring-green-400 focus:outline-none"
              >
                <option value="">
                  {form.state ? "Select Local Government" : "Select a State first"}
                </option>
                {form.state &&
                  statesAndLGAs[form.state]?.map((lga) => (
                    <option key={lga} value={lga}>
                      {lga}
                    </option>
                  ))}
              </select>
            </div>

            {/* Address */}
            <InputTextarea
              label="Address"
              name="address"
              value={form.address}
              onChange={handleChange}
              cNmae="min-h-20"
            />

            {/* Facility Type */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Facility Type
              </label>
              <select
                name="facilityType"
                value={form.facilityType}
                onChange={handleChange}
                className="w-full border border-gray-300 rounded-md p-2 focus:ring-2 focus:ring-green-400 focus:outline-none"
              >
                <option value="">Select Facility Type</option>
                {facilityTypes.map((type) => (
                  <option key={type} value={type}>
                    {type}
                  </option>
                ))}
              </select>
            </div>

            {/* Facility Name */}
            <InputField
              label="Facility Name"
              type="text"
              name="facilityName"
              value={form.facilityName}
              onChange={handleChange}
            />

            {/* Reporter Name */}
            <InputField
              label="Reporter Name"
              type="text"
              name="reporterName"
              value={form.reporterName}
              onChange={handleChange}
            />

            {/* Reporter Email */}
            <InputField
              label="Reporter Email"
              type="email"
              name="reporterEmail"
              value={form.reporterEmail}
              onChange={handleChange}
            />

            {/* Reporter Phone */}
            <InputField
              label="Reporter Phone"
              type="tel"
              name="reporterPhone"
              value={form.reporterPhone}
              onChange={handleChange}
            />

            {/* File Upload */}
            <FileUploadField
              files={form.attachments}
              onChange={handleFileChange}
              label="Upload Attachments"
            />

            {/* Submit Button */}
            <button
              type="submit"
              className="w-full bg-yellow-400 hover:bg-yellow-500 text-black font-semibold py-2 rounded-lg transition duration-200 shadow-md hover:shadow-lg"
            >
              Submit Report
            </button>
          </form>
        </div>
      </div>

      <ToastContainer position="top-right" autoClose={3000} />
    </div>
  );
}
