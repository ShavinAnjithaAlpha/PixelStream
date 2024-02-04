import React from "react";
import { useNavigate } from "react-router-dom";
import { Tag } from "../Tag/Tag";
import "./CollectionCard.css";

function CollectionCard({ collection }) {
  const navigate = useNavigate();

  const handleClick = (e) => {
    // navigate to the collection page
    navigate(`/collection/${collection.collectionId}`);
  };

  return (
    <div className="collection-card" onClick={handleClick}>
      <div className="cover-image">
        {collection.Photo && collection.Photo.photoUrl && (
          <img
            src={collection.Photo.photoUrl}
            alt={collection.Photo.photoTitle}
            width={500}
            height={300}
          ></img>
        )}
      </div>
      <div className="title">{collection.collectionName}</div>
      <div className="detail-bar">
        <p>{152} Photos</p>
        <p>{collection.User && collection.User.fullName}</p>
      </div>
      <div className="tag-bar">
        <Tag key={1} tagName={1} />
        <Tag key={1} tagName={1} />
      </div>
    </div>
  );
}

export default CollectionCard;
