import React from "react";
import Pagination from "@mui/material/Pagination";
import Stack from "@mui/material/Stack";

const PaginationComponent = ({ totalPages, page, handlePageChange }) => {
  const handleChange = (event, value) => {
    handlePageChange(value);
  };

  return (
    <Stack spacing={2}>
      <Pagination
        count={totalPages}
        page={page}
        variant="outlined"
        onChange={handleChange}
      />
    </Stack>
  );
};

export default PaginationComponent;
