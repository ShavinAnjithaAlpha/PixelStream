import React from "react";
import PhotoSearchButtonBar from "./PhotoSearchButtonBar";
import SearchSectionTile from "./SearchSectionTile";
import "./SearchSectionBar.css";

function SearchSectionBar({ selectedSection, setSelectedSection }) {
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
      {selectedSection === 1 && <PhotoSearchButtonBar />}
    </div>
  );
}

export default SearchSectionBar;
