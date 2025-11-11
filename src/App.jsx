import React from "react";
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import LoginPage from "./pages/auth/Login";
import ForgotPassword from "./pages/auth/ForgotPass";
import Signup from "./pages/auth/Signup";
import ProtectedRoute from "./pages/auth/protectedRoute";
import Incident from "./pages/incident/Incident";
import Home from "./pages/Home";
import Dashboard from './pages/dashboards/Dashboard'
import LandingPage from "./pages/LandingPage";
import Agents from "./pages/agent/Agents";
import Settings from "./pages/settings/Settings";
import Profile from "./pages/profile/Profile";
import Notifications from "./pages/notification/Notifications";
import Reports from "./pages/reports/Reports";
import ReportForm from "./pages/auth/ReportForm";




export default function App() {

  return (
 
      <div className="relative flex items- h-screen">
        <ToastContainer 
          position="top-right" 
          autoClose={3000} 
          hideProgressBar={false} 
          newestOnTop={true} 
          closeOnClick 
          rtl={false} 
          pauseOnFocusLoss 
          draggable 
          pauseOnHover 
        />
        <div className="flex-1 bg-gray-200 h-[100vh_-_40px] overflow-y-auto">
          <Routes>
              <Route path="/" element={<LandingPage />} />
              <Route path="/reporting" element={<ReportForm />} />
              <Route path="/login" element={<LoginPage />} />
              <Route path="/register" element={<Signup />} />
              <Route path="/forgot-password" element={<ForgotPassword />} />

           
              
             {/* Protected routes */}
             <Route
               element={
                 <ProtectedRoute>
                  <Home />
                </ProtectedRoute>
               }
             >
                {/* Nested routes under DashboardLayout */}
                 <Route path="/dashboard" element={<Dashboard />} />
                 <Route path="/reports" element={<Reports />} />
                 <Route path="/incidents" element={<Incident />} />
                 <Route path="/notifications" element={<Notifications />} />
                  <Route path="/inspectors" element={<Agents />} />
                 <Route path="/profile" element={<Profile />} />
                  <Route path="/settings" element={<Settings />} />

                
                 

               { /* Add more protected pages here */}
             </Route>
            
          </Routes>
        </div>
      </div>
   
  );
}


//<Sidebar role={userRole} />