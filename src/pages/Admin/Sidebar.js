import React from "react";
import "../../css/Sidebar.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faThLarge, faTimes } from "@fortawesome/free-solid-svg-icons";

const Sidebar = ({
  selectedSection,
  setSelectedSection,
  isSidebarOpen,
  setIsSidebarOpen,
}) => {
  const sections = [
    { name: "Profile", icon: "fas fa-user", key: "Profile" },
    {
      name: "Students Management",
      icon: "fas fa-user-graduate",
      key: "StudentDetails",
    },
    {
      name: "Staff Management",
      icon: "fas fa-user-md",
      key: "StaffManagement",
    },
    {
      name: "Patients History",
      icon: "fas fa-user-injured",
      key: "PatientsHistory",
    },
    { name: "Inventory", icon: "fas fa-boxes", key: "InventoryManagement" },
    {
      name: "Reports and Analytics",
      icon: "fas fa-chart-line",
      key: "ReportsAndAnalytics",
    },
    {
      name: "Daily Overview",
      icon: "fas fa-calendar-day",
      key: "SummaryOfTheDay",
    },
  ];

  return (
    <>
      <div className={`sidebar ${isSidebarOpen ? "show" : ""}`}>
        <ul className="list-none p-0">
          {sections.map((section) => (
            <li
              key={section.key}
              className={`flex items-center px-4 py-2 cursor-pointer ${
                selectedSection === section.key
                  ? "bg-gray-700"
                  : "hover:bg-gray-700"
              }`}
              onClick={() => {
                setSelectedSection(section.key);
                if (window.innerWidth <= 768) {
                  setIsSidebarOpen(false); // Close sidebar on item click (small screens)
                }
              }}
            >
              <i className={`${section.icon} mr-3`}></i> {section.name}
            </li>
          ))}
        </ul>
      </div>
      <button
        className="sidebar-toggle"
        onClick={() => setIsSidebarOpen(!isSidebarOpen)}
      >
        <FontAwesomeIcon icon={isSidebarOpen ? faTimes : faThLarge} />
      </button>
    </>
  );
};

export default Sidebar;
