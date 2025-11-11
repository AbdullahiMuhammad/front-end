import axiosInstance from "./api";

// ✅ Get all reports
export const getAllReports = async () => {
  try {
    const response = await axiosInstance.get("/report");
    return {
      success: true,
      data: response.data.data || response.data, // support backend wrapping
      count: response.data.count || (response.data.data?.length || response.data.length || 0),
    };
  } catch (err) {
    return {
      success: false,
      message: err.response?.data?.message || err.message,
    };
  }
};

// ✅ Create a new report
export const createReport = async (report) => {
  try {
    const response = await axiosInstance.post("/report", report);
    return {
      success: true,
      data: response.data.data || response.data,
      message: response.data.message || "Report created successfully",
    };
  } catch (err) {
    return {
      success: false,
      message: err.response?.data?.message || err.message,
    };
  }
};

// ✅ Update a report
export const updateReport = async (id, updates) => {
  try {
    const response = await axiosInstance.put(`/report/${id}`, updates);
    return {
      success: true,
      data: response.data.data || response.data,
      message: response.data.message || "Report updated successfully",
    };
  } catch (err) {
    return {
      success: false,
      message: err.response?.data?.message || err.message,
    };
  }
};

// ✅ Delete a report
export const deleteReport = async (id) => {
  try {
    const response = await axiosInstance.delete(`/report/${id}`);
    return {
      success: true,
      message: response.data.message || "Report deleted successfully",
    };
  } catch (err) {
    return {
      success: false,
      message: err.response?.data?.message || err.message,
    };
  }
};
