import React, { forwardRef } from "react";
import formatDate from "../services/formatDate";
import { FaPrescription } from "react-icons/fa";

const PrintablePatient = forwardRef(({ patient }, ref) => (
  <div ref={ref} className="p-6 border rounded-lg shadow-md">
    <div className="text-center mb-4">
      <img
        src="https://assets.thehansindia.com/h-upload/2023/11/30/1403425-rgukt.webp"
        alt="RGUKT Basar Logo"
        className="mx-auto mb-2"
        style={{ width: "100px", height: "100px" }}
      />
      <h1 className="text-2xl font-bold mb-2 text-red-900">RGUKT Basar</h1>
      <p className="text-lg font-semibold">Hospital Prescription</p>
    </div>

    <div className="border-b pb-4 mb-4">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-xl font-semibold">Patient Details</h2>
          <p>
            <strong>Student ID:</strong> {patient.studentId}
          </p>
          <p>
            <strong>Reason:</strong> {patient.reason}
          </p>
          <p>
            <strong>Temperature:</strong> {patient.temperature} °C
          </p>
          <p>
            <strong>SPO2:</strong> {patient.spo2}%
          </p>
          <p>
            <strong>Pulse Rate:</strong> {patient.pulseRate} bpm
          </p>
          <p>
            <strong>Description:</strong> {patient.description}
          </p>
          <p>
            <strong>Treated By:</strong> {patient.treatedBy}
          </p>
          <p>
            <strong>Treatment Date:</strong> {formatDate(patient.treatmentDate)}
          </p>
          <p>
            <strong>Blood Pressure:</strong> {patient.bloodPressure}
          </p>
          <p>
            <strong>Weight:</strong> {patient.weight} kg
          </p>
        </div>
        <div>
          <FaPrescription size={50} className="text-blue-500" />
        </div>
      </div>
    </div>

    <div>
      <h3 className="text-lg font-semibold mb-2">Medicines</h3>
      <ul className="list-disc pl-5">
        {patient.medicinesWritten.map((medicine, index) => (
          <li key={index} className="mb-1">
            {medicine.name} - {medicine.quantity}
          </li>
        ))}
      </ul>
    </div>
  </div>
));

export default PrintablePatient;
