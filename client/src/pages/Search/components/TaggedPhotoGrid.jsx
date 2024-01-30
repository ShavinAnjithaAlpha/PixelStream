import React, { useState, useEffect } from "react";
import axios from "../../../axios";
import TaggedPhotoCard from "./TaggedPhotoCard";
import "./TaggedPhotoGrid.css";

function TaggedPhotoGrid() {
  const [photos, setPhotos] = useState([]);

  useEffect(() => {
    axios.get("/photos?limit=12").then((res) => {
      setPhotos(res.data);
    });
  });
  return (
    <div className="tagged-photo-grid">
      {photos.map((photo) => (
        <TaggedPhotoCard photo={photo} key={photo.photoId} />
      ))}
    </div>
  );
}

export default TaggedPhotoGrid;
