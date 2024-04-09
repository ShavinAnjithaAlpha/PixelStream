import React, { useContext, useState, useEffect } from "react";
import PhotoCard from "./PhotoCard";
import axios from "../axios";
import { AuthContext } from "../contexts/auth.context";
import Spinner from "./Spinner/Spinner";
import "./PhotoGrid.css";

function PhotoGrid({ photos, addCollection, setSelectedPhoto }) {
  const { authState } = useContext(AuthContext);
  const [likedPhotos, setLikedPhotos] = useState([]);
  const [status, setStatus] = useState(false);

  // function check whether the given photoId is in the liked photos
  const isLiked = (photoId) => {
    return likedPhotos.includes(photoId);
  };

  const loadLiked = (interval) => {
    if (authState.status === false) return;

    const photoIds = photos.map((photo) => photo.photoId);
    const data = { photoIds };

    axios
      .post("/photos/likes", data, {
        headers: { Authorization: `${authState.user}` },
      })
      .then((res) => {
        setLikedPhotos(res.data.photos);
        clearInterval(interval);
        setStatus(true);
      })
      .catch((err) => {
        if (err.error === "Invalid token") {
          localStorage.removeItem("token");
          localStorage.removeItem("username");
          authState.setStatus(false);
          setStatus(true);
        }
      });
  };

  // fetch the photos like status from the server if the user is logged in
  useEffect(() => {
    const interval = setInterval(() => {
      loadLiked(interval);
    }, 1000);
  }, [photos, authState.status]);

  return (
    <>
      {!status && <Spinner />}

      <div className="photo-grid-comp">
        {status &&
          photos.map((photo) => (
            <PhotoCard
              photo={photo}
              key={photo.photoId}
              isLiked_={isLiked(photo.photoId)}
              addCollection={addCollection}
              setSelectedPhoto={setSelectedPhoto}
            />
          ))}
      </div>
    </>
  );
}

export default PhotoGrid;
