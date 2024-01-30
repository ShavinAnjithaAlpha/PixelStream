import React, { useState, useEffect } from "react";
import PhotoCard from "../../../components/PhotoCard";
import { Tag } from "./Tag";
import axios from "../../../axios";
import "./TaggedPhotoCard.css";

function TaggedPhotoCard({ photo }) {
  const [tags, setTags] = useState([]);

  useEffect(() => {});
  axios
    .get(`/photos/${photo.photoId}/tags`)
    .then((res) => {
      setTags(res.data);
    })
    .catch((err) => {
      console.log(err);
    });

  return (
    <div className="tagged-photo-card">
      <PhotoCard photo={photo} />
      <div className="tag-bar">
        {tags.map((tag) => (
          <Tag key={tag} tagName={tag} />
        ))}
      </div>
    </div>
  );
}

export default TaggedPhotoCard;
