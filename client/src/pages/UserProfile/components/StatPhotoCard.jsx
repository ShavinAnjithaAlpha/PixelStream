import React from "react";
import { useNavigate } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHeart, faHeartBroken } from "@fortawesome/free-solid-svg-icons";
import "./StatPhotoCard.css";

function StatPhotoCard({ photo, index }) {
  const navigate = useNavigate();

  const gotoPhoto = () => {
    navigate(`/photo/${photo.photoId}`);
  };

  return (
    <div className="stat-photo-card">
      <div className="stat-photo-card-image" onClick={gotoPhoto}>
        <img
          src={photo.resizedPhotoUrl ? photo.resizedPhotoUrl : photo.photoUrl}
          alt={photo.photoTitle}
          width={300}
        />
      </div>
      <div className="stat-content">
        <div className="index">#{index}</div>
        <div className="time">Published on 24 July, 2023</div>
        <div className="values">
          <div className="views">
            <span>Views</span>
            <br />
            <span className="value">
              {photo.PhotoStat ? photo.PhotoStat.views : 0}
            </span>
          </div>
          <div className="downloads">
            <span>Downloads</span>
            <br />
            <span className="value">
              {photo.PhotoStat ? photo.PhotoStat.downloads : 0}
            </span>
          </div>
          <div className="likes">
            <span>
              <FontAwesomeIcon
                icon={faHeart}
                size="xl"
                style={{ color: "red" }}
              />
            </span>
            <span className="value">
              {photo.PhotoStat ? photo.PhotoStat.likes : 0}
            </span>
          </div>
          <div className="dislikes">
            <span>
              <FontAwesomeIcon
                icon={faHeartBroken}
                size="xl"
                style={{ color: "black" }}
              />
            </span>
            <span className="value">
              {photo.PhotoStat ? photo.PhotoStat.dislikes : 0}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}

export default StatPhotoCard;
