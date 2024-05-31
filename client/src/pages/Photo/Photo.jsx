import React, { useState } from "react";
import { useParams } from "react-router-dom";
import { StatCard } from "./components/StatCard";
import { DownloadButton } from "./components/DownloadButton";
import { ProfileCard } from "./components/ProfileCard";
import { TagBar } from "./components/TagBar";
import AddToCollectionBox from "../../components/EditComponents/AddToCollectionBox/AddToCollectionBox";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import CalendarTodayIcon from "@mui/icons-material/CalendarToday";
import CameraIcon from "@mui/icons-material/Camera";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faHeart,
  faPlus,
  faHeartCrack,
  faSpinner,
  faEye,
} from "@fortawesome/free-solid-svg-icons";
import PhotoGrid from "../../components/PhotoGrid";
import CollectionCard from "../../components/CollectionCard/CollectionCard";
import getFormattedDate from "../../utils/DateFormatter";
import useHandlePhoto from "../../hooks/useHandlePhoto";
import "./Photo.css";

function Photo() {
  const { id } = useParams();
  const {
    photo,
    setPhoto,
    tags,
    like,
    dislike,
    relatedPhotos,
    relatedCollections,
    likedThePhoto,
    dislikeThePhoto,
    setImageViewerPhoto,
  } = useHandlePhoto(id);
  const [addCollectionBox, setAddCollectionBox] = useState(false);

  return (
    <div
      className="photo-page-wrapper"
      style={{
        backgroundImage: `url('${photo.resizedPhotoUrl}')`,
      }}
    >
      <div className="photo-page-box">
        <div className="photo-page">
          <div className="photo-container">
            <img
              className="photo no-download"
              src={photo.photoUrl}
              alt={photo.photoDes}
              width={700}
            />
          </div>
          <div className="detail-tab">
            <div className="photo-detail-panel">
              {photo.User && <ProfileCard user={photo.User} />}
              <div className="title-tab">
                <h2>{photo.photoTitle}</h2>
                <div className="btn-bar">
                  <div className="btn" onClick={likedThePhoto}>
                    <FontAwesomeIcon
                      icon={faHeart}
                      size="2xl"
                      style={{ color: like ? "red" : "black" }}
                    />
                  </div>
                  <div className="btn" onClick={dislikeThePhoto}>
                    <FontAwesomeIcon
                      icon={faHeartCrack}
                      size="2xl"
                      style={{
                        color: dislike ? "orange" : "black",
                      }}
                    />
                  </div>
                  <div
                    className="btn"
                    onClick={(e) => setAddCollectionBox(true)}
                  >
                    <FontAwesomeIcon icon={faPlus} size="2xl" />
                  </div>

                  <DownloadButton
                    photoId={photo.photoId}
                    setPhoto={setPhoto}
                    photo={photo}
                  />
                </div>
              </div>
              <p>{photo.photoDes}</p>
              <button className="photo-view-btn" onClick={setImageViewerPhoto}>
                View{"   "}{" "}
                <span>
                  <FontAwesomeIcon icon={faEye} style={{ marginLeft: "5px" }} />
                </span>
              </button>
              {photo.PhotoStat && (
                <div className="stat-bar">
                  <StatCard
                    labelName="View"
                    labelValue={photo.PhotoStat.views}
                  />
                  <StatCard
                    labelName="Downloads"
                    labelValue={photo.PhotoStat.downloads}
                  />
                  <StatCard
                    labelName="Likes"
                    labelValue={photo.PhotoStat.likes}
                  />
                  <StatCard
                    labelName="Dislikes"
                    labelValue={photo.PhotoStat.dislikes}
                  />
                </div>
              )}
              <ul className="detail-list">
                <li className="detail-item">
                  <CalendarTodayIcon />
                  <span className="line">
                    Published on {getFormattedDate(photo.createdAt)}
                  </span>
                </li>
                {photo.location && (
                  <li className="detail-item">
                    <LocationOnIcon />
                    <span className="line">{photo.location}</span>
                  </li>
                )}
                {photo.capturedFrom && (
                  <li className="detail-item">
                    <CameraIcon />
                    <span className="line">{photo.capturedFrom}</span>
                  </li>
                )}
              </ul>
              <TagBar tags={tags} />
            </div>
          </div>
        </div>

        {/* add to collection popup window */}
        {addCollectionBox && (
          <div className="add-collection-popup">
            <AddToCollectionBox
              setClose={setAddCollectionBox}
              selectedPhoto={photo}
            />
          </div>
        )}

        {/* related photo section */}
        <h2>Related Photos</h2>
        {!relatedPhotos && <FontAwesomeIcon icon={faSpinner} spin="true" />}
        {relatedPhotos && <PhotoGrid photos={relatedPhotos} />}

        {/* // related collection section */}
        <h2>Related Collections</h2>
        {!relatedCollections && (
          <FontAwesomeIcon icon={faSpinner} spin="true" />
        )}
        <div className="photo-collections-grid">
          {relatedCollections.map((collection) => (
            <CollectionCard
              key={collection.collectionId}
              collection={collection}
            />
          ))}
        </div>
      </div>
    </div>
  );
}

export default Photo;
