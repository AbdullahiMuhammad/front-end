import axiosInstance, { proxy } from "./api";

// ✅ Get currently logged-in user
export const getLoggedUser = async () => {
  try {
    const response = await axiosInstance.get(`/user/get-logged-user`);
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

// ✅ Get all users (admin only)
export const getAllUsers = async () => {
  try {
    const response = await axiosInstance.get(`/user/get-all-users`);
    return {
      success: true,
      data: response.data.data,
      count: response.data.count,
    };
  } catch (err) {
    return {
      success: false,
      message: err.response?.data?.message || err.message,
    };
  }
};

// ✅ Update user level/designation
export const updateLevel = async (id, newDesignation) => {
  try {
    const response = await axiosInstance.put(`/user/level/${id}`, {
      newDesignation,
    });
    return {
      success: true,
      data: response.data.user || response.data.data,
      message: response.data.message || "Designation updated successfully",
    };
  } catch (err) {
    return {
      success: false,
      message: err.response?.data?.message || err.message,
    };
  }
};

// ✅ Delete a user
export const deleteUser = async (id) => {
  try {
    const response = await axiosInstance.delete(`/user/delete/${id}`);
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

// ✅ Update user location
export const updateUserLocation = async (id, updates) => {
  try {
    const response = await axiosInstance.put(`/user/update-location/${id}`, updates);
    return {
      success: true,
      data: response.data.user || response.data.data,
      message: response.data.message || "User location updated successfully",
    };
  } catch (err) {
    return {
      success: false,
      message: err.response?.data?.message || err.message,
    };
  }
};

// ✅ Update logged-in user profile
export const updateUserProfile = async (updates) => {
  try {
    const response = await axiosInstance.put(`/user/update-profile`, updates);
    return {
      success: true,
      data: response.data.user || response.data.data,
      message: response.data.message || "Profile updated successfully",
    };
  } catch (err) {
    return {
      success: false,
      message: err.response?.data?.message || err.message,
    };
  }
};
