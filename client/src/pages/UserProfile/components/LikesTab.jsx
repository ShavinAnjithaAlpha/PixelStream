import React, { useEffect } from "react";
import PhotoCard from "../../../components/PhotoCard";
import axios from "../../../axios";
import "./LikesTab.css";

function LikesTab({ username }) {
  const [likePhotos, setLikePhotos] = React.useState([]);

  useEffect(() => {
    axios
      .get(`users/${username}/likes`)
      .then((res) => {
        // rreformat the data to match the photo card component
        const formattedPhotoData = [];
        res.data.forEach((photo) => {
          formattedPhotoData.push(photo.Photo);
        });
        // set the formatted photo data as the state
        setLikePhotos(formattedPhotoData);
      })
      .catch((err) => {
        console.log(err);
      });
  }, [username]);
  return (
    <div className="like-photo-grid">
      {likePhotos.map((photo) => (
        <PhotoCard key={photo.id} photo={photo} />
      ))}
    </div>
  );
}

export default LikesTab;
