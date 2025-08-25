import { BrowserRouter, Routes, Route } from "react-router-dom";
import LoginPage from "./pages/LoginPage";
import HomePage from "./pages/HomePage";
import PharmacistsHome from "./pages/Pharmacist/PharmacistHome.js";
import DoctorsHome from "./pages/Doctor/DoctorsHome";
import AddMedicines from "./pages/Pharmacist/PharmacistAddMedicines.js";
import AdminHome from "./pages/Admin/AdminHome.js";
import AddStudents from "./pages/Admin/StudentManagement.js";
import NursingHome from "./pages/Nurse/NurseHome1.js";
import NursingSecondPage from "./pages/Nurse/NurseHome2.js";
import ProtectedRoute from "./protected/ProtectedRoute";
import CheckAlreadyLogged from "./protected/CheckAlreadyLogged.js";
import ForgotPassword from "./pages/ForgotPassword.js";
import PharmacistProfile from "./pages/Pharmacist/PharmacistProfile.js";
import NurseProfile from "./pages/Nurse/NurseProfile.js";
import DoctorProfile from "./pages/Doctor/DoctorProfile.js";
import PharmacistMedicinesView from "./pages/Pharmacist/PharmacistMedicinesView.js";
import Others from "./pages/Doctor/Others.js";
function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<CheckAlreadyLogged component={HomePage} />} />
        <Route path="/forgot-password" element={<ForgotPassword />} />

        <Route path="/login" element={<LoginPage />} />

        <Route
          path="/doctor"
          element={
            <ProtectedRoute component={DoctorsHome} requiredRole="doctor" />
          }
        />
        <Route
          path="/doctor/others"
          element={<ProtectedRoute component={Others} requiredRole="doctor" />}
        />
        <Route
          path="/doctor/profile"
          element={
            <ProtectedRoute component={DoctorProfile} requiredRole="doctor" />
          }
        />

        <Route
          path="/pharmacist"
          element={
            <ProtectedRoute
              component={PharmacistsHome}
              requiredRole="pharmacist"
            />
          }
        />
        <Route
          path="/pharmacist/add-medicines"
          element={
            <ProtectedRoute
              component={AddMedicines}
              requiredRole="pharmacist"
            />
          }
        />
        <Route
          path="/pharmacist/view-medicines"
          element={
            <ProtectedRoute
              component={PharmacistMedicinesView}
              requiredRole="pharmacist"
            />
          }
        />
        <Route
          path="/pharmacist/profile"
          element={
            <ProtectedRoute
              component={PharmacistProfile}
              requiredRole="pharmacist"
            />
          }
        />

        <Route
          path="/admin"
          element={
            <ProtectedRoute component={AdminHome} requiredRole="admin" />
          }
        />
        <Route
          path="/admin/add-students"
          element={
            <ProtectedRoute component={AddStudents} requiredRole="admin" />
          }
        />

        <Route
          path="/nurse"
          element={
            <ProtectedRoute component={NursingHome} requiredRole="nurse" />
          }
        />
        <Route
          path="/nurse/patient-details"
          element={
            <ProtectedRoute
              component={NursingSecondPage}
              requiredRole="nurse"
            />
          }
        />
        <Route
          path="/nurse/profile"
          element={
            <ProtectedRoute component={NurseProfile} requiredRole="nurse" />
          }
        />

        <Route path="/unauthorized" element={<div>Unauthorized Access</div>} />
        <Route path="*" element={<h1>Page Not Found</h1>} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
