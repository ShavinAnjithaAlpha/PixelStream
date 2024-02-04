import React from "react";
import { useNavigate } from "react-router-dom";
import axios from "../../axios";
import "./Home.css";
import PhotoGrid from "../../components/PhotoGrid";
import PageNavigationBar from "../../components/PageNavigationBar/PageNavigationBar";
import TopicBar from "../../components/TopicBar/TopicBar";
import TagSearch from "../../helpers/TagSearch";
const { useEffect, useState, useContext } = require("react");
const { SearchContext } = require("../../contexts/search.context");

function Home() {
  const navigate = useNavigate();
  const [photos, setPhotos] = useState([]);
  const { setSearchKeyword } = useContext(SearchContext);

  useEffect(() => {
    axios.get("/photos?limit=12").then((res) => {
      setPhotos(res.data);
    });
  }, []);

  const handlePageChange = (page) => {
    axios
      .get(`/photos?limit=12&page=${page}`)
      .then((res) => {
        setPhotos(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const handleSearch = (e) => {
    if (e.key === "Enter") {
      // first navigate to the search page
      navigate("/search");
      // then set the search keyword so it will triger the search end points
      setSearchKeyword(e.target.value);
    }
  };

  return (
    <div className="App">
      <TopicBar handleTagSearch={TagSearch()} />
      <div className="home-search">
        <h1>PhotoStock</h1>
        <p>
          The internet’s source for visuals. Powered by creators everywhere.
        </p>
        <input
          type="text"
          placeholder="Search for photos"
          onKeyUp={handleSearch}
        />
        <button>Search</button>
      </div>

      <PhotoGrid photos={photos} />
      <div className="page-bar">
        <PageNavigationBar
          max={100}
          limit={5}
          handlePageChange={handlePageChange}
        />
      </div>
    </div>
  );
}

export default Home;
