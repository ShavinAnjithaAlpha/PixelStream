import React from "react";
import CollectionGrid from "./components/CollectionGrid";
import TaggedPhotoGrid from "./components/TaggedPhotoGrid";

function Search() {
  return (
    <div className="search-page">
      <h1>Collection Page</h1>
      <TaggedPhotoGrid />
    </div>
  );
}

export default Search;
