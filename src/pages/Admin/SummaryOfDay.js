import React, { useState, useEffect, useRef } from "react";
import Cookies from "js-cookie";
import { Button } from "@mui/material";
import ReactToPrint from "react-to-print";
import PrintSummary from "../../components/PrintSummary";
import LoadingView from "../../services/loaderView";
import mainUrl from "../../utils/mainUrl";

const SummaryOfTheDay = () => {
  const [summary, updateSummary] = useState(null);
  const [selectedDate, setSelectedDate] = useState(new Date());
  const printRefs = useRef();

  useEffect(() => {
    const fetchDetails = async () => {
      const url = `${mainUrl}/summary?date=${new Date(selectedDate)}`;
      const options = {
        method: "GET",
        headers: {
          "content-type": "application/json",
          authorization: "Bearer " + Cookies.get("jwtToken"),
        },
      };

      try {
        const response = await fetch(url, options);
        if (response.ok) {
          const { summary } = await response.json();
          updateSummary(summary);
        } else {
          console.error("Failed to fetch summary");
        }
      } catch (error) {
        console.error("Error fetching summary:", error);
      }
    };
    fetchDetails();
  }, [selectedDate]);

  if (!summary) {
    return <LoadingView />;
  }

  return (
    <div
      style={{
        padding: "16px",
        marginTop: "2rem",
        border: "1px solid #ccc",
        borderRadius: "8px",
        boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
      }}
      ref={printRefs}
    >
      <div>
        <h2
          style={{
            fontSize: "1.5rem",
            fontWeight: "bolder",
            marginBottom: "0.5rem",
            textAlign: "center",
          }}
        >
          Summary
        </h2>
        <label>Date: </label>
        <input
          type="date"
          className="my-3"
          value={selectedDate.toISOString().split("T")[0]}
          onChange={(e) => setSelectedDate(new Date(e.target.value))}
        />
      </div>
      <hr
        style={{ margin: "16px 0", borderColor: "#ccc", borderWidth: "1px" }}
      />
      <div style={{ marginTop: "16px" }}>
        <p style={{ fontSize: "1rem", fontWeight: "bold", margin: "8px 0" }}>
          Number of In Patients (IP) : {summary && summary.ipCount}
        </p>
      </div>
      <hr style={{ margin: "16px 0" }} />
      <div>
        <p style={{ fontSize: "1rem", fontWeight: "bold", margin: "8px 0" }}>
          Number of Out Patients (OP) : {summary && summary.opCount}
        </p>
      </div>
      <hr style={{ margin: "16px 0" }} />
      <div>
        <h3
          style={{
            fontSize: "1.25rem",
            fontWeight: "bold",
            margin: "0.5rem 0",
          }}
        >
          Reasons for Visits:
        </h3>

        {summary &&
          summary.reasons.map((reason, index) => (
            <p key={index} style={{ fontSize: "1rem", margin: "4px 0" }}>
              {reason.reason}: {reason.count}
            </p>
          ))}
      </div>
      <hr style={{ margin: "16px 0" }} />{" "}
      <div className="flex justify-between">
        <ReactToPrint
          trigger={() => (
            <Button color="success" variant="contained">
              Print
            </Button>
          )}
          content={() => printRefs.summary}
          documentTitle="Patient Details"
          pageStyle="@page { size: auto; margin: 20mm; }"
        />
      </div>
      <div style={{ display: "none" }}>
        <PrintSummary
          ref={(el) => (printRefs.summary = el)}
          summary={summary}
        />
      </div>
    </div>
  );
};

export default SummaryOfTheDay;
