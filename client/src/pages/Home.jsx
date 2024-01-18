import React from "react";
import axios from "../axios";
import "./Home.css";
import PhotoGrid from "../components/PhotoGrid";
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
      <div className="page-bar">
        {Array.from({ length: numButtons }).map((_, index) => (
          <button
            key={index}
            onClick={(e) => {
              handlePageChange(index + 1);
            }}
          >
            {" "}
            {index + 1}
          </button>
        ))}
      </div>
      <PhotoGrid photos={photos} />
    </div>
  );
}

export default Home;
