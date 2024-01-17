import React from "react";
import axios from "axios";
import "./Home.css";
import PhotoGrid from "../components/PhotoGrid";
import { useNavigate } from "react-router-dom";
const { useEffect, useState } = require("react");

function Home() {
  const numButtons = 10;
  const [photos, setPhotos] = useState([]);
  let navigate = useNavigate();

  useEffect(() => {
    axios.get("http://localhost:3000/api/photos?limit=12").then((res) => {
      setPhotos(res.data);
    });
  }, []);

  const handlePageChange = (page) => {
    axios
      .get(`http://localhost:3000/api/photos?limit=12&page=${page}`)
      .then((res) => {
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
      <PhotoGrid photos={photos} />
    </div>
  );
}

export default Home;
