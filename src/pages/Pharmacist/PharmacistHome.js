import React, { useState, useEffect, useRef } from "react";
import Header from "../../components/Header";
import { PharmacistsHeaderContent } from "../../store/data";
import Cookies from "js-cookie";
import { Button } from "@mui/material";
import SearchTwoToneIcon from "@mui/icons-material/SearchTwoTone";
import ReactToPrint from "react-to-print";
import PrintablePatient from "../../components/PrintPrescription";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import LoadingView from "../../services/loaderView";
import mainUrl from "../../utils/mainUrl";

function PharmacistsHome() {
  const [patientsList, setPatientsList] = useState([]);
  const [searchInput, setSearchInput] = useState("");
  const printRefs = useRef({});

  useEffect(() => {
    const fetchPatientsList = async () => {
      try {
        const url1 = `${mainUrl}/treatments/pharmacist`;
        const url2 = `${mainUrl}/others/treatments`;

        const options = {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            authorization: `Bearer ${Cookies.get("jwtToken")}`,
          },
        };

        const [response1, response2] = await Promise.all([
          fetch(url1, options),
          fetch(url2, options),
        ]);

        if (!response1.ok) {
          throw new Error(
            `Failed to fetch from ${url1}: ${response1.statusText}`
          );
        }
        if (!response2.ok) {
          return;
        }

        const { studentTreatments } = await response1.json();
        const { otherTreatments } = await response2.json();

        const combinedPatientsList = [...studentTreatments, ...otherTreatments];
        setPatientsList(combinedPatientsList);
      } catch (error) {
        toast.error(`Error fetching patients: ${error.message}`);
      }
    };

    fetchPatientsList();
  }, []);

  const submitBtn = (medicinesWritten, treatmentId, name) => async () => {
    console.log(name);
    let url;
    if (name) url = `${mainUrl}/others/treatments/${treatmentId}`;
    else url = `${mainUrl}/treatments/pharmacist-update/${treatmentId}`;
    const options = {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        authorization: `Bearer ${Cookies.get("jwtToken")}`,
      },
      body: JSON.stringify({
        medicinesWritten,
      }),
    };
    try {
      const response = await fetch(url, options);
      if (response.ok) {
        const { message } = await response.json();
        toast.success(message);

        // Update patientsList state after issuing medicines
        const updatedPatientsList = patientsList.filter(
          (patient) => patient._id !== treatmentId
        );
        setPatientsList(updatedPatientsList);
      } else {
        const { message } = await response.json();
        toast.error(message);
      }
    } catch (error) {
      console.error("Error issuing medicines:", error);
    }
  };

  if (!patientsList) {
    return <LoadingView />;
  }

  console.log(patientsList);

  const filteredPatientsList = patientsList.filter(
    (item) =>
      (item.studentId &&
        item.studentId.toLowerCase().includes(searchInput.toLowerCase())) ||
      (item.name && item.name.toLowerCase().includes(searchInput.toLowerCase()))
  );

  return (
    <main className="min-h-screen bg-gray-100">
      <ToastContainer />
      <Header headerContent={PharmacistsHeaderContent} />
      <main className="p-6">
        <h1 className="text-3xl font-bold text-center mb-6">Pharmacist Home</h1>
        <section className="mb-6">
          <div className="flex items-center bg-white p-3 rounded-lg shadow-md max-w-md mx-auto">
            <input
              type="search"
              placeholder="Search by Student ID"
              className="flex-grow p-2 border-none outline-none"
              value={searchInput}
              onChange={(event) => setSearchInput(event.target.value)}
            />
            <SearchTwoToneIcon className="text-gray-500" />
          </div>
        </section>
        {filteredPatientsList.length === 0 ? (
          <p className="text-center text-gray-600">No patients found</p>
        ) : (
          <ul className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredPatientsList.map((item) => (
              <li
                key={item._id}
                className="bg-white p-4 rounded-lg shadow-md flex flex-col justify-between"
              >
                <div>
                  {item.studentId ? (
                    <h2 className="text-xl font-semibold mb-2">
                      Student ID: {item.studentId}
                    </h2>
                  ) : (
                    <h2 className="text-xl font-semibold mb-2">
                      Name: {item.name}
                    </h2>
                  )}
                  <p className="text-gray-600 mb-2">Reason: {item.reason}</p>
                  <div className="mb-2">
                    <p className="font-semibold">Medicines:</p>
                    <ul className="list-disc list-inside">
                      {item.medicinesWritten.map((medicine, index) => (
                        <li key={index}>
                          {medicine.name} - {medicine.quantity}
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
                <div className="flex justify-between">
                  <Button
                    color="secondary"
                    variant="contained"
                    onClick={submitBtn(
                      item.medicinesWritten,
                      item._id,
                      item.name
                    )}
                  >
                    Issue Of Medicine
                  </Button>
                  <ReactToPrint
                    trigger={() => (
                      <Button color="success" variant="contained">
                        Print
                      </Button>
                    )}
                    content={() => printRefs.current[item._id]}
                    documentTitle="Patient Details"
                    pageStyle="@page { size: auto; margin: 20mm; }"
                  />
                </div>
                <div style={{ display: "none" }}>
                  <PrintablePatient
                    ref={(el) => (printRefs.current[item._id] = el)}
                    patient={item}
                  />
                </div>
              </li>
            ))}
          </ul>
        )}
      </main>
    </main>
  );
}

export default PharmacistsHome;
