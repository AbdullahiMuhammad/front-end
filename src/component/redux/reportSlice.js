// src/component/redux/reportSlice.js
import { createSlice } from "@reduxjs/toolkit";

const reportSlice = createSlice({
  name: "report",
  initialState: {
    reports: [],
    lastChecked: null, // timestamp of last check
  },
  reducers: {
    setReports: (state, action) => {
      state.reports = action.payload;
    },
    markChecked: (state) => {
      state.lastChecked = new Date().toISOString();
    },
  },
});

export const { setReports, markChecked } = reportSlice.actions;
export default reportSlice.reducer;
