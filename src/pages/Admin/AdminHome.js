import React, { useState } from "react";
import Header from "../../components/Header";
import { AdminHeaderContent } from "../../store/data";
import Sidebar from "./Sidebar";
import ProfileComponent from "../../components/ProfileComponent";
import PatientsHistory from "./PatientManagement";
import StaffManagement from "./StaffManagement";
import InventoryManagement from "./InventoryManagement";
import ReportsAndAnalytics from "./ReportsAndAnalytics";
import StudentManagement from "./StudentManagement";
import "../../css/AdminHome.css";
import SummaryOfDay from "./SummaryOfDay";

const AdminHome = () => {
  const [selectedSection, setSelectedSection] = useState("Profile");
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const renderContent = () => {
    switch (selectedSection) {
      case "Profile":
        return <ProfileComponent user="admin" />;
      case "PatientsHistory":
        return <PatientsHistory />;
      case "StaffManagement":
        return <StaffManagement />;
      case "InventoryManagement":
        return <InventoryManagement />;
      case "ReportsAndAnalytics":
        return <ReportsAndAnalytics />;
      case "StudentDetails":
        return <StudentManagement />;
      case "SummaryOfTheDay":
        return <SummaryOfDay />;
      default:
        return (
          <div>
            <h1>Welcome to the Hospital Management Dashboard</h1>
            <p>Select an option from the sidebar to get started.</p>
          </div>
        );
    }
  };

  return (
    <>
      <Header headerContent={AdminHeaderContent} />
      <div className="dashboard-container">
        <Sidebar
          setSelectedSection={setSelectedSection}
          isSidebarOpen={isSidebarOpen}
          setIsSidebarOpen={setIsSidebarOpen}
        />
        <div className={`dashboard-main ${isSidebarOpen ? "expanded" : ""}`}>
          <h1 className="dashboard-heading">
            <i className="mr-2 fas fa-tachometer-alt"></i>
            Dashboard
          </h1>
          <div>{renderContent()}</div>
        </div>
      </div>
    </>
  );
};

export default AdminHome;
