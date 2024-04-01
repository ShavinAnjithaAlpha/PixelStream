import React from "react";
import "./AddCollectionCard.css";

function AddCollectionCard({ collection }) {
  return (
    <>
      {collection.Photo && (
        <div
          className="add-collection-card"
          style={{ backgroundImage: `url('${collection.Photo.photoUrl}')` }}
        >
          <h1>{collection.collectionName}</h1>
        </div>
      )}
    </>
  );
}

export default AddCollectionCard;
