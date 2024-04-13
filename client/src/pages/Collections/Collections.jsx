import React, { useEffect, useState } from "react";
import axios from "../../axios";
import CollectionCard from "../../components/CollectionCard/CollectionCard";
import Spinner from "../../components/Spinner/Spinner";
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
    <div
      className="global-collections"
      style={{
        backgroundImage: `url('https://images.unsplash.com/photo-1612833943307-4b3b3b3b3b3b')`,
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
    >
      <h1>Collections</h1>

      {!collections && <Spinner />}

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
