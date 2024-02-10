import React, { useState, useEffect, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { SearchContext } from "../../../contexts/search.context";
import PhotoCard from "../../../components/PhotoCard";
import { Tag } from "./Tag";
import axios from "../../../axios";
import "./TaggedPhotoCard.css";

function TaggedPhotoCard({ photo }) {
  const navigate = useNavigate();
  const { setSearchKeyword } = useContext(SearchContext);
  const [tags, setTags] = useState([]);

  const tagSearch = (tag) => {
    // search for photos with the tag
    setSearchKeyword(tag);
    // navigate to the search page
    navigate("/search");
  };

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
          <Tag key={tag} tagName={tag} handleClick={tagSearch} />
        ))}
      </div>
    </div>
  );
}

export default TaggedPhotoCard;
