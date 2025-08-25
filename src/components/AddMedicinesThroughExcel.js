import React, { useState } from "react";
import * as XLSX from "xlsx";
import CircularProgress from "@mui/material/CircularProgress";
import Cookies from "js-cookie";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import mainUrl from "../utils/mainUrl";

const AddMedicinesThroughExcel = () => {
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
      let newMedicines = XLSX.utils.sheet_to_json(sheet);

      console.log(newMedicines);

      // Function to convert Excel date serial number to JavaScript Date object
      const excelDateToJSDate = (serial) => {
        const excelEpoch = new Date(Date.UTC(1899, 11, 30));
        return new Date(excelEpoch.getTime() + serial * 86400000);
      };

      newMedicines = newMedicines.map((med) => {
        if (typeof med.EXP === "number") {
          med.EXP = excelDateToJSDate(med.EXP);
        }
        return {
          name: med["PRODUCT NAME"].toLowerCase(),
          batchNo: med["B.NO"],
          expiryDate: med.EXP,
          importDate: new Date(),
          quantity: med.QTY,
        };
      });

      try {
        const url = `${mainUrl}/medicines`;
        const options = {
          method: "POST",
          headers: {
            "content-type": "application/json",
            authorization: "Bearer " + Cookies.get("jwtToken"),
          },
          body: JSON.stringify({ newMedicines }),
        };
        const response = await fetch(url, options);
        if (response.ok) {
          const { message } = await response.json();
          setFile(null);
          toast.success(message);
        } else {
          const { message } = await response.json();
          toast.error(message);
        }
      } catch (error) {
        toast.error("Error uploading Data");
      } finally {
        setLoading(false);
      }
    };

    reader.readAsArrayBuffer(file);
  };

  return (
    <main className="mx-auto max-w-screen-lg p-4">
      <ToastContainer />
      <h1 className="text-3xl font-bold text-center">Add Medicines Here </h1>
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
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
            type="submit"
            disabled={loading}
          >
            {loading ? (
              <div className="flex items-center justify-center">
                <CircularProgress size={20} thickness={4} />
                <span className="ml-2">Uploading...</span>
              </div>
            ) : (
              "Upload"
            )}
          </button>
        </div>
      </form>
    </main>
  );
};

export default AddMedicinesThroughExcel;
