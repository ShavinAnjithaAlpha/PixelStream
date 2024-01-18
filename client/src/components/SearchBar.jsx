import React from "react";
import searchIcon from "../assets/img/icons8-search-48.png";
import "./SearchBar.css";

function SearchBar() {
  return (
    <div className="search-bar-container">
      <input type="text" className="search-bar" placeholder="Search Images" />
      <div className="search-bar__overlay">
        <img src={searchIcon} alt="search bar"></img>
      </div>
    </div>
  );
}

export default SearchBar;
