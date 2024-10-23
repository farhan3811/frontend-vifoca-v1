import React from "react";
import { Button, IconButton } from "@material-tailwind/react";

export function DefaultPagination({ currentPage, totalPages = 0, onPageChange }) {
  const getItemProps = (index) => ({
    variant: currentPage === index ? "filled" : "text",
    color: currentPage === index ? "white" : "gray",
    onClick: () => onPageChange(index),
    className: currentPage === index ? "bg-blue text-white" : "",
  });

  const generatePages = () => {
    const pages = [];
    if (totalPages <= 5) {
      for (let i = 1; i <= totalPages; i++) {
        pages.push(i);
      }
    } else {
      pages.push(1);
      if (currentPage > 3) {
        pages.push('...');
      }
      const startPage = Math.max(2, currentPage - 1);
      const endPage = Math.min(totalPages - 1, currentPage + 1);

      for (let i = startPage; i <= endPage; i++) {
        pages.push(i);
      }
      if (currentPage < totalPages - 2) {
        pages.push('...');
      }
      pages.push(totalPages);
    }
    return pages;
  };

  const pages = generatePages();

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
        {pages.map((page, index) => (
          <React.Fragment key={index}>
            {page === '...' ? (
              <span className="text-gray-500">...</span>
            ) : (
              <IconButton key={page} {...getItemProps(page)}>
                {page}
              </IconButton>
            )}
          </React.Fragment>
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
