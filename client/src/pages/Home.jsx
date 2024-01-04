import React from "react";
import axios from "axios";
import "./Home.css";
import { useNavigate } from "react-router-dom";
const { useEffect, useState } = require("react");

function Home() {
  const [photos, setPhotos] = useState([]);
  let navigate = useNavigate();

  useEffect(() => {
    axios.get("http://localhost:3000/api/photos").then((res) => {
      setPhotos(res.data);
    });
  }, []);

  return (
    <div className="App">
      <h1>Photos</h1>
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
            <img
              src="http://localhost:3000/upload/20231212_113419.jpg"
              alt={photo.photoDes}
            />
            <p>{photo.photoDes}</p>
            <b>{photo.location}</b>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Home;
