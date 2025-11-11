import { configureStore } from "@reduxjs/toolkit";
import userSlice from './userSlice';
import incidentSlice from './incidentsSlice'
import selectSlice from './selectSlice'
import reportReducer from './reportSlice'
import notificationSlice from "./notificationSlice";

const store = configureStore({
    reducer: {
        user: userSlice ,
        select: selectSlice,
        incident: incidentSlice,
        report: reportReducer,
        notification : notificationSlice
    
    }
})




export default store;