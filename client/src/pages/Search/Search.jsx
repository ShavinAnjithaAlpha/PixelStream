import React, { useState } from "react";
import CollectionGrid from "./components/CollectionGrid";
import TaggedPhotoGrid from "./components/TaggedPhotoGrid";
import UserGrid from "./components/UserGrid";
import SearchSectionBar from "./components/SearchSectionBar";

function Search() {
  const [selectedSection, setSelectedSection] = React.useState(1);

  return (
    <div className="search-page">
      <SearchSectionBar
        selectedSection={selectedSection}
        setSelectedSection={setSelectedSection}
      />

      {selectedSection === 1 && <TaggedPhotoGrid />}
      {selectedSection === 2 && <CollectionGrid />}
      {selectedSection === 3 && <UserGrid />}
    </div>
  );
}

export default Search;
