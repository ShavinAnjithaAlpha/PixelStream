import React, { Fragment } from "react";
import TaggedPhotoCard from "./TaggedPhotoCard";
import Spinner from "../../../components/Spinner/Spinner";
import PageNavigationBar from "../../../components/PageNavigationBar/PageNavigationBar";
import usePhotoSearch from "../../../hooks/usePhotoSearch";
import "./TaggedPhotoGrid.css";
import NextPrevPage from "../../../components/NextPrevPage/NextPrevPage";

function TaggedPhotoGrid({ options }) {
  const { photos, loading, handlePageChange } = usePhotoSearch(options);

  if (loading) {
    return <Spinner />;
  }

  return (
    <Fragment>
      {photos.total === 0 && (
        <p className="no-photos-msg">No Photos Available</p>
      )}
      <div className="tagged-photo-grid">
        {photos.photos &&
          photos.photos.map((photo) => (
            <TaggedPhotoCard photo={photo} key={photo.photoId} />
          ))}
      </div>

      <div className="page-bar">
        <PageNavigationBar
          max={10}
          limit={5}
          handlePageChange={handlePageChange}
          savedPage={parseInt(localStorage.getItem("page-search-photo")) || 1}
        />
      </div>

      {/* <div className="page-bar">
        <NextPrevPage
          initialPage={1}
          handlePageChange={handlePageChange}
          next={photos.total === photos.limit}
        />
      </div> */}
    </Fragment>
  );
}

export default TaggedPhotoGrid;
