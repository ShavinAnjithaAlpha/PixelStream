import React, { useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import "./PhotoCard.css";
import axios from "axios";
import { AuthContext } from "../helpers/AuthContext";

function PhotoCard({ photo }) {
  const navigate = useNavigate();
  const [isHovered, setIsHovered] = useState(false);
  const { authState } = useContext(AuthContext);

  // function for download photo
  const downloadPhoto = () => {
    // based on  the auth state, differ the download API endpoint
    if (authState.status) {
      axios
        .get(`http://localhost:3000/api/photos/${photo.photoId}/download`, {
          headers: {
            Authorization: `${authState.user}`,
          },
        })
        .then((res) => {});
    } else {
      axios
        .get(`http://localhost:3000/api/photos/${photo.photoId}/download`, {})
        .then((res) => {});
    }
  };

  return (
    <>
      <div
        className="photo-card"
        onMouseEnter={() => {
          setIsHovered(true);
        }}
        onMouseLeave={() => {
          setIsHovered(false);
        }}
        onClick={() => {
          navigate(`/photo/${photo.photoId}`);
        }}
      >
        <div className="overlap-group-wrapper">
          <div
            className={`overlap-group ${isHovered ? "darken" : ""}`}
            style={{ backgroundImage: `url('${photo.photoUrl}')` }}
          >
            <div className="overlap">
              <img
                className="img"
                alt="Favorite"
                src="assets/img/icons8-favorite-96.png"
              />
            </div>
            <a href={photo.photoUrl}>
              <div className="down-wrapper" onClick={downloadPhoto}>
                <img
                  className="img"
                  alt="Down"
                  src="assets/img/icons8-down-96.png"
                />
              </div>
            </a>
            <div className="plus-wrapper">
              <img
                className="img"
                alt="Plus"
                src="assets/img/icons8-plus-96.png"
              />
            </div>
            <div className={`text-wrapper ${isHovered ? "show" : "not-show"}`}>
              {photo.photoTitle}
            </div>
            <div className={`div ${isHovered ? "show" : "not-show"}`}>
              {photo.User.fullName}
            </div>
            <img
              className={`default-profile-icon ${
                isHovered ? "show" : "not-show"
              }`}
              alt="Default profile icon"
              src="assets/img/default-profile-icon.png"
            />
          </div>
        </div>
      </div>
    </>
  );
}

export default PhotoCard;
