import React from "react";
import { useNavigate } from "react-router-dom";
import "./CollectionPanelCard.css";

function CollectionPanelCard({ collection }) {
  const navigate = useNavigate();
  // handle the click event to navigate to the collection page
  const handleClick = () => {
    // navigate to the collection page
    navigate(`/collection/${collection.collectionId}`);
  };

  return (
    <div className="col-panel-tile" onClick={handleClick}>
      <img
        src={
          collection.Photo && collection.Photo.resizedPhotoUrl
            ? collection.Photo.resizedPhotoUrl
            : collection.Photo && collection.Photo.photoUrl
        }
        alt={collection.collectionName}
        loading="lazy"
        width={35}
        height={35}
      />
      <div className="content">
        <h3>{collection.collectionName}</h3>
        <p>{collection.User && collection.User.fullName}</p>
      </div>
    </div>
  );
}

export default CollectionPanelCard;
