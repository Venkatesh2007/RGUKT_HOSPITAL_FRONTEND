import React, { useState, useEffect } from "react";
import Header from "../../components/Header";
import { DoctorsHeaderContent, reasons } from "../../store/data";
import SearchTwoToneIcon from "@mui/icons-material/SearchTwoTone";
import { Button, TextField, Autocomplete } from "@mui/material";
import Cookies from "js-cookie";
import SelectMedicines from "../../components/MedicineDropdown";
import "../../css/DoctorsHome.css";
import calculateAge from "../../services/calculateAge";
import formatDate from "../../services/formatDate";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import LoadingView from "../../services/loaderView";
import mainUrl from "../../utils/mainUrl";

const DoctorsHome = () => {
  const [searchInput, setSearchInput] = useState("");
  const [studentDetails, setStudentDetails] = useState({});
  const [pendingTreatment, setPendingTreatment] = useState({});
  const [treatedTreatments, setTreatedTreatments] = useState([]);
  const [medicines, setMedicines] = useState([]);
  const [availableMedicines, setAvailableMedicines] = useState([]);
  const [showData, setShowData] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [review, setReview] = useState("");
  const [medicineDisposed, setMedicineDisposed] = useState("");

  useEffect(() => {
    const getAvailbleMedicines = async () => {
      const url = `${mainUrl}/medicines`;
      const options = {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          authorization: `Bearer ${Cookies.get("jwtToken")}`,
        },
      };
      const response = await fetch(url, options);
      if (response.ok) {
        const { medicines } = await response.json();
        setAvailableMedicines(medicines);
      } else {
        console.error("Failed to get medicines");
      }
    };
    getAvailbleMedicines();
  }, []);

  const handleMedicineChange = (selectedMedicines) => {
    setMedicines(selectedMedicines);
  };

  const searchBtn = async () => {
    setIsLoading(true);
    const pendingTreatmentUrl = `${mainUrl}/treatments/doctor?studentId=${searchInput.toUpperCase()}&status=PENDING`;
    const treatedTreatmentsUrl = `${mainUrl}/treatments/doctor?studentId=${searchInput.toUpperCase()}&status=TREATED`;
    const studentDetailsUrl = `${mainUrl}/student-details?studentId=${searchInput.toUpperCase()}`;

    const options = {
      method: "GET",
      headers: {
        "content-type": "application/json",
        authorization: "Bearer " + Cookies.get("jwtToken"),
      },
    };

    try {
      const [pendingResponse, treatedResponse, studentResponse] =
        await Promise.all([
          fetch(pendingTreatmentUrl, options),
          fetch(treatedTreatmentsUrl, options),
          fetch(studentDetailsUrl, options),
        ]);

      if (pendingResponse.ok && treatedResponse.ok && studentResponse.ok) {
        const { pendingTreatments, message } = await pendingResponse.json();
        const { treatedTreatments } = await treatedResponse.json();
        const { studentInfo } = await studentResponse.json();
        toast.success(message);

        if (pendingTreatments.length > 0) setShowData(true);
        setPendingTreatment(pendingTreatments[0]);
        setTreatedTreatments(treatedTreatments);
        setStudentDetails(studentInfo);
      } else {
        const { message } = await pendingResponse.json();
        toast.error(message);
      }
    } catch (error) {
      toast.error("An error occurred while fetching data");
    } finally {
      setIsLoading(false);
    }
  };

  const submitBtn = async (e) => {
    e.preventDefault();
    const url = `${mainUrl}/treatments/doctor-update/${pendingTreatment._id}`;
    const options = {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        authorization: `Bearer ${Cookies.get("jwtToken")}`,
      },
      body: JSON.stringify({
        ...pendingTreatment,
        medicinesWritten: medicines,
        medicineDisposed,
        review,
      }),
    };
    const response = await fetch(url, options);
    if (response.ok) {
      const { message } = await response.json();
      console.log(message);
      toast.success(message);
    } else {
      toast.error("Failed to mark treatment as treated");
    }
  };

  const handleChange = (field, value) => {
    if (field === "medicineDisposed") {
      setMedicineDisposed(value);
    } else if (field === "review") {
      setReview(value);
    } else {
      setPendingTreatment({ ...pendingTreatment, [field]: value });
    }
  };

  return (
    <>
      <Header headerContent={DoctorsHeaderContent} />
      <ToastContainer />
      <main className="container">
        <h1 className="text-3xl font-bold mb-6 text-center">Patient Details</h1>
        <section className="search-container">
          <input
            type="search"
            placeholder="Search by Student ID"
            className="search-input"
            onChange={(e) => setSearchInput(e.target.value)}
          />
          <SearchTwoToneIcon className="search-icon" />
          <Button
            variant="contained"
            className="search-button"
            onClick={searchBtn}
          >
            Search
          </Button>
        </section>
        {isLoading ? (
          <LoadingView />
        ) : showData ? (
          <>
            <section className="form-container">
              <form onSubmit={submitBtn}>
                <h1 className="form-title">Student Details</h1>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 form-field">
                  <h1 className="form-label">Name: {studentDetails.name}</h1>
                  <h1 className="form-label">
                    Age: {calculateAge(studentDetails.DOB)}
                  </h1>
                  <h1 className="form-label">
                    Gender: {studentDetails.gender}
                  </h1>
                  <h1 className="form-label">
                    Blood Group: {studentDetails.bloodGroup}
                  </h1>
                  <h1 className="form-label">
                    Long Term Diseases:{" "}
                    {studentDetails.longTermDiseases &&
                      studentDetails.longTermDiseases}
                  </h1>
                </div>
                <h1 className="form-title">Vitals</h1>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 form-field">
                  <p>Pulse Rate: {pendingTreatment.pulseRate}</p>
                  <p>Blood Pressure: {pendingTreatment.bloodPressure}</p>
                  <p>SPO2: {pendingTreatment.spo2}</p>
                  <p>Temperature: {pendingTreatment.temperature}</p>
                  <p>Weight: {pendingTreatment.weight}</p>
                  <p>ECG: {pendingTreatment.ecg}</p>
                </div>
                <div className="form-field">
                  <label htmlFor="hopi" className="form-label">
                    HOPI
                  </label>
                  <textarea
                    id="hopi"
                    rows="4"
                    className="form-textarea"
                    value={pendingTreatment.hopi}
                    onChange={(e) => handleChange("hopi", e.target.value)}
                  ></textarea>
                </div>
                <div className="form-field">
                  <label htmlFor="reason" className="form-label">
                    Reason:
                  </label>
                  <Autocomplete
                    id="reason"
                    options={reasons}
                    value={pendingTreatment.reason}
                    onChange={(e, value) => handleChange("reason", value)}
                    renderInput={(params) => (
                      <TextField {...params} variant="outlined" />
                    )}
                  />
                </div>
                <div className="form-field">
                  <label htmlFor="description" className="form-label">
                    Provisional Diagnosis:
                  </label>
                  <input
                    id="description"
                    type="text"
                    className="form-input"
                    value={pendingTreatment.description}
                    onChange={(e) =>
                      handleChange("description", e.target.value)
                    }
                  />
                </div>
                <div className="form-field">
                  <label htmlFor="labTest" className="form-label">
                    Lab Test:
                  </label>
                  <input
                    id="labTest"
                    type="text"
                    className="form-input"
                    value={pendingTreatment.labTest}
                    onChange={(e) => handleChange("labTest", e.target.value)}
                  />
                </div>
                <div className="form-field">
                  <label htmlFor="drugallergy" className="form-label">
                    Drug Allergy:
                  </label>
                  <TextField
                    id="drugallergy"
                    rows="4"
                    className="form-textarea"
                    value={pendingTreatment.drugallergy}
                    onChange={(e) =>
                      handleChange("drugallergy", e.target.value)
                    }
                  />
                </div>
                <TextField
                  id="advice"
                  label="Advice"
                  multiline
                  maxRows={4}
                  fullWidth
                  value={pendingTreatment.advice}
                  onChange={(e) => handleChange("advice", e.target.value)}
                />
                <h1 className="form-title">Treatment</h1>
                <div>
                  <SelectMedicines
                    selectedMedicines={medicines}
                    onChange={handleMedicineChange}
                    medicines={availableMedicines}
                    availableMedicines={availableMedicines}
                  />
                </div>
                <div className="form-field">
                  <label htmlFor="medicineDisposed" className="form-label">
                    Medicine Disposed:
                  </label>
                  <textarea
                    id="medicineDisposed"
                    rows="2"
                    className="form-textarea"
                    value={medicineDisposed}
                    onChange={(e) =>
                      handleChange("medicineDisposed", e.target.value)
                    }
                  ></textarea>
                </div>
                <div className="form-field">
                  <TextField
                    value={review}
                    label="Review"
                    fullWidth
                    onChange={(e) => handleChange("review", e.target.value)}
                    sx={{ marginBottom: 2 }}
                  />
                </div>
                <div className="submit-btn-container">
                  <Button
                    type="submit"
                    variant="contained"
                    className="submit-button"
                  >
                    Submit
                  </Button>
                </div>
              </form>
            </section>
            <section className="results-container">
              <h1 className="results-title">Previous Treatments</h1>
              <ul className="results-list">
                {treatedTreatments.map((item, index) => (
                  <li key={index} className="result-item">
                    <div className="result-details">
                      <p className="text-bold">
                        <span className="font-bold">Reason : </span>{" "}
                        {item.reason}
                      </p>
                      <p className="text-normal">
                        <span className="font-bold">Description</span>:{" "}
                        {item.description}
                      </p>
                      <p className="text-normal">
                        <span className="font-bold">Treated By : </span>{" "}
                        {item.treatedBy}
                      </p>
                      <p className="text-normal">
                        <span className="font-bold">Treatment Date : </span>{" "}
                        {formatDate(item.treatmentDate)}
                      </p>
                      <p className="text-normal">
                        <span className="font-bold">Temperature : </span>{" "}
                        {item.temperature}
                      </p>
                      <p className="text-normal">
                        <span className="font-bold">Blood Pressure : </span>{" "}
                        {item.bloodPressure}
                      </p>
                      <p className="text-normal">
                        <span className="font-bold">Pulse Rate : </span>{" "}
                        {item.pulseRate}
                      </p>
                      <p className="text-normal">
                        <span className="font-bold">Weight : </span>{" "}
                        {item.weight}
                      </p>
                      <p className="text-normal">
                        <span className="font-bold">MedicinesWritten : </span>{" "}
                        {item.medicinesWritten
                          .map((med) => med.name)
                          .join(", ")}
                      </p>
                    </div>
                  </li>
                ))}
              </ul>
            </section>
          </>
        ) : null}
      </main>
    </>
  );
};

export default DoctorsHome;
