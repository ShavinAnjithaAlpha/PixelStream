import React from "react";
import PhotoGrid from "../../../components/PhotoGrid";

function PhotoTab({ photos }) {
  return (
    <>
      {photos.length === 0 && (
        <div className="no-photos">
          <h1>No photos</h1>
        </div>
      )}

      <div>
        <PhotoGrid photos={photos} />
      </div>
    </>
  );
}

export default PhotoTab;
