import React, { useContext, useEffect, useState } from "react";
import axios from "../../axios";
import CollectionGrid from "./components/CollectionGrid";
import TaggedPhotoGrid from "./components/TaggedPhotoGrid";
import UserGrid from "./components/UserGrid";
import { SearchContext } from "../../contexts/search.context";
import SearchSectionBar from "./components/SearchSectionBar";
import TopicBar from "../../components/TopicBar/TopicBar";
import "./Search.css";

function Search() {
  const { searchKeyword } = useContext(SearchContext);
  const [selectedSection, setSelectedSection] = useState(1);
  const [options, setOptions] = useState({});
  const [backgroundImage, setBackgroundImage] = useState({});

  useEffect(() => {
    axios
      .get("/photos/random?limit=1")
      .then((res) => {
        setBackgroundImage(res.data.photos[0].photoUrl);
      })
      .catch((err) => console.log(err));
  }, []);

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

        {selectedSection === 1 && <TaggedPhotoGrid options={options} />}
        {selectedSection === 2 && <CollectionGrid />}
        {selectedSection === 3 && <UserGrid />}
      </div>
    </div>
  );
}

export default Search;
