import React from "react";
import PhotoCard from "../../../components/PhotoCard";
import "./CollectionGrid.css";

function CollectionGrid({ photos }) {
  return (
    <div className="col-photo-grid">
      {photos.map((photo) => (
        <PhotoCard photo={photo} key={photo.photoId} />
      ))}
    </div>
  );
}

export default CollectionGrid;
