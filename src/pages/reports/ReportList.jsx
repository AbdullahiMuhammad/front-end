import React from "react";
import ReportCard from "./ReportCard"; // Assuming ReportCard is another reusable component

const ReportList = ({ reports, searchQuery }) => {
  // Filter reports based on the search query
  const filteredReports = reports.filter((report) =>
    report.title.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="space-y-4 mt-6">
      {filteredReports.length === 0 ? (
        <p>No reports found.</p>
      ) : (
        filteredReports.map((report, index) => (
          <ReportCard key={index} report={report} />
        ))
      )}
    </div>
  );
};

export default ReportList;
