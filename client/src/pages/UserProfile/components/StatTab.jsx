import React, { useEffect, useState } from "react";
import axios from "../../../axios";
import StatPhotoCard from "./StatPhotoCard";
import Select from "react-select";
import "./StatTab.css";

function StatTab({ username }) {
  const options = [
    { value: "views", label: "Views" },
    { value: "likes", label: "Likes" },
    { value: "downloads", label: "Downloads" },
    { value: "dislikes", label: "Dislikes" },
  ];

  const [photos, setPhotos] = useState([]);
  const [sortBy, setSortBy] = useState("views");

  useEffect(() => {
    axios
      .get(`/users/${username}/photos?count=20`)
      .then((res) => {
        setPhotos(res.data.photos);
      })
      .catch((err) => {
        console.log(err);
      });
  });

  const sortedPhotos = () => {
    if (sortBy === "views") {
      return photos.sort((a, b) => b.PhotoStat.views - a.PhotoStat.views);
    } else if (sortBy === "likes") {
      return photos.sort((a, b) => b.PhotoStat.likes - a.PhotoStat.likes);
    } else if (sortBy === "downloads") {
      return photos.sort(
        (a, b) => b.PhotoStat.downloads - a.PhotoStat.downloads
      );
    } else {
      return photos.sort((a, b) => b.PhotoStat.dislikes - a.PhotoStat.dislikes);
    }
  };

  return (
    <div className="stat-tab">
      <div className="control-bar">
        <h2>Images</h2>
        <Select
          options={options}
          placeholder="Sort By"
          defaultValue={options[0]}
          className="option-box"
          onChange={(e) => setSortBy(e.value)}
        />
      </div>
      {photos.length === 0 && (
        <div className="no-stat">
          <h1>No Stats Available</h1>
        </div>
      )}
      <div className="stat-tab-grid">
        {photos &&
          sortedPhotos(photos).map((photo, index) => (
            <>
              {photo.PhotoStat && (
                <StatPhotoCard photo={photo} key={index} index={index + 1} />
              )}
            </>
          ))}
      </div>
    </div>
  );
}

export default StatTab;
