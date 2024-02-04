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
        setLikePhotos(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  });
  return (
    <div className="like-photo-grid">
      {likePhotos.map((photo) => (
        <PhotoCard key={photo.id} photo={photo} />
      ))}
    </div>
  );
}

export default LikesTab;
