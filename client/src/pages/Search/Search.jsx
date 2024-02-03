import React, { useState, useContext } from "react";
import CollectionGrid from "./components/CollectionGrid";
import TaggedPhotoGrid from "./components/TaggedPhotoGrid";
import UserGrid from "./components/UserGrid";
import { SearchContext } from "../../contexts/search.context";
import SearchSectionBar from "./components/SearchSectionBar";
import "./Search.css";
import TopicBar from "../../components/TopicBar/TopicBar";

function Search() {
  const { searchKeyword } = useContext(SearchContext);
  const [selectedSection, setSelectedSection] = React.useState(1);

  return (
    <div className="search-page">
      <SearchSectionBar
        selectedSection={selectedSection}
        setSelectedSection={setSelectedSection}
      />

      <h1 className="search-keyword-title">
        Searched <span>{searchKeyword}</span>
      </h1>

      <TopicBar />

      {selectedSection === 1 && <TaggedPhotoGrid />}
      {selectedSection === 2 && <CollectionGrid />}
      {selectedSection === 3 && <UserGrid />}
    </div>
  );
}

export default Search;
