import React from "react";
import Header from "../../components/Header";
import { PharmacistsHeaderContent } from "../../store/data";
import AddMedicinesManually from "../../components/AddMedicinesManually";
import AddMedicinesThroughExcel from "../../components/AddMedicinesThroughExcel";

const AddMedicines = () => {
  return (
    <>
      <Header headerContent={PharmacistsHeaderContent} />
      <main className="py-10">
        <AddMedicinesManually />
        <AddMedicinesThroughExcel />
      </main>
    </>
  );
};

export default AddMedicines;
