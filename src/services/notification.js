
// ✅ Get all users (admin only)
export const getNotification = async () => {
  try {
    const response = await axiosInstance.get(`/notification`);
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