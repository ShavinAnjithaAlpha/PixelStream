import React, { useState, useContext, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "../axios";
import defaultProfileIcon from "../assets/img/default-profile-icon.png";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faHeart,
  faPlus,
  faArrowDown,
} from "@fortawesome/free-solid-svg-icons";
import { AuthContext } from "../contexts/auth.context";
import Popup from "reactjs-popup";
import "reactjs-popup/dist/index.css";
import "./PhotoCard.css";

function PhotoCard({ photo, isLiked_ }) {
  const navigate = useNavigate();
  const [isHovered, setIsHovered] = useState(false);
  const { authState } = useContext(AuthContext);
  const [isLiked, setIsLiked] = useState(isLiked_);

  useEffect(() => {
    setIsLiked(isLiked_);
  }, [isLiked_]);

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

  const likedPhoto = (e) => {
    if (!authState.status) {
      navigate("/login");
      return;
    }
    // first change the state of the like
    setIsLiked(!isLiked);

    // based on the liked state call the API
    if (!isLiked) {
      // set the photo as liiked
      axios
        .post(
          `/photos/${photo.photoId}/like`,
          {},
          {
            headers: {
              Authorization: `${authState.user}`,
            },
          }
        )
        .then((res) => {})
        .catch((err) => {
          setIsLiked(false);
        });
    } else {
      // set the photo as non liked
      axios
        .delete(`/photos/${photo.photoId}/like`, {
          headers: {
            Authorization: `${authState.user}`,
          },
        })
        .then((res) => {})
        .catch((err) => {
          setIsLiked(true);
          console.log(err);
        });
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
            <div className="overlap" onClick={likedPhoto}>
              <FontAwesomeIcon
                icon={faHeart}
                size="xl"
                style={{ color: isLiked ? "red" : "black" }}
              />
            </div>
            <a href={photo.photoUrl}>
              <div className="down-wrapper" onClick={downloadPhoto}>
                <FontAwesomeIcon
                  icon={faArrowDown}
                  size="xl"
                  style={{ color: "black" }}
                />
              </div>
            </a>
            <Popup
              trigger={
                <div className="plus-wrapper">
                  <FontAwesomeIcon icon={faPlus} size="xl" />
                </div>
              }
              position={["bottom center", "top center"]}
            >
              <div>Popup content here !!</div>
            </Popup>

            <div className={`text-wrapper ${isHovered ? "show" : "not-show"}`}>
              {photo.photoTitle}
            </div>
            <div
              className="click-wrapper"
              onClick={() => {
                navigate(`/photo/${photo.photoId}`);
              }}
            ></div>
            <div className={`div ${isHovered ? "show" : "not-show"}`}>
              {photo.User && photo.User.fullName}{" "}
            </div>
            <img
              className={`default-profile-icon ${
                isHovered ? "show" : "not-show"
              }`}
              alt="Default profile icon"
              src={defaultProfileIcon} // TODO: fix this
              loading="lazy"
            />
          </div>
        </div>
      </div>
    </>
  );
}

export default PhotoCard;
