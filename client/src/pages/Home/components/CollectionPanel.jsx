import React, { useState, useEffect } from "react";
import CollectionPanelCard from "./CollectionPanelCard";
import axios from "../../../axios";
import "./CollectionPanel.css";

function CollectionPanel() {
  const [collections, setCollections] = useState([]);

  useEffect(() => {
    // fetch the collections from the API endpoints
    axios
      .get(`collections?limit=5`)
      .then((res) => {
        setCollections(res.data);
        console.log(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  return (
    <div className="col-panel-card">
      <div className="title-bar">
        <h3>Collections</h3>
        <p>View All</p>
      </div>
      <div className="col-list">
        {collections.map((collection) => (
          <CollectionPanelCard
            collection={collection}
            key={collection.collectionId}
          />
        ))}
      </div>
    </div>
  );
}

export default CollectionPanel;
