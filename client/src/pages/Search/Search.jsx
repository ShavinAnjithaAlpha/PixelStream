import React from "react";
import CollectionGrid from "./components/CollectionGrid";
import TaggedPhotoGrid from "./components/TaggedPhotoGrid";
import UserGrid from "./components/UserGrid";

function Search() {
  return (
    <div className="search-page">
      <h1>Collection Page</h1>
      <UserGrid />
    </div>
  );
}

export default Search;
