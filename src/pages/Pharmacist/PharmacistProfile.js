import React from "react";
import Header from "../../components/Header";
import { PharmacistsHeaderContent } from "../../store/data";
import ProfileComponent from "../../components/ProfileComponent";

const PharmacistProfile = () => {
  return (
    <>
      <Header headerContent={PharmacistsHeaderContent} />
      <ProfileComponent user="pharmacist" />
    </>
  );
};

export default PharmacistProfile;
