import React from "react";
import Header from "../components/Header";
import HomeBody from "../components/HomeBody";
import Footer from "../components/Footer";
import { MainPageHeaderContent } from "../store/data";

function HomePage() {
  return (
    <>
      <Header headerContent={MainPageHeaderContent} />
      <HomeBody />
      <Footer />
    </>
  );
}

export default HomePage;
