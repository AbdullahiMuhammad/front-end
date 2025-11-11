import React, { useState } from "react";
import { FaPlus } from "react-icons/fa";
import { useSelector } from "react-redux";
import ReportsForm from "./ReportForm"; // Import the ReportForm component
import ReportList from "./ReportList"; // Import the ReportList component

const Report = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [isFormVisible, setIsFormVisible] = useState(false); // State to toggle form visibility
  const { reports } = useSelector((state) => state.report);

  // Handle form submission (for now, just logs the report data)
  const handleReportSubmit = (newReport) => {
    console.log("New Report Submitted:", newReport);
    setIsFormVisible(false); // Hide form after submission
  };

  const handleCancelForm = () => {
    setIsFormVisible(false); // Hide the form when cancel button is clicked
  };

  return (
    <div className="bg-white p-8 min-h-screen">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold text-black">Reports</h1>

        {/* Search Bar */}
        <div className="relative">
          <input
            type="text"
            placeholder="Search reports..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="p-2 pl-10 pr-4 border rounded-md shadow-sm"
          />
          <span className="absolute left-2 top-1/2 transform -translate-y-1/2 text-gray-500">
            🔍
          </span>
        </div>

        {/* Create New Report Button */}
        <button
          className="p-2 bg-yellow-500 text-white rounded-full shadow-md hover:bg-yellow-600"
          onClick={() => setIsFormVisible(true)} // Show the form when clicked
        >
          <FaPlus size={20} />
        </button>
      </div>

      {/* Conditionally render the report list or the form */}
      {isFormVisible ? (
        <ReportsForm onSubmit={handleReportSubmit} onCancel={handleCancelForm} />
      ) : (
        <ReportList reports={reports} searchQuery={searchQuery} />
      )}
    </div>
  );
};

export default Report;
