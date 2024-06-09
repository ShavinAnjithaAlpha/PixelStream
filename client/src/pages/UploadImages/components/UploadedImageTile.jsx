import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faClose } from "@fortawesome/free-solid-svg-icons";
import "./UploadedImageTile.css";

function UploadedImageTile({ photo, onClose }) {
  return (
    <div
      className="uploaded-image-tile"
      style={{ borderBottom: photo.status ? "5px solid lime" : "none" }}
    >
      <div className="image-box">
        <div className="close" onClick={(e) => onClose(photo)}>
          <FontAwesomeIcon icon={faClose} style={{ color: "white" }} />
        </div>
        <img src={photo.photo} alt="upload" width={400} />
      </div>
      <div className="image-input-form">
        <div className="photo-item">
          <p>Title</p>
          <h4>{photo.title}</h4>
        </div>
        <div className="photo-item">
          <p>Description</p>
          <h4>{photo.description}</h4>
        </div>
        <div className="photo-item">
          <p>Location</p>
          <h4>{photo.location}</h4>
        </div>

        <p>Tags</p>
        <div className="tag-list">
          {photo.tags.map((tag, index) => (
            <div className="tag" key={index}>
              {tag}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default UploadedImageTile;
