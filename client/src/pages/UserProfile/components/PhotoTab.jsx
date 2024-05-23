import React from "react";
import PhotoGrid from "../../../components/PhotoGrid";
import PageNavigationBar from "../../../components/PageNavigationBar/PageNavigationBar";
import useUserPhotoHandler from "../../../hooks/useUserPhotoHandler";
import Spinner from "../../../components/Spinner/Spinner";
import "./PhotoTab.css";

function PhotoTab({ username }) {
  const { photos, loading, handlePageChange } = useUserPhotoHandler(username);

  return (
    <div className="user-photo-tab">
      {loading && <Spinner />}

      {photos.length === 0 && (
        <div className="no-photos">
          <h1>No photos</h1>
        </div>
      )}

      <div>
        <PhotoGrid photos={photos} />
      </div>

      <PageNavigationBar
        max={20}
        limit={5}
        handlePageChange={handlePageChange}
        savedPage={parseInt(localStorage.getItem("page-user-photo")) || 1}
      />
    </div>
  );
}

export default PhotoTab;
