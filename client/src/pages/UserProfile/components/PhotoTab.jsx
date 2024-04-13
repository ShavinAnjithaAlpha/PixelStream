import React from "react";
import PhotoGrid from "../../../components/PhotoGrid";
import PageNavigationBar from "../../../components/PageNavigationBar/PageNavigationBar";
import "./PhotoTab.css";

function PhotoTab({ photos }) {
  return (
    <div className="user-photo-tab">
      {photos.length === 0 && (
        <div
          className="no-photos"
          style={{ color: "#ffffff44", margin: "4rem" }}
        >
          <h1>No photos</h1>
        </div>
      )}

      <div>
        <PhotoGrid photos={photos} />
      </div>

      <PageNavigationBar
        max={100}
        limit={5}
        onPageChange={(page) => console.log(page)}
      />
    </div>
  );
}

export default PhotoTab;
