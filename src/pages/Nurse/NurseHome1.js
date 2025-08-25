import React, { useState } from "react";
import Header from "../../components/Header";
import { Button, TextField } from "@mui/material";
import { NursingHeaderContent } from "../../store/data";
import Cookies from "js-cookie";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import mainUrl from "../../utils/mainUrl";

const NursingHome = () => {
  const [temperature, setTemperature] = useState("");
  const [bloodPressure, setBloodPressure] = useState("");
  const [pulseRate, setPulseRate] = useState("");
  const [weight, setWeight] = useState("");
  const [spo2, setSpo2] = useState("");
  const [studentId, setStudentId] = useState("");
  const [ecg, setECG] = useState("");

  const submitBtn = async (event) => {
    event.preventDefault();
    if (!studentId.startsWith("B") && !studentId.startsWith("b")) {
      toast.warning("Please enter a valid student ID");
      return;
    }
    if (studentId.length !== 7) {
      toast.warning("Please enter a valid student ID");
      return;
    }

    const Vitals = {
      studentId,
      temperature,
      bloodPressure,
      pulseRate,
      weight,
      spo2,
      ecg,
      treatmentDate: new Date(),
    };

    const url = `${mainUrl}/treatments`;
    const options = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        authorization: `Bearer ${Cookies.get("jwtToken")}`,
      },
      body: JSON.stringify(Vitals),
    };

    const response = await fetch(url, options);

    if (response.ok) {
      const { message } = await response.json();
      toast.success(message);
      setTemperature("");
      setBloodPressure("");
      setPulseRate("");
      setWeight("");
      setSpo2("");
      setStudentId("");
      setECG("");
    } else {
      const { message } = await response.json();
      toast.error(message);
    }
  };

  return (
    <>
      <Header headerContent={NursingHeaderContent} />
      <ToastContainer />
      <main className="min-h-[90vh] flex flex-col justify-center items-center">
        <div className=" max-w-4xl mx-auto p-6 bg-white shadow-md rounded-lg">
          <form onSubmit={submitBtn}>
            <TextField
              id="studentId"
              label="Student ID"
              variant="outlined"
              fullWidth
              value={studentId}
              onChange={(e) => setStudentId(e.target.value)}
              className="mb-4"
            />
            <h1 className="text-3xl font-bold text-center mb-6 mt-3">Vitals</h1>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <TextField
                id="pulseRate"
                label="Pulse Rate"
                variant="outlined"
                fullWidth
                value={pulseRate}
                onChange={(e) => setPulseRate(e.target.value)}
                className="mb-4"
              />
              <TextField
                id="bloodPressure"
                label="Blood Pressure"
                variant="outlined"
                fullWidth
                value={bloodPressure}
                onChange={(e) => setBloodPressure(e.target.value)}
                className="mb-4"
              />
              <TextField
                id="spo2"
                label="SPO2"
                variant="outlined"
                fullWidth
                value={spo2}
                onChange={(e) => setSpo2(e.target.value)}
                className="mb-4"
              />
              <TextField
                id="temperature"
                label="Temperature"
                variant="outlined"
                fullWidth
                value={temperature}
                onChange={(e) => setTemperature(e.target.value)}
                className="mb-4"
              />
              <TextField
                id="weight"
                label="Weight"
                variant="outlined"
                fullWidth
                value={weight}
                onChange={(e) => setWeight(e.target.value)}
                className="mb-4"
              />
              <TextField
                id="ecg"
                label="ECG"
                variant="outlined"
                fullWidth
                value={ecg}
                onChange={(e) => setECG(e.target.value)}
                className="mb-4"
              />
              <Button
                type="submit"
                variant="contained"
                color="primary"
                className="md:col-span-2"
              >
                Submit
              </Button>
            </div>
          </form>
        </div>
      </main>
    </>
  );
};

export default NursingHome;
