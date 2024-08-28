import React from "react";
import { Button, IconButton } from "@material-tailwind/react";

export function DefaultPagination({ currentPage, totalPages = 0, onPageChange }) {
  const getItemProps = (index) => ({
    variant: currentPage === index ? "filled" : "text",
    color: currentPage === index ? "white" : "gray",
    onClick: () => onPageChange(index),
    className: currentPage === index ? "bg-blue text-white" : "",
  });

  const pages = totalPages > 0 ? [...Array(totalPages)] : [];

  return (
    <div className="flex items-center gap-4 mt-4 justify-end">
      <Button
        variant="text"
        className="flex items-center text-blue font-title normal-case font-medium"
        onClick={() => onPageChange(currentPage - 1)}
        disabled={currentPage === 1}
      >
        Previous
      </Button>

      <div className="flex items-center gap-2 text-blue font-title normal-case font-medium">
        {pages.map((_, index) => (
          <IconButton key={index + 1} {...getItemProps(index + 1)}>
            {index + 1}
          </IconButton>
        ))}
      </div>

      <Button
        variant="text"
        className="flex items-center text-blue font-title normal-case font-medium"
        onClick={() => onPageChange(currentPage + 1)}
        disabled={currentPage === totalPages}
      >
        Next
      </Button>
    </div>
  );
}

export default DefaultPagination;
