import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { getAllUsers, getLoggedUser } from "../../services/user.js";
import { setUser, setUsers } from "../../component/redux/userSlice.js";
import { getAllReports } from "../../services/report.js";
import { setReports } from "../../component/redux/reportSlice.js";
import { getAllIncident } from "../../services/incident.js";
import { setIncidents } from "../../component/redux/incidentsSlice.js";
import { getNotification } from "../../services/notification.js";
import { setNotifications } from "../../component/redux/notificationSlice.js";

function ProtectedRoute({ children }) {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(true);

  // Redux slices
  const user = useSelector((state) => state.user.user); // initialize user as null in slice
  const users = useSelector((state) => state.user.users);
  const reports = useSelector((state) => state.report.reports);
  const incidents = useSelector((state) => state.incident.incidents);
  console.log(users)
  // ✅ Fetch logged-in user
  const fetchLoggedUser = async () => {
    try {
      const res = await getLoggedUser();
      if (res?.success) dispatch(setUser(res.data));
      else throw new Error("Failed to fetch user");
    } catch (err) {
      console.error("Error fetching logged user:", err);
      navigate("/login");
      throw err; // re-throw to stop further fetching
    }
  };

  // ✅ Fetch all users
  const fetchAllUsers = async () => {
    try {
      const res = await getAllUsers();
      if (res?.success && Array.isArray(res.data)) dispatch(setUsers(res.data));
      else dispatch(setUsers([]));
    } catch (err) {
      console.error("Error fetching all users:", err);
      dispatch(setUsers([]));
    }
  };

  // ✅ Fetch all reports
  const fetchAllReports = async () => {
    try {
      const res = await getAllReports();
      if (res?.success && Array.isArray(res.data)) dispatch(setReports(res.data));
      else dispatch(setReports([]));
    } catch (err) {
      console.error("Error fetching reports:", err);
      dispatch(setReports([]));
    }
  };

  // ✅ Fetch all incidents
  const fetchAllIncidents = async () => {
    try {
      const res = await getAllIncident();
      if (res?.success && Array.isArray(res.data)) dispatch(setIncidents(res.data));
      else dispatch(setIncidents([]));
    } catch (err) {
      console.error("Error fetching incidents:", err);
      dispatch(setIncidents([]));
    }
  };

  // ✅ Fetch notifications
  const fetchNotifications = async () => {
    try {
      const res = await getNotification();
      if (res?.success && Array.isArray(res.data)) dispatch(setNotifications(res.data));
      else dispatch(setNotifications([]));
    } catch (err) {
      console.error("Error fetching notifications:", err);
      dispatch(setNotifications([]));
    }
  };

  // ✅ Initialize all data once on mount
  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) {
      navigate("/login");
      return;
    }

    const init = async () => {
      try {
        await fetchLoggedUser();
        await fetchAllUsers();
        await fetchAllReports();
        await fetchAllIncidents();
        await fetchNotifications();
      } catch (err) {
        console.error("Protected route initialization error:", err);
      } finally {
        setLoading(false);
      }
    };

    init();
  }, [navigate]);

  if (loading) {
    return (
      <div
        style={{
          width: "100%",
          height: "100vh",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          fontSize: "18px",
          fontWeight: "500",
        }}
      >
        Loading...
      </div>
    );
  }

  return <>{children}</>;
}

export default ProtectedRoute;
