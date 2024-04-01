import React from "react";
import { useNavigate } from "react-router-dom";
import axios from "../../axios";
import PhotoGrid from "../../components/PhotoGrid";
import PageNavigationBar from "../../components/PageNavigationBar/PageNavigationBar";
import TopicBar from "../../components/TopicBar/TopicBar";
import { useEffect, useState, useContext } from "react";
import { SearchContext } from "../../contexts/search.context";
import CollectionPanel from "./components/CollectionPanel";
import AddToCollectionBox from "../../components/AddToCollectionBox/AddToCollectionBox";
import "./Home.css";

function Home() {
  const navigate = useNavigate();
  const [photos, setPhotos] = useState([]);
  const [addCollectionBox, setAddCollectionBox] = useState(false);
  const { setSearchKeyword } = useContext(SearchContext);

  useEffect(() => {
    // load the loclal storage data for paging the photos
    let page = 1;
    if (localStorage.getItem("page-photo")) {
      page = parseInt(localStorage.getItem("page-photo"));
    }

    axios
      .get(`/photos?limit=18&page=${page}`)
      .then((res) => {
        setPhotos(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  const handlePageChange = (page) => {
    axios
      .get(`/photos?limit=18&page=${page}`)
      .then((res) => {
        setPhotos(res.data);
        // save the page to the local storage
        localStorage.setItem("page-photo", page);
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
      <TopicBar />
      <div className="top-section">
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

        <CollectionPanel />
      </div>

      <PhotoGrid photos={photos} addCollection={setAddCollectionBox} />
      <div className="page-bar">
        <PageNavigationBar
          max={100}
          limit={5}
          handlePageChange={handlePageChange}
          savedPage={parseInt(localStorage.getItem("page-photo")) || 1}
        />
      </div>

      {addCollectionBox && (
        <div className="add-collection-popup">
          <AddToCollectionBox setClose={setAddCollectionBox} />
        </div>
      )}
    </div>
  );
}

export default Home;
