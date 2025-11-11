// redux/incidentSlice.js
import { createSlice } from "@reduxjs/toolkit";


const initialState = {
    incidents: [],
    selectedIncident: null,
  }
const incidentSlice = createSlice({
  name: "incidents",
  initialState,
  reducers: {
    setIncidents: (state, action) => { state.incidents = action.payload; },
    setSelectedIncident: (state, action) => { state.selectedIncident = action.payload; },
  },
});

export const { setIncidents, setSelectedIncident } = incidentSlice.actions;
export default incidentSlice.reducer;
