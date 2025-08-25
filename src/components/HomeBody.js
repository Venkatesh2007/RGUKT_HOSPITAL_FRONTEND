import React from "react";
import {
  Paper,
  List,
  ListItem,
  ListItemText,
  Typography,
  Container,
} from "@mui/material";
import { Carousel } from "react-responsive-carousel";
import "react-responsive-carousel/lib/styles/carousel.min.css";

import LoginForm from "./LoginForm";
import "../css/HomeBody.css";

import Image1 from "../carousel_images/img1.jpg";
import Image2 from "../carousel_images/img2.jpg";
import Image3 from "../carousel_images/img3.jpg";
import Image4 from "../carousel_images/img4.jpg";
import Image5 from "../carousel_images/img5.jpg";
import Image6 from "../carousel_images/img6.jpg";
import Image7 from "../carousel_images/img7.jpg";

const HomeBody = () => {
  const staff = [
    { name: "Dr. Jagadheeshwar" },
    { name: "Dr. Mahesh" },
    { name: "Dr. Akhila" },
    { name: "Dr. Divya" },
    { name: "Dr. Sharzel" },
    { name: "Dr. Sharzaam" },
    { name: "Dr. Srinivas" },
  ];

  return (
    <>
      <div className="mx-auto py-6 px-4">
        <div className="flex flex-col lg:flex-row justify-between ">
          <div className="mt-10 flex flex-col flex-grow gap-14">
            {/* Staff Details */}
            <Container maxWidth="md" style={{ marginTop: "2rem" }}>
              <Paper
                elevation={2}
                style={{
                  padding: "1rem",
                  maxHeight: "600px",
                  overflowY: "auto",
                }}
              >
                <h1
                  style={{
                    textAlign: "center",
                    fontWeight: "bold",
                    marginBottom: "1rem",
                  }}
                >
                  Doctors
                </h1>
                <div style={{ display: "flex", flexDirection: "column" }}>
                  {staff.map((member, index) => (
                    <div
                      key={index}
                      style={{
                        display: "flex",
                        justifyContent: "space-between",
                        padding: "4px 0",
                      }}
                    >
                      <span>{member.name}</span>
                    </div>
                  ))}
                </div>
              </Paper>
            </Container>

            {/* Important Numbers Section */}
            <Container maxWidth="sm">
              <Paper elevation={2}>
                <h1
                  style={{
                    textAlign: "center",
                    fontWeight: "bold",
                    marginTop: "1rem",
                    color: "red",
                  }}
                >
                  Important Numbers
                </h1>
                <List>
                  <ListItem className="mr-4">
                    <ListItemText primary="Emergency" secondary="8333944120" />
                    <ListItemText primary="Ambulance" secondary="108" />
                  </ListItem>
                </List>
              </Paper>
            </Container>
          </div>

          {/* Carousel and Info Section */}
          <Container maxWidth="md" style={{ marginTop: "2rem" }}>
            <h1 style={{ fontWeight: "bold", marginBottom: "1rem" }}>
              About RGUKT Hospital
            </h1>
            <Carousel
              autoPlay
              infiniteLoop
              showThumbs={false}
              showArrows={true}
              showIndicators={true}
              showStatus={false}
              emulateTouch
              swipeable
              dynamicHeight={false}
              interval={5000} // Change the interval time as needed
              renderArrowPrev={(onClickHandler, hasPrev, label) =>
                hasPrev && (
                  <button
                    type="button"
                    onClick={onClickHandler}
                    title={label}
                    style={{
                      position: "absolute",
                      top: "50%",
                      left: "10px",
                      transform: "translateY(-50%)",
                      backgroundColor: "rgba(0,0,0,0.5)",
                      color: "white",
                      border: "none",
                      borderRadius: "50%",
                      padding: "10px",
                      zIndex: 1,
                    }}
                  >
                    &#10094;
                  </button>
                )
              }
              renderArrowNext={(onClickHandler, hasNext, label) =>
                hasNext && (
                  <button
                    type="button"
                    onClick={onClickHandler}
                    title={label}
                    style={{
                      position: "absolute",
                      top: "50%",
                      right: "10px",
                      transform: "translateY(-50%)",
                      backgroundColor: "rgba(0,0,0,0.5)",
                      color: "white",
                      border: "none",
                      borderRadius: "50%",
                      padding: "10px",
                      zIndex: 1,
                    }}
                  >
                    &#10095;
                  </button>
                )
              }
            >
              <div>
                <img src={Image1} alt="hospital_image1" />
              </div>
              <div>
                <img src={Image2} alt="hospital_image2" />
              </div>
              <div>
                <img src={Image3} alt="hospital_image3" />
              </div>
              <div>
                <img src={Image4} alt="hospital_image4" />
              </div>
              <div>
                <img src={Image5} alt="hospital_image5" />
              </div>
              <div>
                <img src={Image6} alt="hospital_image6" />
              </div>
              <div>
                <img src={Image7} alt="hospital_image7" />
              </div>
            </Carousel>
            <Typography
              className="justified-text"
              style={{ marginTop: "16px" }}
            >
              The multifarious medical needs of the Campus population consisting
              of Students, Staff members and their families are met by the
              Institute Hospital. The Hospital is headed by the Head (Hospital
              Services) with a team of full time Medical Officers, Visiting
              Specialists and Para Medical staff. The Director has also
              constituted a Hospital Advisory Committee with a Chairman
              nominated by him and members drawn from hospital and other
              recognized bodies of the Institute including student
              representatives, with the Head (Hospital Services) as the Member
              Secretary of the Committee.
            </Typography>
          </Container>

          {/* Login Form */}
          <Container maxWidth="sm" className="flex-grow mt-8 lg:mt-0">
            <LoginForm />
          </Container>
        </div>
      </div>
    </>
  );
};

export default HomeBody;
