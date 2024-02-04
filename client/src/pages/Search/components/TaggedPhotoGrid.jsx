import React, { useState, useEffect, useContext } from "react";
import axios from "../../../axios";
import TaggedPhotoCard from "./TaggedPhotoCard";
import { SearchContext } from "../../../contexts/search.context";
import "./TaggedPhotoGrid.css";

function TaggedPhotoGrid() {
  const { searchKeyword } = useContext(SearchContext);
  const [photos, setPhotos] = useState([]);

  useEffect(() => {
    if (searchKeyword) {
      axios
        .get(`search/photos?query=${searchKeyword}&limit=12`)
        .then((res) => {
          setPhotos(res.data.photos);
        })
        .catch((err) => {
          console.log(err);
        });
    }
  });
  return (
    <div className="tagged-photo-grid">
      {photos.map((photo) => (
        <TaggedPhotoCard photo={photo} key={photo.photoId} />
      ))}
      {/* TODO: styling */}
      {photos.length === 0 && <p>No Photos Available</p>}
    </div>
  );
}

export default TaggedPhotoGrid;
