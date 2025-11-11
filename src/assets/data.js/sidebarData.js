import { 
  FiUserCheck,FiBell,FiSettings, FiAlertCircle, FiUser,} from "react-icons/fi";
import { MdOutlineDashboard } from "react-icons/md";
import { GoReport } from 'react-icons/go';
import { BiSolidReport } from "react-icons/bi";

export const sidebarData = {
  1: [
    { label: "Report", icon: BiSolidReport, path: "/reports", badgeKey: "report" },
    { label: "Incidents", icon: GoReport, path: "/incidents", badgeKey: "incidentCount" },
    { label: "Notifications", icon: FiBell, path: "/notifications", badgeKey: "unreadNotifications" },
    { label: "Profile", icon: FiUser, path: "/profile", hideOnBottomTab: true },
    { label: "Settings", icon: FiSettings, path: "/settings", hideOnBottomTab: true },
  ],
  
  2: [
    { label: "Dashboard", icon: MdOutlineDashboard, path: "/dashboard" },
    { label: "Incidents", icon: GoReport, path: "/incidents", badgeKey: "incidentCount" },
    { label: "Report", icon: BiSolidReport, path: "/reports", badgeKey: "report" },
    { label: "Notifications", icon: FiBell, path: "/notifications", badgeKey: "unreadNotifications" },
    { label: "Inspectors", icon: FiUserCheck, path: "/inspectors" },
    { label: "Profile", icon: FiUser, path: "/profile", hideOnBottomTab: false },
    { label: "Settings", icon: FiSettings, path: "/settings", hideOnBottomTab: true },
  ],

  3: [
    { label: "Dashboard", icon: MdOutlineDashboard, path: "/dashboard" },
    { label: "Incidents", icon: GoReport, path: "/incidents", badgeKey: "incidentCount" },
    { label: "Report", icon: BiSolidReport, path: "/reports", badgeKey: "report" }, 
    { label: "Notifications", icon: FiBell, path: "/notifications", badgeKey: "unreadNotifications" },
    { label: "Inspectors", icon: FiUserCheck, path: "/inspectors" },
    { label: "Profile", icon: FiUser, path: "/profile", },
    { label: "Settings", icon: FiSettings, path: "/settings", hideOnBottomTab: true }, 
  ],

  4: [
    { label: "Dashboard", icon: MdOutlineDashboard, path: "/dashboard" },
    { label: "Report", icon: BiSolidReport, path: "/reports", badgeKey: "report" },
    { label: "Incidents", icon: FiAlertCircle, path: "/incidents", badgeKey: "incidentCount" },
    { label: "Notifications", icon: FiBell, path: "/notifications", badgeKey: "unreadNotifications" },
    { label: "Inspectors", icon: FiUserCheck, path: "/inspectors" },
    { label: "Admin", icon: FiUser, path: "/profile", },
    { label: "Settings", icon: FiSettings, path: "/settings", hideOnBottomTab: true },
  ],
};
