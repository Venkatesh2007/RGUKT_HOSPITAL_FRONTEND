import React from "react";
import { Typography } from "@mui/material";

function Footer() {
  return (
    <footer
      style={{
        backgroundColor: "#333",
        color: "white",
        textAlign: "center",
        padding: "1rem 0",
        marginTop: "2rem",
      }}
    >
      <Typography variant="body2" style={{ marginTop: "0.5rem" }}>
        Designed and Developed by the students of the Computer Science and
        Engineering Department.
      </Typography>
      <Typography variant="body2" style={{ marginTop: "0.5rem" }}>
        Contact us:{" "}
        <a
          href="mailto:hospital@rgukt.ac.in"
          style={{ color: "white", textDecoration: "underline" }}
        >
          hospital@rgukt.ac.in
        </a>
      </Typography>
    </footer>
  );
}

export default Footer;
