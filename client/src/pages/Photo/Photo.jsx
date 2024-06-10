import React, { useContext, useEffect, useState } from "react";
import moment from "moment";
import { useParams } from "react-router-dom";
import { DownloadButton } from "./components/DownloadButton";
import { ProfileCard } from "./components/ProfileCard";
import { TagBar } from "./components/TagBar";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import SendIcon from "@mui/icons-material/Send";
import {
  faHeart,
  faPlus,
  faSpinner,
  faEye,
  faThumbsDown,
  faTrash,
  faLocationDot,
  faCamera,
  faShare,
} from "@fortawesome/free-solid-svg-icons";
import PhotoGrid from "../../components/PhotoGrid";
import CollectionCard from "../../components/CollectionCard/CollectionCard";
import useHandlePhoto from "../../hooks/useHandlePhoto";
import { AuthContext } from "../../contexts/auth.context";
import "./Photo.css";

function Photo() {
  const { id } = useParams();
  const { authState } = useContext(AuthContext);
  const {
    photo,
    comments,
    setPhoto,
    tags,
    like,
    dislike,
    relatedPhotos,
    relatedCollections,
    likedThePhoto,
    dislikeThePhoto,
    setImageViewerPhoto,
    addToNewCollection,
    addNewComment,
    editComment,
    deleteComment,
    loadMoreComment,
  } = useHandlePhoto(id);

  useEffect(() => {}, [photo]);

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
              style={{
                objectFit: "contain",
                height: "auto",
                maxHeight: "80vh",
              }}
            />
          </div>

          <div className="comment-wrapper">
            <div className="comment-section">
              <h1>{photo.photoTitle}</h1>
              <div className="view-bar">
                <p>
                  {photo.PhotoStat && photo.PhotoStat.views} views
                  <span>{moment(photo.createdAt).fromNow()}</span>
                </p>
              </div>
              <div className="view-bar">
                <p>
                  <FontAwesomeIcon icon={faLocationDot} /> {photo.location}
                  <span>
                    <FontAwesomeIcon icon={faCamera} /> {photo.capturedFrom}
                  </span>
                </p>
              </div>
              <p>{photo.photoDes} </p>
              {photo.User && <ProfileCard user={photo.User} />}

              <div className="btn-bar">
                <div className="btn" onClick={likedThePhoto}>
                  <FontAwesomeIcon
                    icon={faHeart}
                    size="xl"
                    style={{ color: like ? "#ff2d3e" : "black" }}
                  />
                  {photo.PhotoStat && photo.PhotoStat.likes > 0 && (
                    <span>{photo.PhotoStat.likes}</span>
                  )}
                </div>
                <div className="btn" onClick={dislikeThePhoto}>
                  <FontAwesomeIcon
                    icon={faThumbsDown}
                    size="xl"
                    style={{
                      color: dislike ? "white" : "black",
                    }}
                  />
                  {photo.PhotoStat && photo.PhotoStat.dislikes > 0 && (
                    <span>{photo.PhotoStat.dislikes}</span>
                  )}
                </div>
                <div className="btn" onClick={addToNewCollection}>
                  <FontAwesomeIcon icon={faPlus} size="xl" />
                </div>

                <DownloadButton
                  photoId={photo.photoId}
                  setPhoto={setPhoto}
                  photo={photo}
                />

                <button
                  className="photo-view-btn"
                  onClick={setImageViewerPhoto}
                >
                  <FontAwesomeIcon icon={faEye} size="xl" />
                </button>
                <div className="btn">
                  <FontAwesomeIcon icon={faShare} size="xl" />
                  {photo.PhotoStat && photo.PhotoStat.dislikes > 0 && (
                    <span>{photo.PhotoStat.dislikes}</span>
                  )}
                </div>

                <p style={{ marginLeft: "10px" }}>
                  {photo.PhotoStat && photo.PhotoStat.downloads} downloads
                </p>
              </div>

              <TagBar tags={tags} />

              <h2>
                Comments <span>{comments.total}</span>
              </h2>
              <div className="comment-list">
                <div className="add-comment">
                  <input
                    type="text"
                    placeholder="Add a comment"
                    onKeyDown={(e) => {
                      if (e.key === "Enter") {
                        addNewComment(e.target.value);
                        e.target.value = "";
                      }
                    }}
                  />

                  <button
                    onClick={(e) => {
                      addNewComment(e.target.value);
                      e.target.value = "";
                    }}
                  >
                    <SendIcon />
                  </button>
                </div>
                {comments.comments && comments.comments.length === 0 && (
                  <h3>No comments</h3>
                )}
                {comments.comments &&
                  comments.comments.map((comment, index) => (
                    <div className="comment" key={index}>
                      <div className="user-bar">
                        <div className="profile-pic">
                          <img
                            src={comment.User.profilePic}
                            alt="profile"
                            width={35}
                            height={35}
                          />
                        </div>
                        <p>
                          {comment.User.fullName}{" "}
                          <span>{moment(comment.createdAt).fromNow()} </span>
                        </p>

                        {comment.User.userId === authState.userId && (
                          <>
                            <button onClick={(e) => deleteComment(comment)}>
                              <FontAwesomeIcon icon={faTrash} />
                            </button>

                            <button onClick={(e) => editComment(comment)}>
                              Edit
                            </button>
                          </>
                        )}
                      </div>
                      <div className="comment-text">{comment.comment}</div>
                    </div>
                  ))}
                {comments.comments &&
                  comments.total > comments.comments.length && (
                    <button id="load-more" onCLick={loadMoreComment}>
                      Load More
                    </button>
                  )}
              </div>
            </div>
          </div>

          {/* <div className="detail-tab">
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
                      icon={faThumbsDown}
                      size="2xl"
                      style={{
                        color: dislike ? "#770000" : "black",
                      }}
                    />
                  </div>
                  <div className="btn" onClick={addToNewCollection}>
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
          </div> */}
        </div>

        {/* related photo section */}
        <h2>Related Photos</h2>
        {!relatedPhotos && <FontAwesomeIcon icon={faSpinner} spin="true" />}
        {relatedPhotos && <PhotoGrid photos={relatedPhotos} />}
        {relatedPhotos.length === 0 && <h3>No related Photos</h3>}

        {/* // related collection section */}
        <h2>Related Collections</h2>
        {!relatedCollections && (
          <FontAwesomeIcon icon={faSpinner} spin="true" />
        )}

        {relatedCollections.length === 0 && <h3>No related Collections</h3>}
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
