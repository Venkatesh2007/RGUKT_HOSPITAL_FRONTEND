import React, { useState } from "react";
import * as XLSX from "xlsx";
import Cookies from "js-cookie";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import mainUrl from "../utils/mainUrl";

const StudentDetails = () => {
  const [file, setFile] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!file) {
      toast.warning("Please select a file first!");
      return;
    }

    setLoading(true);

    const reader = new FileReader();
    reader.onload = async (e) => {
      const data = new Uint8Array(e.target.result);
      const workbook = XLSX.read(data, { type: "array" });

      const sheetName = workbook.SheetNames[0];
      const sheet = workbook.Sheets[sheetName];
      let studentsData = XLSX.utils.sheet_to_json(sheet);

      const excelDateToJSDate = (serial) => {
        const excelEpoch = new Date(Date.UTC(1899, 11, 30));
        return new Date(excelEpoch.getTime() + serial * 86400000);
      };

      studentsData = studentsData.map((student) => {
        if (typeof student.DOB === "number") {
          student.DOB = excelDateToJSDate(student.DOB);
        }

        return { ...student, studentId: student.studentId.toUpperCase() };
      });

      const url = `${mainUrl}/student-details`;
      const options = {
        method: "POST",
        headers: {
          "content-type": "application/json",
          authorization: "Bearer " + Cookies.get("jwtToken"),
        },
        body: JSON.stringify({ studentsData }),
      };
      const response = await fetch(url, options);
      setLoading(false);
      if (response.ok) {
        const { message } = await response.json();
        toast.success(message);
      } else {
        const { message } = await response.json();
        toast.error(message);
      }
    };

    reader.readAsArrayBuffer(file);
  };

  return (
    <>
      <main className="mx-auto max-w-screen-lg p-4">
        <ToastContainer />
        <h1 className="mb-3 text-2xl font-semibold text-blue-600 text-center">
          Add Students Here
        </h1>
        <form
          onSubmit={handleSubmit}
          className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4"
        >
          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-bold mb-2">
              Choose Excel File (XLSX/XLS)
            </label>
            <input
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              type="file"
              accept=".xlsx, .xls"
              onChange={handleFileChange}
            />
          </div>
          <div className="flex items-center justify-between">
            <button
              className={`bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline ${
                loading ? "opacity-50 cursor-not-allowed" : ""
              }`}
              type="submit"
              disabled={loading}
            >
              {loading ? (
                <svg className="animate-spin h-5 w-5 mr-3" viewBox="0 0 24 24">
                  <circle
                    className="opacity-25"
                    cx="12"
                    cy="12"
                    r="10"
                    stroke="currentColor"
                    strokeWidth="4"
                  ></circle>
                  <path
                    className="opacity-75"
                    fill="currentColor"
                    d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                  ></path>
                </svg>
              ) : (
                "Upload"
              )}
            </button>
          </div>
        </form>
      </main>
    </>
  );
};

export default StudentDetails;
