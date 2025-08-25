import React, { forwardRef } from "react";

const PrintSummary = forwardRef(({ summary }, ref) => {
  console.log(summary);

  return (
    <div ref={ref} className="p-6 border rounded-lg shadow-md">
      <h1>Summary :</h1>
      <div style={{ marginTop: "16px" }}>
        <p style={{ fontSize: "1rem", fontWeight: "bold", margin: "8px 0" }}>
          Number of In Patients : {summary && summary.ipCount}
        </p>
      </div>
      <hr style={{ margin: "16px 0" }} />
      <div>
        <p style={{ fontSize: "1rem", fontWeight: "bold", margin: "8px 0" }}>
          Number of Out Patients : {summary && summary.opCount}
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
    </div>
  );
});

export default PrintSummary;
