import React from "react";
import { Link, useLocation } from "react-router-dom";
import { useSelector } from "react-redux";
import { sidebarData } from "../../assets/data.js/sidebarData";
import logo from "../../assets/logo.png";

// Badge Component
const Badge = ({ value }) => (
  value && (
    <span className="absolute -top-2 -right-2 bg-yellow-400 text-black text-xs font-bold px-2 py-0.5 rounded-full min-w-[20px] text-center">
      {value > 99 ? "99+" : value}
    </span>
  )
);

// Sidebar Item Component
const SidebarItem = ({ item, isActive, badgeValue, hideLabel }) => (
  <li>
    <Link
      to={item.path}
      className={`flex items-center gap-3 p-3 rounded ${
        isActive ? "bg-green-700" : "hover:bg-green-500/30"
      }`}
    >
      <div className="relative">
        <item.icon size={24} />
        <Badge value={badgeValue} />
      </div>
      {!hideLabel && <span className="text-lg">{item.label}</span>}
    </Link>
  </li>
);

const Sidebar = ({ badges = { unreadNotifications: 5, report: 10, incidentCount: 2 } }) => {
  const location = useLocation();
  const { user } = useSelector((state) => state.user);

  if (!user) return null; // Wait for user to load

  // Ensure number/string consistency
  const levelKey = String(user.level);
  const items = sidebarData[levelKey] || [];
  if (!items.length) return null;

  return (
    <>
      {/* Desktop / Large Screens Sidebar */}
      <div className="hidden lg:flex flex-col w-54 h-screen bg-green-900 text-white fixed top-0 left-0">
        <div className="h-16 flex items-center gap-3 justify-start p-3">
          <img src={logo} alt="logo" width={40} height={40} />
          <h2 className="text-white font-bold text-xl">NMDPR</h2>
        </div>

        <ul className="flex-1 flex flex-col gap-1 w-full overflow-y-auto">
          {items.map((item, index) => {
            if (item.hideOnSidebar) return null;
            const isActive = location.pathname === item.path;
            const badgeValue = item.badgeKey ? badges[item.badgeKey] : null;

            return (
              <SidebarItem
                key={index}
                item={item}
                isActive={isActive}
                badgeValue={badgeValue}
                hideLabel={false}
              />
            );
          })}
        </ul>
      </div>

      {/* Mobile Bottom Tabs */}
      <div className="fixed bottom-0 left-0 w-full h-16 bg-green-900 text-white flex justify-around lg:hidden">
        {items.map((item, index) => {
          // Hide items for mobile bottom tab (e.g., Profile)
          if (item.hideOnBottomTab || item.label === "Settings") return null;

          const isActive = location.pathname === item.path;
          const badgeValue = item.badgeKey ? badges[item.badgeKey] : null;

          return (
            <Link
              key={index}
              to={item.path}
              className={`flex flex-col items-center justify-center text-xs ${
                isActive ? "text-yellow-400" : "text-white"
              }`}
            >
              <div className="relative">
                <item.icon size={24} />
                <Badge value={badgeValue} />
              </div>
              <span className="mt-1">{item.label}</span>
            </Link>
          );
        })}
      </div>
    </>
  );
};

export default Sidebar;
