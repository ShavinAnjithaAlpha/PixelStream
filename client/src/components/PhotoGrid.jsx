import React from "react";
import PhotoCard from "./PhotoCard";
import "./PhotoGrid.css";

function PhotoGrid({ photos }) {
  return (
    <div className="photo-grid">
      {photos.map((photo) => (
        <PhotoCard photo={photo} key={photo.photoId} />
      ))}
    </div>
  );
}

export default PhotoGrid;
