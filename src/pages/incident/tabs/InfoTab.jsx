export default function InfoTab({ incident }) {
  return (
    <div className="space-y-3">
      <h3 className="font-semibold text-lg text-black">Incident Details</h3>
      <p className="text-gray-700">{incident.description || "No details available"}</p>
      <div className="text-sm text-gray-600">
        <p><strong>Zone:</strong> {incident.zone}</p>
        <p><strong>State:</strong> {incident.state}</p>
        <p><strong>Status:</strong> {incident.status}</p>
      </div>
    </div>
  );
}
