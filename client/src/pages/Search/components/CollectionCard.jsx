import React from "react";
import { Tag } from "./Tag";
import "./CollectionCard.css";

function CollectionCard({ collection }) {
  return (
    <div className="collection-card">
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
