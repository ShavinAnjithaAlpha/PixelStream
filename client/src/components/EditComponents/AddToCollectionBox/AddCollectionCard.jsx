import React, { useState } from "react";
import "./AddCollectionCard.css";

function AddCollectionCard({ collection, onAdd }) {
  const [added, setAdded] = useState(false);

  const addToCollection = () => {
    onAdd();
    setAdded(true);
  };

  return (
    <>
      {collection.Photo && (
        <div
          className={`add-collection-card ${added ? "added" : ""}`}
          style={{
            backgroundImage: `url('${collection.Photo.resizedPhotoUrl}')`,
          }}
          onClick={addToCollection}
        >
          <h1>{collection.collectionName}</h1>
        </div>
      )}
    </>
  );
}

export default AddCollectionCard;
