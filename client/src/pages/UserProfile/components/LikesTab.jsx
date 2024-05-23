import React from "react";
import PhotoCard from "../../../components/PhotoCard";
import useUserLikesHandler from "../../../hooks/useUserLikesHandler";
import Spinner from "../../../components/Spinner/Spinner";
import PageNavigationBar from "../../../components/PageNavigationBar/PageNavigationBar";
import "./LikesTab.css";

function LikesTab({ username }) {
  const { likePhotos, loading, handlePageChange } =
    useUserLikesHandler(username);

  return (
    <div className="user-likes-tab">
      {loading && <Spinner />}

      {likePhotos.length === 0 && (
        <div className="no-photos">
          <h1>No photos</h1>
        </div>
      )}

      <div className="like-photo-grid">
        {!likePhotos && <h2>No Likes</h2>}
        {likePhotos.map((photo) => (
          <PhotoCard key={photo.photoId} photo={photo} isLiked_={true} />
        ))}
      </div>

      <PageNavigationBar
        max={20}
        limit={5}
        handlePageChange={handlePageChange}
        savedPage={parseInt(localStorage.getItem("page-user-likes")) || 1}
      />
    </div>
  );
}

export default LikesTab;
