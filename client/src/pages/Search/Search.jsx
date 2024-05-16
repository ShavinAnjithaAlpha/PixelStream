import React, { useContext, useState } from "react";
import CollectionGrid from "./components/CollectionGrid";
import TaggedPhotoGrid from "./components/TaggedPhotoGrid";
import UserGrid from "./components/UserGrid";
import { SearchContext } from "../../contexts/search.context";
import SearchSectionBar from "./components/SearchSectionBar";
import TopicBar from "../../components/TopicBar/TopicBar";
import "./Search.css";

function Search() {
  const { searchKeyword } = useContext(SearchContext);
  const [selectedSection, setSelectedSection] = React.useState(1);
  const [options, setOptions] = useState({});
  const [backgroundImage, setBackgroundImage] = useState({});

  return (
    <div
      className="search-page"
      style={{
        backgroundImage: `url('${backgroundImage ? backgroundImage : ""}')`,
      }}
    >
      <div className="search-page-wrapper">
        <SearchSectionBar
          selectedSection={selectedSection}
          setSelectedSection={setSelectedSection}
          setOptions={setOptions}
        />

        <h1 className="search-keyword-title">
          Searched <span>{searchKeyword}</span>
        </h1>

        <TopicBar />

        {selectedSection === 1 && (
          <TaggedPhotoGrid
            setBackgroundImage={setBackgroundImage}
            options={options}
          />
        )}
        {selectedSection === 2 && (
          <CollectionGrid setBackgroundImage={setBackgroundImage} />
        )}
        {selectedSection === 3 && <UserGrid />}
      </div>
    </div>
  );
}

export default Search;
