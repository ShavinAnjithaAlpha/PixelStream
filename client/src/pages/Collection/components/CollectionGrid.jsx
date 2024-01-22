import React from "react";
import PhotoCard from "../../../components/PhotoCard";
import "./CollectionGrid.css";

function CollectionGrid({ photos }) {
  console.log(photos);

  return (
    <div className="photo-grid">
      {photos.map((photo) => (
        <PhotoCard photo={photo.Photo} key={photo.Photo.photoId} />
      ))}
    </div>
  );
}

export default CollectionGrid;
