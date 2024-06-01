import React from "react";
import Select from "react-select";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSearch, faSpinner } from "@fortawesome/free-solid-svg-icons";
import "./SearchSection.css";

function SearchSection({ photos, setOptions, loading }) {
  const sortOptions = [
    { value: "latest", label: "Latest" },
    { value: "popular", label: "Popular" },
    { value: "oldest", label: "Oldest" },
    { value: "size", label: "Size" },
    { value: "title", label: "Title" },
    { value: "location", label: "Location" },
    { value: "random", label: "Random" },
    { value: "views", label: "Views" },
    { value: "downloads", label: "Downloads" },
  ];

  const orientationOptions = [
    { value: "all", label: "All" },
    { value: "landscape", label: "Landscape" },
    { value: "portrait", label: "Portrait" },
    { value: "square", label: "Squarish" },
  ];

  const setSearchQuery = (e) => {
    if (e.key === "Enter") {
      setOptions((prev) => ({ ...prev, search: e.target.value }));
    }
  };

  return (
    <div className="collection-search-section">
      <div className="search">
        <p>{photos.photos && photos.photos.length} Photos</p>
        <span>
          <FontAwesomeIcon
            icon={faSearch}
            color="white"
            style={{ marginLeft: "20px" }}
          />
        </span>
        <input
          type="text"
          placeholder="Search"
          className="search-bar"
          onKeyDown={setSearchQuery}
        />
        {loading && (
          <span>
            <FontAwesomeIcon icon={faSpinner} spin={true} />
          </span>
        )}
      </div>

      <div className="option-bar">
        <Select
          options={sortOptions}
          placeholder="Sort By"
          onChange={(selectedOption) => {
            setOptions((prev) => ({ ...prev, sortBy: selectedOption.value }));
          }}
          styles={{
            control: (baseStyles, state) => ({
              ...baseStyles,
              borderColor: state.isFocused ? "grey" : "#555555",
              backgroundColor: "#222222",
            }),
          }}
        />
        <Select
          options={orientationOptions}
          placeholder="Orientation"
          className="option-box"
          onChange={(selectedOption) => {
            setOptions((prev) => ({
              ...prev,
              orientation: selectedOption.value,
            }));
          }}
          styles={{
            control: (baseStyles, state) => ({
              ...baseStyles,
              borderColor: state.isFocused ? "grey" : "#555555",
              backgroundColor: "#222222",
              color: "white",
            }),
          }}
        />
      </div>
    </div>
  );
}

export default SearchSection;
