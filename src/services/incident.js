// services/incident.js

import axiosInstance from "./api";

export const getAllIncident = async () => {
  try {
    const response = await axiosInstance.get("/incident");

    return {
        success: true,
        data: response.data.data
    }
  } catch (err) {
    return {
      success: false,
      message: err.response?.data?.message || err.message,
    };
  }
};


export const createIncident = async (incident) => {
  try {
    const response = await axiosInstance.post("/incident", incident);
    return {
      success: true,
      data: response.data.data || response.data, // created incident
      message: response.data.message || "Incident created successfully",
    };
  } catch (err) {
    return {
      success: false,
      message: err.response?.data?.message || err.message,
    };
  }
};


// ✅ Update an incident
export const updateIncident = async (id, updates) => {
  try {
    const response = await axiosInstance.put(`/incident/${id}`, updates);
    return {
      success: true,
      data: response.data.data || response.data, // updated incident
      message: response.data.message || "Incident updated successfully",
    };
  } catch (err) {
    return {
      success: false,
      message: err.response?.data?.message || err.message,
    };
  }
};

// ✅ Delete an incident
export const deleteIncident = async (id) => {
  try {
    const response = await axiosInstance.delete(`/incident/${id}`);
    return {
      success: true,
      message: response.data.message || "Incident deleted successfully",
      id, // return deleted ID for Redux update
    };
  } catch (err) {
    return {
      success: false,
      message: err.response?.data?.message || err.message,
    };
  }
};
