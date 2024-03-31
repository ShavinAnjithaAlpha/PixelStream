import React, { useEffect, useState } from "react";
import axios from "../../axios";
import CollectionCard from "../../components/CollectionCard/CollectionCard";
import "./Collections.css";

function Collections() {
  const [collections, setCollections] = useState([]);

  useEffect(() => {
    axios
      .get("collections")
      .then((res) => {
        setCollections(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  return (
    <div className="global-collections">
      <h1>Collections</h1>

      <div className="global-collections-grid">
        {collections &&
          collections.map((collection) => (
            <CollectionCard
              key={collection.collectionId}
              collection={collection}
            />
          ))}
      </div>
    </div>
  );
}

export default Collections;
