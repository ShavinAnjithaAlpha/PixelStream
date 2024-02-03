import React from "react";
import axios from "../../axios";
import "./Home.css";
import PhotoGrid from "../../components/PhotoGrid";
import PageNavigationBar from "../../components/PageNavigationBar/PageNavigationBar";
const { useEffect, useState } = require("react");

function Home() {
  const numButtons = 10;
  const [photos, setPhotos] = useState([]);

  useEffect(() => {
    axios.get("/photos?limit=12").then((res) => {
      setPhotos(res.data);
    });
  }, []);

  const handlePageChange = (page) => {
    axios.get(`/photos?limit=12&page=${page}`).then((res) => {
      setPhotos(res.data);
    });
  };

  return (
    <div className="App">
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
