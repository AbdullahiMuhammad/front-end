import axiosInstance from "./api"
import { proxy } from "./api"; 

export const getLoggedUser = async () => {
  const token = localStorage.getItem("token");

  if (!token) {
    return {
      success: false,
      message: "No authentication token found.",
    };
  }

  try {
    const response = await axiosInstance.get(`${proxy}/user/get-logged-user`, {
      headers: {
        Authorization: `Bearer ${token}`, // send token in header
      },
    });

    return {
      success: true,
      data: response.data.data,
    };
  } catch (err) {
    return {
      success: false,
      message: err.response?.data?.message || err.message,
    };
  }
};

export const getAllUsers = async () => {
    try {
        const response = await axiosInstance.get(`${proxy}/user/get-all-users`);
        return {
            success: true,
            data: response.data,
            count: response.data.count,
        };
    } catch (err) {
        return {
            success: false,
            message: err.response?.data?.message || err.message,
        };
    }
};

// 🏷️ Update user designation
export const updateLevel = async (id, newDesignation) => {
  const token = localStorage.getItem("token");

  try {
    const response = await axiosInstance.put(
      `${proxy}/user/update-designation/${id}`,
      { newDesignation },
      {
        headers: { Authorization: `Bearer ${token}` },
      }
    );

    return {
      success: true,
      data: response.data.user || response.data,
      message: response.data.message || "Designation updated successfully",
    };
  } catch (err) {
    return {
      success: false,
      message: err.response?.data?.message || err.message,
    };
  }
};

// ❌ Delete a user
export const deleteUser = async (id) => {
  const token = localStorage.getItem("token");

  try {
    const response = await axiosInstance.delete(`${proxy}/user/delete/${id}`, {
      headers: { Authorization: `Bearer ${token}` },
    });

    return {
      success: true,
      message: response.data.message || "User deleted successfully",
    };
  } catch (err) {
    return {
      success: false,
      message: err.response?.data?.message || err.message,
    };
  }
};

// Update user location (zone, state, localGovernment) — central admin only
export const updateUserLocation = async (id, updates) => {
  const token = localStorage.getItem("token");

  try {
    const response = await axiosInstance.put(
      `${proxy}/user/update-location/${id}`,
      updates,
      {
        headers: { Authorization: `Bearer ${token}` },
      }
    );

    return {
      success: true,
      data: response.data.user || response.data,
      message: response.data.message || "User location updated successfully",
    };
  } catch (err) {
    return {
      success: false,
      message: err.response?.data?.message || err.message,
    };
  }
};

// Update logged-in user profile
export const updateUserProfile = async (updates) => {
  const token = localStorage.getItem("token");

  try {
    const response = await axiosInstance.put(
      `${proxy}/user/update-profile`,
      updates,
      {
        headers: { Authorization: `Bearer ${token}` },
      }
    );

    return {
      success: true,
      data: response.data.user || response.data,
      message: response.data.message || "Profile updated successfully",
    };
  } catch (err) {
    return {
      success: false,
      message: err.response?.data?.message || err.message,
    };
  }
};