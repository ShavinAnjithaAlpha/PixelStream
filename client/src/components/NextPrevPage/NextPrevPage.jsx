import React, { useState } from "react";
import "./NextPrevPage.css";

function NextPrevPage({ initialPage, handlePageChange, next }) {
  const [currentPage, setCurrentPage] = useState(initialPage);

  const handleNext = (e) => {
    setCurrentPage(currentPage + 1);
    handlePageChange(currentPage + 1);
  };

  const handlePrev = (e) => {
    setCurrentPage(currentPage - 1);
    handlePageChange(currentPage - 1);
  };

  return (
    <div className="next-prev-page">
      {currentPage !== 1 && (
        <button onClick={handlePrev} id="prev">
          {"<"}
        </button>
      )}
      {next && (
        <button onClick={handleNext} id="next">
          {">"}
        </button>
      )}
    </div>
  );
}

export default NextPrevPage;
