import React, { useEffect, useState } from "react";
import CollectionCard from "./CollectionCard";
import axios from "../../../axios";
import "./CollectionGrid.css";

function CollectionGrid() {
  const [collections, setCollections] = useState([]);

  useEffect(() => {
    axios.get("/collections").then((res) => {
      setCollections(res.data);
    });
  });

  return (
    <div className="collection-grid">
      {collections.map((collection) => (
        <CollectionCard collection={collection} key={collection.collectionId} />
      ))}
    </div>
  );
}

export default CollectionGrid;
