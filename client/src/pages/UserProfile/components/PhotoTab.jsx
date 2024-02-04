import React, { useEffect, useState } from "react";
import PhotoGrid from "../../../components/PhotoGrid";
import axios from "../../../axios";

function PhotoTab({ username }) {
  const [photos, setPhotos] = useState([]);

  useEffect(() => {
    axios
      .get(`/users/${username}/photos?count=10`)
      .then((res) => {
        setPhotos(res.data.photos);
      })
      .catch((err) => {
        console.log(err);
      });
  }, [username]);

  return (
    <div>
      <PhotoGrid photos={photos} />
    </div>
  );
}

export default PhotoTab;
