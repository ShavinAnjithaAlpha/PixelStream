import React from "react";
import "./UploadImageTile.css";

function UploadImageTile({ image }) {
  return (
    <div className="upload-image-tile">
      <img src={image} alt="upload" width={400} />
    </div>
  );
}

export default UploadImageTile;