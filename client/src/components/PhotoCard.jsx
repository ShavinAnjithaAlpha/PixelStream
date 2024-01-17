import React from "react";
import { useNavigate } from "react-router-dom";
import "./PhotoCard.css";

function PhotoCard({ photo }) {
  const navigate = useNavigate();

  return (
    <div
      key={photo.photoId}
      className="photo-container"
      onClick={() => {
        navigate(`/photo/${photo.photoId}`);
      }}
    >
      {/* <div className="title">
        <h2>{photo.photoTitle}</h2>
      </div> */}
      <img src={photo.photoUrl} alt={photo.photoDes} className="no-download" />
    </div>
  );
}

export default PhotoCard;
