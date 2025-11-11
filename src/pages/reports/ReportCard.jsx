import React, { useState } from "react";

const Card = ({ report }) => {
  const [isExpanded, setIsExpanded] = useState(false);

  const handleToggle = () => {
    setIsExpanded(!isExpanded);
  };

  return (
    <div className="p-4 border border-gray-300 rounded-lg shadow-sm bg-white transition-all">
      <h2 className="text-xl font-semibold text-black">{report.title}</h2>
      <p className="text-gray-700">{report.information}</p>

      {/* Show "See More" when collapsed */}
      {!isExpanded && (
        <button
          onClick={handleToggle}
          className="text-green-600 hover:text-green-700 mt-2"
        >
          See More
        </button>
      )}

      {/* Expanded details */}
      {isExpanded && (
        <div className="mt-4 text-gray-800">
          <p>{report.fullDescription}</p>
          <div className="grid grid-cols-2 gap-4 mt-4 text-sm text-gray-600">
            <div>
              <strong>State:</strong> {report.state}
            </div>
            <div>
              <strong>Zone:</strong> {report.zone}
            </div>
            <div>
              <strong>Local Government:</strong> {report.localGovernment}
            </div>
            <div>
              <strong>Address:</strong> {report.address}
            </div>
            <div>
              <strong>Phone:</strong> {report.phone}
            </div>
            <div>
              <strong>Sender Phone:</strong> {report.senderPhone}
            </div>
            <div>
              <strong>Sender Email:</strong> {report.senderEmail}
            </div>
          </div>
          <button
            onClick={handleToggle}
            className="text-green-600 hover:text-green-700 mt-2"
          >
            See Less
          </button>
        </div>
      )}
    </div>
  );
};

export default Card;
