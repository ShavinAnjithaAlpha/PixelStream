import React from "react";
import { useNavigate } from "react-router-dom";
import "./SearchBar.css";

function SearchBar({ setSearchKeyword }) {
  const navigate = useNavigate();

  const handleSearch = (e) => {
    if (e.key === "Enter") {
      // first navigate to the search page
      navigate("/search");
      // then set the search keyword so it will triger the search end points
      setSearchKeyword(e.target.value);
    }
  };

  return (
    <div className="search-bar-container">
      <input
        type="text"
        className="search-bar"
        placeholder="Search Images"
        onKeyUp={handleSearch}
      />
      {/* <div className="search-bar__overlay">
        <img src={searchIcon} alt="search bar"></img>
      </div> */}
    </div>
  );
}

export default SearchBar;
