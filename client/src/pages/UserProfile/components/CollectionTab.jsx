import React, { useEffect } from "react";
import CollectionCard from "../../../components/CollectionCard/CollectionCard";
import axios from "../../../axios";
import "./CollectionTab.css";

function CollectionTab({ username }) {
  const [collections, setCollections] = React.useState([]);

  useEffect(() => {
    // fetch collections by username
    axios
      .get(`users/${username}/collections`)
      .then((res) => {
        setCollections(res.data.collections);
      })
      .catch((err) => {
        console.log(err);
      });
  }, [username]);

  return (
    <>
      {!collections.length && (
        <div className="no-collections">
          <h1>No collections</h1>
        </div>
      )}

      <div className="profile-collection-grid">
        {collections.map((collection) => (
          <CollectionCard
            key={collection.collectionId}
            collection={collection}
          />
        ))}
      </div>
    </>
  );
}

export default CollectionTab;
