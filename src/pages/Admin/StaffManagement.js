import React, { useState, useEffect } from "react";
import Cookies from "js-cookie";
import { Button, IconButton } from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import SignUpForm from "../../components/SignUpForm";
import LoadingView from "../../services/loaderView";
import mainUrl from "../../utils/mainUrl";

const StaffManagement = () => {
  const [admins, setAdmins] = useState(null);
  const [doctors, setDoctors] = useState(null);
  const [nurses, setNurses] = useState(null);
  const [pharmacists, setPharmacists] = useState(null);
  const [userIds, setUserIds] = useState(null);

  const [showForm, setShowForm] = useState(false);

  const fetchUserIds = async () => {
    const url = `${mainUrl}/latest-user-ids`;
    const options = {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        authorization: "Bearer " + Cookies.get("jwtToken"),
      },
    };

    const response = await fetch(url, options);
    if (response.ok) {
      const { latestUserIds } = await response.json();
      setUserIds(latestUserIds);
    }
  };

  useEffect(() => {
    const fetchAdmins = async () => {
      const url = `${mainUrl}/users/admins`;
      const options = {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          authorization: "Bearer " + Cookies.get("jwtToken"),
        },
      };

      const response = await fetch(url, options);
      if (response.ok) {
        const { userDetails } = await response.json();
        setAdmins(userDetails);
      }
    };

    const fetchDoctors = async () => {
      const url = `${mainUrl}/users/doctors`;
      const options = {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          authorization: "Bearer " + Cookies.get("jwtToken"),
        },
      };

      const response = await fetch(url, options);
      if (response.ok) {
        const { userDetails } = await response.json();
        setDoctors(userDetails);
      }
    };

    const fetchNurses = async () => {
      const url = `${mainUrl}/users/nurses`;
      const options = {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          authorization: "Bearer " + Cookies.get("jwtToken"),
        },
      };

      const response = await fetch(url, options);
      if (response.ok) {
        const { userDetails } = await response.json();
        setNurses(userDetails);
      }
    };

    const fetchPharmacists = async () => {
      const url = `${mainUrl}/users/pharmacists`;
      const options = {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          authorization: "Bearer " + Cookies.get("jwtToken"),
        },
      };

      const response = await fetch(url, options);
      if (response.ok) {
        const { userDetails } = await response.json();
        setPharmacists(userDetails);
      }
    };

    fetchAdmins();
    fetchDoctors();
    fetchNurses();
    fetchPharmacists();
    fetchUserIds();
  }, []);

  if (!admins || !doctors || !nurses || !pharmacists) {
    return <LoadingView />;
  }

  return (
    <div className="p-4 bg-gray-100 min-h-screen">
      <div className="mb-8">
        <h3 className="text-xl font-semibold text-green-600 mb-2">
          RGUKT Hospital Administration
        </h3>
        <table className="min-w-full bg-white border border-gray-200">
          <thead>
            <tr className="font-semibold">
              <td className="py-2 px-4 border-b">Id</td>
              <td className="py-2 px-4 border-b">Username</td>
              <td className="py-2 px-4 border-b">Contact</td>
            </tr>
          </thead>
          <tbody>
            {admins &&
              admins.map((admin, index) => (
                <tr key={index} className="hover:bg-gray-100">
                  <td className="py-2 px-4 border-b">{admin.userId}</td>
                  <td className="py-2 px-4 border-b">{admin.username}</td>
                  <td className="py-2 px-4 border-b">{admin.email}</td>
                </tr>
              ))}
          </tbody>
        </table>
      </div>

      <div className="flex justify-evenly">
        <h2 className="text-2xl font-bold text-gray-800 mb-4">Staff Details</h2>
        {!showForm ? (
          <Button
            variant="contained"
            color="primary"
            sx={{ fontSize: "0.75rem", padding: "0px 12px" }}
            onClick={() => setShowForm(true)}
          >
            Add Staff
          </Button>
        ) : (
          <IconButton color="secondary" onClick={() => setShowForm(false)}>
            <CloseIcon />
          </IconButton>
        )}
      </div>

      {showForm && <SignUpForm userIds={userIds} fetchUserIds={fetchUserIds} />}

      <div className="mb-8">
        <h3 className="text-xl font-semibold text-blue-600 mb-2">Doctors</h3>
        <table className="min-w-full bg-white border border-gray-200">
          <thead>
            <tr className="font-semibold">
              <td className="py-2 px-4 border-b">Id</td>
              <td className="py-2 px-4 border-b">Username</td>
              <td className="py-2 px-4 border-b">Contact</td>
            </tr>
          </thead>
          <tbody>
            {doctors &&
              doctors.map((doctor, index) => (
                <tr key={index} className="hover:bg-gray-100">
                  <td className="py-2 px-4 border-b">{doctor.userId}</td>
                  <td className="py-2 px-4 border-b">{doctor.username}</td>
                  <td className="py-2 px-4 border-b">{doctor.email}</td>
                </tr>
              ))}
          </tbody>
        </table>
      </div>

      <div className="mb-8">
        <h3 className="text-xl font-semibold text-blue-600 mb-2">Nurses</h3>
        <table className="min-w-full bg-white border border-gray-200">
          <thead>
            <tr className="font-semibold">
              <td className="py-2 px-4 border-b">Id</td>
              <td className="py-2 px-4 border-b">Username</td>
              <td className="py-2 px-4 border-b">Contact</td>
            </tr>
          </thead>
          <tbody>
            {nurses &&
              nurses.map((nurse, index) => (
                <tr key={index} className="hover:bg-gray-100">
                  <td className="py-2 px-4 border-b">{nurse.userId}</td>
                  <td className="py-2 px-4 border-b">{nurse.username}</td>
                  <td className="py-2 px-4 border-b">{nurse.email}</td>
                </tr>
              ))}
          </tbody>
        </table>
      </div>

      <div className="mb-8">
        <h3 className="text-xl font-semibold text-blue-600 mb-2">
          Pharmacists
        </h3>
        <table className="min-w-full bg-white border border-gray-200">
          <thead>
            <tr className="font-semibold">
              <td className="py-2 px-4 border-b">Id</td>
              <td className="py-2 px-4 border-b">Username</td>
              <td className="py-2 px-4 border-b">Contact</td>
            </tr>
          </thead>
          <tbody>
            {pharmacists &&
              pharmacists.map((pharmacist, index) => (
                <tr key={index} className="hover:bg-gray-100">
                  <td className="py-2 px-4 border-b">{pharmacist.userId}</td>
                  <td className="py-2 px-4 border-b">{pharmacist.username}</td>
                  <td className="py-2 px-4 border-b">{pharmacist.email}</td>
                </tr>
              ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default StaffManagement;
