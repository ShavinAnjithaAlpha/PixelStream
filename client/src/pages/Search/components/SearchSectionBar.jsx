import React from "react";
import Select from "react-select";
import SearchSectionTile from "./SearchSectionTile";
import "./SearchSectionBar.css";

function SearchSectionBar({ selectedSection, setSelectedSection, setOptions }) {
  const orientationOptions = [
    { value: "all", label: "All" },
    { value: "landscape", label: "Landscape" },
    { value: "portrait", label: "Portrait" },
    { value: "square", label: "Squarish" },
  ];

  const sortOptions = [
    { value: "latest", label: "Latest" },
    { value: "popular", label: "Popular" },
    { value: "oldest", label: "Oldest" },
  ];

  return (
    <div className="search-section-bar">
      <div className="button-bar">
        <SearchSectionTile
          label="Photos"
          sectionKey={1}
          isActive={selectedSection === 1}
          selectedSection={selectedSection}
          setSelectedSection={setSelectedSection}
        />
        <SearchSectionTile
          label="Collection"
          sectionKey={2}
          isActive={selectedSection === 2}
          selectedSection={selectedSection}
          setSelectedSection={setSelectedSection}
        />
        <SearchSectionTile
          label="Users"
          sectionKey={3}
          isActive={selectedSection === 3}
          selectedSection={selectedSection}
          setSelectedSection={setSelectedSection}
        />
      </div>
      {selectedSection === 1 && (
        <div className="option-bar">
          <Select
            options={sortOptions}
            placeholder="Sort By"
            className="option-box"
            onChange={(selectedOption) => {
              setOptions((prev) => ({ ...prev, sortBy: selectedOption.value }));
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
          />
        </div>
      )}
    </div>
  );
}

export default SearchSectionBar;
