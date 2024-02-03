import React from "react";
import "./PageButton.css";

function PageButton({ index, handlePageChange, isActive, setCurrentPage }) {
  const handleClick = (e) => {
    handlePageChange(index);
    setCurrentPage(index);
  };
  return (
    <div
      className={`pg-button ${isActive ? "pg-button-selected" : ""}`}
      onClick={handleClick}
    >
      {index}
    </div>
  );
}

export default PageButton;
