import React, { useState, useEffect } from "react";
import Header from "../../components/Header";
import { DoctorsHeaderContent, reasons } from "../../store/data";
import { Button, TextField, Autocomplete } from "@mui/material";
import Cookies from "js-cookie";
import SelectMedicines from "../../components/MedicineDropdown";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import mainUrl from "../../utils/mainUrl";

const Others = () => {
  const [medicines, setMedicines] = useState([]);
  const [availableMedicines, setAvailableMedicines] = useState([]);
  const [name, setName] = useState("");
  const [reason, setReason] = useState("");

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

  const submitBtn = async (e) => {
    e.preventDefault();
    const url = `${mainUrl}/others/treatments/`;
    const options = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        authorization: `Bearer ${Cookies.get("jwtToken")}`,
      },
      body: JSON.stringify({
        name,
        reason,
        treatmentDate: new Date(),
        medicinesWritten: medicines,
      }),
    };
    const response = await fetch(url, options);
    if (response.ok) {
      const { message } = await response.json();
      toast.success(message);
      setName("");
      setReason("");
      setMedicines([]);
    } else {
      const { message } = await response.json();
      toast.error(message);
    }
  };

  return (
    <>
      <Header headerContent={DoctorsHeaderContent} />
      <ToastContainer />
      <main className="container">
        <section className="form-container mt-8">
          <form onSubmit={submitBtn}>
            <div className="form-field">
              <label htmlFor="medicineWritten" className="form-label">
                Name:
              </label>
              <TextField
                value={name}
                label="Name"
                fullWidth
                id="name"
                onChange={(e) => setName(e.target.value)}
                sx={{ marginBottom: 2 }}
              />
            </div>
            <div className="form-field">
              <label htmlFor="reason" className="form-label">
                Reason:
              </label>
              <Autocomplete
                id="reason"
                options={reasons}
                value={reason}
                onChange={(e, value) => setReason(value)}
                renderInput={(params) => (
                  <TextField {...params} variant="outlined" />
                )}
              />
            </div>
            <div className="form-field">
              <label htmlFor="prescription" className="form-label">
                Prescription:
              </label>
              <SelectMedicines
                selectedMedicines={medicines}
                onChange={handleMedicineChange}
                medicines={availableMedicines}
                availableMedicines={availableMedicines}
                id="prescription"
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
      </main>
    </>
  );
};

export default Others;
