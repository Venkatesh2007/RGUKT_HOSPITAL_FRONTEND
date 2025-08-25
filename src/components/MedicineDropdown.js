import React from "react";
import Box from "@mui/material/Box";
import Chip from "@mui/material/Chip";
import TextField from "@mui/material/TextField";
import Autocomplete from "@mui/material/Autocomplete";
import FormControl from "@mui/material/FormControl";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import Select from "@mui/material/Select";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const SelectMedicines = (props) => {
  const { medicines, availableMedicines, selectedMedicines, onChange } = props;

  const handleChange = (event, value) => {
    const newSelectedMedicines = value.map((name) => {
      const existingMedicine = selectedMedicines.find(
        (med) => med.name === name
      );
      return (
        existingMedicine || {
          name,
          quantity: 0,
          morning: 0,
          afternoon: 0,
          night: 0,
          foodTiming: "After food",
          numberOfDays: 0,
        }
      );
    });
    onChange(newSelectedMedicines);
  };

  const handleFoodTimingChange = (name, foodTiming) => {
    const updatedMedicines = selectedMedicines.map((med) =>
      med.name === name ? { ...med, foodTiming } : med
    );
    onChange(updatedMedicines);
  };

  const handleTimingClick = (name, timeOfDay) => {
    const availableMedicine = availableMedicines.find(
      (med) => med.name === name
    );

    const updatedMedicines = selectedMedicines.map((med) => {
      if (med.name === name) {
        const updatedMed = {
          ...med,
          [timeOfDay]: med[timeOfDay] === 0 ? 1 : 0,
        };
        const newQuantity =
          (updatedMed.morning + updatedMed.afternoon + updatedMed.night) *
          updatedMed.numberOfDays;

        if (newQuantity <= availableMedicine.quantity) {
          updatedMed.quantity = newQuantity;
        } else {
          toast.warning(`Cannot exceed available quantity for ${name}`);
        }
        return updatedMed;
      }
      return med;
    });

    onChange(updatedMedicines);
  };

  const handleNumberOfDays = (name, value) => {
    const availableMedicine = availableMedicines.find(
      (med) => med.name === name
    );

    const updatedMedicines = selectedMedicines.map((med) => {
      if (med.name === name) {
        const newQuantity = (med.morning + med.afternoon + med.night) * value;

        // Ensure the new quantity does not exceed available quantity
        if (newQuantity <= availableMedicine.quantity) {
          return { ...med, numberOfDays: value, quantity: newQuantity };
        } else {
          toast.warning(`Cannot exceed available quantity for ${name}`);
          return med;
        }
      }
      return med;
    });

    onChange(updatedMedicines);
  };

  return (
    <div className="p-4">
      <ToastContainer />
      <FormControl sx={{ m: 1, width: 300 }} className="w-full mb-4">
        <InputLabel id="multiple-medicines-label"></InputLabel>
        <Autocomplete
          multiple
          id="multiple-medicines"
          options={medicines.map((medicine) => medicine.name)}
          value={selectedMedicines.map((med) => med.name)}
          onChange={handleChange}
          renderInput={(params) => (
            <TextField
              {...params}
              label="Prescription"
              onFocus={() => (params.InputProps.placeholder = "")}
            />
          )}
          renderTags={(value, getTagProps) =>
            value.map((option, index) => (
              <Chip
                key={option}
                label={`${option.toUpperCase()} (${
                  selectedMedicines.find((med) => med.name === option)
                    ?.quantity || 1
                })`}
                {...getTagProps({ index })}
              />
            ))
          }
          getOptionLabel={(option) => option}
        />
      </FormControl>
      <Box sx={{ mt: 2 }} className="space-y-4">
        {selectedMedicines.map(
          ({
            name,
            quantity,
            morning,
            afternoon,
            night,
            foodTiming,
            numberOfDays,
          }) => (
            <div key={name} className="">
              <h1 className="font-bold capitalize">{name} :</h1>
              <div className="flex flex-col md:flex-row items-center gap-4 justify">
                <div className="flex items-center gap-2">
                  <TextField
                    type="text"
                    value={morning}
                    onClick={() => handleTimingClick(name, "morning")}
                    InputLabelProps={{ shrink: true }}
                    InputProps={{ inputProps: { min: 0, max: 1 } }}
                    className="w-12"
                  />
                  <TextField
                    type="text"
                    value={afternoon}
                    onClick={() => handleTimingClick(name, "afternoon")}
                    InputLabelProps={{ shrink: true }}
                    InputProps={{ inputProps: { min: 0, max: 1 } }}
                    className="w-12"
                  />
                  <TextField
                    type="text"
                    value={night}
                    onClick={() => handleTimingClick(name, "night")}
                    InputLabelProps={{ shrink: true }}
                    InputProps={{ inputProps: { min: 0, max: 1 } }}
                    className="w-12"
                  />
                </div>
                <FormControl className="w-36">
                  <Select
                    value={foodTiming}
                    onChange={(e) =>
                      handleFoodTimingChange(name, e.target.value)
                    }
                  >
                    <MenuItem value="Before food">Before food</MenuItem>
                    <MenuItem value="After food">After food</MenuItem>
                  </Select>
                </FormControl>
                <TextField
                  label="No.of Days"
                  type="number"
                  value={numberOfDays}
                  className="w-24"
                  onChange={(e) => handleNumberOfDays(name, e.target.value)}
                />
                <label className="font-semibold">
                  Total Quantity: {quantity}
                </label>
              </div>
            </div>
          )
        )}
      </Box>
    </div>
  );
};

export default SelectMedicines;
