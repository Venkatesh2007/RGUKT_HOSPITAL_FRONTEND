import React, { useState } from "react";
import { Modal, Button, Box } from "@mui/material";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: "90%",
  maxWidth: "600px",
  bgcolor: "background.paper",
  boxShadow: 24,
  p: 4,
};

const ViewPatientFullDetails = (props) => {
  const { patientData } = props;
  const [open, setOpen] = useState(false);

  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  return (
    <div>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style} className="rounded-lg overflow-y-auto max-h-[80vh]">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-2xl font-semibold">Patient Full Details</h2>
            <Button onClick={handleClose} variant="outlined" color="secondary">
              x
            </Button>
          </div>

          <div className="flex flex-col gap-4 text-lg">
            <h1>
              <span className="font-bold">Patient ID:</span>{" "}
              {patientData.studentId}
            </h1>
            <h1>
              <span className="font-bold">Prescribed By:</span>{" "}
              {patientData.treatedBy}
            </h1>
            <h1>
              <span className="font-bold">Reason:</span> {patientData.reason}
            </h1>
            <h1>
              <span className="font-bold">Description:</span>{" "}
              {patientData.description}
            </h1>
            <h1>
              <span className="font-bold">Status:</span> {patientData.status}
            </h1>
            <h1>
              <span className="font-bold">Temperature:</span>{" "}
              {patientData.temperature}
            </h1>
            <h1>
              <span className="font-bold">SPO2:</span> {patientData.spo2}
            </h1>
            <h1>
              <span className="font-bold">Pulse Rate:</span>{" "}
              {patientData.pulseRate}
            </h1>
            <h1>
              <span className="font-bold">Blood Pressure:</span>{" "}
              {patientData.bloodPressure}
            </h1>
            <h1>
              <span className="font-bold">Weight:</span> {patientData.weight}
            </h1>
            <h1>
              <span className="font-bold">HOPI:</span> {patientData.hopi}
            </h1>
            <h1>
              <span className="font-bold">Lab Test:</span> {patientData.labTest}
            </h1>
            <h1>
              <span className="font-bold">Drug Allergy:</span>{" "}
              {patientData.drugallergy}
            </h1>
            <h1>
              <span className="font-bold">Advice:</span> {patientData.advice}
            </h1>
            <h1>
              <span className="font-bold">Medicines Written:</span>
              <ul className="list-disc list-inside ml-4">
                {patientData.medicinesWritten.map((medicine, index) => (
                  <li key={index}>
                    {medicine.name} - {medicine.quantity}
                  </li>
                ))}
              </ul>
            </h1>
            <h1>
              <span className="font-bold">Medicines Issued By:</span>{" "}
              {patientData.medicinesIssuedBy}
            </h1>
          </div>
        </Box>
      </Modal>
      <Button
        onClick={handleOpen}
        variant="contained"
        color="primary"
        className="mt-4"
      >
        View
      </Button>
    </div>
  );
};

export default ViewPatientFullDetails;
