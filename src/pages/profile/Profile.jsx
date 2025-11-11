import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
// This is a mock API function to get user data.
const fetchUserData = async () => {
  return {
    firstName: "John",
    lastName: "Doe",
    email: "john.doe@example.com",
    phone: "123-456-7890",
    address: "123 Main St, Cityville",
    state: "NY",
    zone: "Zone 1",
    localGovernment: "City District",
    roles: ["admin"],
    reputation: 150,
    profilePic: null, // Assume no profile pic for now
  };
};

const Profile = () => {
  const user = useSelector((state) => state.user.user);
  const [isEditMode, setIsEditMode] = useState(false);
  const [newPhone, setNewPhone] = useState("");
  const [newAddress, setNewAddress] = useState("");
  const [newProfilePic, setNewProfilePic] = useState(null);

  useEffect(() => {
    const loadData = async () => {
      const userData = await fetchUserData();
      setNewPhone(userData.phone);
      setNewAddress(userData.address);
    };

    loadData();
  }, []);

  if (!user) return <div>Loading...</div>;

  const isAdmin = user.roles == 4;

  const handleEditToggle = () => {
    setIsEditMode(!isEditMode);
  };

  const handleSaveChanges = () => {
    // This should send the updated data to the server (mocked here)
    alert("Changes saved!");
    setIsEditMode(false);
  };

  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center p-4">
      <div className="w-full md:w-2/3 lg:w-1/2 bg-white shadow-lg rounded-lg p-6">
        <div className="flex items-center mb-6">
          <div className="w-32 h-32 rounded-full bg-gray-200 flex justify-center items-center text-5xl text-white">
            {user.profilePic ? (
              <img
                src={user.profilePic}
                alt="Profile"
                className="w-full h-full rounded-full object-cover"
              />
            ) : (
              <span>{user.firstName[0]}</span>
            )}
          </div>
          <div className="ml-6">
            <h1 className="text-3xl font-semibold text-gray-800">
              {user.firstName} {user.lastName}
            </h1>
            <p className="text-lg text-gray-600">{user.email}</p>
            <p className="text-sm text-gray-500">Reputation: {user.reputation}</p>
          </div>
        </div>

        <div className="space-y-6">
          <div>
            <h2 className="text-2xl font-semibold text-gray-800">Personal Info</h2>
            <p className="text-gray-500">Phone: {isEditMode ? (
              <input
                type="text"
                value={newPhone}
                onChange={(e) => setNewPhone(e.target.value)}
                className="mt-2 p-2 w-full border border-gray-300 rounded"
              />
            ) : user.phone}</p>
            <p className="text-gray-500">Address: {isEditMode ? (
              <input
                type="text"
                value={newAddress}
                onChange={(e) => setNewAddress(e.target.value)}
                className="mt-2 p-2 w-full border border-gray-300 rounded"
              />
            ) : user.address}</p>
          </div>

          {isEditMode && (
            <div>
              <label className="block text-gray-700">Change Profile Picture</label>
              <input
                type="file"
                onChange={(e) => setNewProfilePic(e.target.files[0])}
                className="mt-2 p-2 w-full border border-gray-300 rounded"
              />
            </div>
          )}

          <div className="flex justify-between items-center">
            <div>
              <h3 className="text-xl font-semibold text-gray-800">Location</h3>
              <p className="text-gray-500">State: {user.state}</p>
              <p className="text-gray-500">Zone: {user.zone}</p>
              <p className="text-gray-500">Local Government: {user.localGovernment}</p>
            </div>

            <div className="text-right">
              {isEditMode ? (
                <button
                  onClick={handleSaveChanges}
                  className="bg-yellow-500 text-white py-2 px-6 rounded-md"
                >
                  Save Changes
                </button>
              ) : (
                <button
                  onClick={handleEditToggle}
                  className="bg-green-500 text-white py-2 px-6 rounded-md"
                >
                  Edit Profile
                </button>
              )}
            </div>
          </div>

          <div className="mt-6">
            <h3 className="text-xl font-semibold text-gray-800">Roles</h3>
            {user.roles.map((role) => (
              <p key={role} className="text-gray-500">{role}</p>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;
