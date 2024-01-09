import React from "react";
import axios from "axios";
import "./Home.css";
import { useNavigate } from "react-router-dom";
const { useEffect, useState } = require("react");

function Home() {
  const numButtons = 10;
  const [photos, setPhotos] = useState([]);
  let navigate = useNavigate();

  useEffect(() => {
    axios.get("http://localhost:3000/api/photos").then((res) => {
      setPhotos(res.data);
    });
  }, []);

  const handlePageChange = (page) => {
    axios.get(`http://localhost:3000/api/photos?page=${page}`).then((res) => {
      setPhotos(res.data);
    });
  };

  return (
    <div className="App">
      <h1>Photos</h1>

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

      <div className="photo-grid">
        {photos.map((photo) => (
          <div
            key={photo.photoId}
            className="photo-container"
            onClick={() => {
              navigate(`/photo/${photo.photoId}`);
            }}
          >
            <h2>{photo.photoTitle}</h2>
            <div className="photo-box">
              <img
                src={photo.photoUrl}
                alt={photo.photoDes}
                className="no-download"
              />
            </div>
            <p>{photo.photoDes}</p>
            <b>{photo.location}</b>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Home;
