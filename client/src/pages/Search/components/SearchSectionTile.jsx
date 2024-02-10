import React from "react";
import "./SearchSectionTile.css";

function SearchSectionTile({
  setSelectedSection,
  isActive,
  sectionKey,
  label,
}) {
  const handleClick = () => {
    setSelectedSection(sectionKey);
  };

  return (
    <div
      className={`search-section-tile ${
        isActive ? "search-section-tile-selected" : ""
      }`}
      onClick={handleClick}
    >
      <h2>{label}</h2>
    </div>
  );
}

export default SearchSectionTile;
