import React, { useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import axios from "../axios";
import favoriteIcon from "../assets/img/icons8-favorite-96.png";
import downIcon from "../assets/img/icons8-down-96.png";
import plusIcon from "../assets/img/icons8-plus-96.png";
import defaultProfileIcon from "../assets/img/default-profile-icon.png";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faHeart,
  faPlus,
  faArrowDown,
} from "@fortawesome/free-solid-svg-icons";
import { AuthContext } from "../contexts/auth.context";
import "./PhotoCard.css";

function PhotoCard({ photo }) {
  const navigate = useNavigate();
  const [isHovered, setIsHovered] = useState(false);
  const { authState } = useContext(AuthContext);

  // function for download photo
  const downloadPhoto = () => {
    // based on  the auth state, differ the download API endpoint
    if (authState.status) {
      axios
        .get(`/photos/${photo.photoId}/download`, {
          headers: {
            Authorization: `${authState.user}`,
          },
        })
        .then((res) => {});
    } else {
      axios.get(`/photos/${photo.photoId}/download`, {}).then((res) => {});
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
            style={{
              backgroundImage: `url('${
                photo.resizedPhotoUrl ? photo.resizedPhotoUrl : photo.photoUrl
              }')`,
            }}
          >
            <div className="overlap">
              {/* <img className="img" alt="Favorite" src={favoriteIcon} /> */}
              <FontAwesomeIcon icon={faHeart} size="xl" />
            </div>
            <a href={photo.photoUrl}>
              <div className="down-wrapper" onClick={downloadPhoto}>
                {/* <img className="img" alt="Down" src={downIcon} /> */}
                <FontAwesomeIcon
                  icon={faArrowDown}
                  size="xl"
                  style={{ color: "black" }}
                />
              </div>
            </a>
            <div className="plus-wrapper">
              {/* <img className="img" alt="Plus" src={plusIcon} /> */}
              <FontAwesomeIcon icon={faPlus} size="xl" />
            </div>
            <div className={`text-wrapper ${isHovered ? "show" : "not-show"}`}>
              {photo.photoTitle}
            </div>
            <div className={`div ${isHovered ? "show" : "not-show"}`}>
              {photo.User && photo.User.fullName}
            </div>
            <img
              className={`default-profile-icon ${
                isHovered ? "show" : "not-show"
              }`}
              alt="Default profile icon"
              src={defaultProfileIcon} // TODO: fix this
            />
          </div>
        </div>
      </div>
    </>
  );
}

export default PhotoCard;
