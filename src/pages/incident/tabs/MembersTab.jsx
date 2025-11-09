export default function MembersTab({ incident }) {
  return (
    <ul className="divide-y">
      {incident.members?.map((m) => (
        <li key={m._id} className="py-2 flex justify-between">
          <span>{m.name}</span>
          <span className="text-xs bg-green-600 text-white px-2 py-1 rounded">{m.role}</span>
        </li>
      )) || <p className="text-gray-500">No members assigned yet.</p>}
    </ul>
  );
}
