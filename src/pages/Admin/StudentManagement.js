import SearchTwoTone from "@mui/icons-material/SearchTwoTone";
import React, { useState } from "react";
import Cookies from "js-cookie";
import calculateAge from "../../services/calculateAge";
import "../../components/AddStudentDetails";
import StudentDetails from "../../components/AddStudentDetails";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import mainUrl from "../../utils/mainUrl";

const StudentManagement = () => {
  const [studentData, setStudentData] = useState(null);
  const [searchInput, setSearchInput] = useState("");
  const [notFound, setNotFound] = useState(false);

  const submitBtn = async () => {
    if (searchInput.length === 7) {
      const studentDetailsUrl = `${mainUrl}/student-details?studentId=${searchInput.toUpperCase()}`;
      const options = {
        method: "GET",
        headers: {
          "content-type": "application/json",
          authorization: "Bearer " + Cookies.get("jwtToken"),
        },
      };
      try {
        const response = await fetch(studentDetailsUrl, options);
        if (response.ok) {
          const { studentInfo } = await response.json();
          setStudentData(studentInfo);
          setNotFound(false);
        } else {
          const { message } = await response.json();
          setStudentData(null);
          toast.error(message);
        }
      } catch (error) {
        toast.error("An error occurred while fetching student details.");
      }
    } else {
      setStudentData(null);
      setNotFound(false);
      toast.warning("Please enter a valid Student ID!");
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 p-4 flex flex-col items-center">
      <ToastContainer />
      <section className="mb-6 w-full max-w-lg">
        <div className="flex items-center bg-white p-3 rounded-lg shadow-md">
          <input
            type="search"
            placeholder="Search by Student ID"
            className="flex-grow p-2 border-none outline-none text-gray-700"
            value={searchInput}
            onChange={(event) => setSearchInput(event.target.value)}
          />
          <button
            className="bg-blue-500 hover:bg-blue-600 text-white p-2 rounded-lg ml-2"
            onClick={submitBtn}
          >
            <SearchTwoTone />
          </button>
        </div>
      </section>
      {studentData ? (
        <div className="bg-white p-6 rounded-lg shadow-lg w-full max-w-lg">
          <h1 className="mb-2 text-xl font-bold text-gray-800">
            <strong>Student ID: </strong>
            {studentData.studentId}
          </h1>
          <h1 className="mb-2 text-lg text-gray-700">
            <strong>Name: </strong>
            {studentData.name}
          </h1>
          <h1 className="mb-2 text-lg text-gray-700">
            <strong>Age: </strong>
            {calculateAge(studentData.DOB)}
          </h1>
          <h1 className="mb-2 text-lg text-gray-700">
            <strong>Gender: </strong>
            {studentData.gender}
          </h1>
          <h1 className="mb-2 text-lg text-gray-700">
            <strong>Blood Group: </strong>
            {studentData.bloodGroup}
          </h1>
          <h1 className="mb-2 text-lg text-gray-700">
            <strong>Parent Contact: </strong>
            {studentData.parentContact}
          </h1>
        </div>
      ) : (
        notFound && (
          <div className="bg-white p-6 rounded-lg shadow-lg w-full max-w-lg text-center">
            <h1 className="text-xl text-red-500">Student not found</h1>
          </div>
        )
      )}
      <StudentDetails />
    </div>
  );
};

export default StudentManagement;
