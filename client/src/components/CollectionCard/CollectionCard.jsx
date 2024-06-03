import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "../../axios";
import { Tag } from "../Tag/Tag";
import CollectionDefaultImage from "../../../public/assets/img/image-gallery.png";
import "./CollectionCard.css";

function CollectionCard({ collection }) {
  const navigate = useNavigate();
  const [tags, setTags] = useState([]);

  const handleClick = (e) => {
    // navigate to the collection page
    navigate(`/collection/${collection.collectionId}`);
  };

  useEffect(() => {
    // get the tags of the collection
    axios
      .get(`/collections/${collection.collectionId}/tags`)
      .then((res) => {
        setTags(res.data);
      })
      .catch((err) => {});
  });

  return (
    <div className="collection-card" onClick={handleClick}>
      <div className="cover-image">
        {collection.Photo && collection.Photo.photoUrl && (
          <img
            src={collection.Photo.photoUrl}
            alt={collection.Photo.photoTitle}
            width={400}
            onError={(e) => {
              e.target.src = CollectionDefaultImage;
            }}
          ></img>
        )}
      </div>
      <div className="title">{collection.collectionName}</div>
      <div className="detail-bar">
        <p>{collection.photoCount} Photos</p>
        <p>{collection.User && collection.User.fullName}</p>
      </div>
      <div className="tag-bar">
        {tags.map((tag, index) => (
          <Tag key={index} tagName={tag} />
        ))}
      </div>
    </div>
  );
}

export default CollectionCard;
