import React, { useEffect, useState } from "react";
import PhotoGrid from "../../../components/PhotoGrid";
import axios from "../../../axios";

function PhotoTab({ photos }) {
  return (
    <div>
      <PhotoGrid photos={photos} />
    </div>
  );
}

export default PhotoTab;
