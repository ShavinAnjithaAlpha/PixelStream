import React, { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import "./PhotoCard.css";

function PhotoCard({ photo }) {
  const navigate = useNavigate();
  const [isHovered, setIsHovered] = useState(false);

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
            <div className="down-wrapper">
              <img
                className="img"
                alt="Down"
                src="assets/img/icons8-down-96.png"
              />
            </div>
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
