import React, { useEffect, useState, useContext } from "react";
import CollectionCard from "../../../components/CollectionCard/CollectionCard";
import axios from "../../../axios";
import { SearchContext } from "../../../contexts/search.context";
import "./CollectionGrid.css";

function CollectionGrid() {
  const [collections, setCollections] = useState([]);
  const { searchKeyword } = useContext(SearchContext);

  useEffect(() => {
    axios
      .get(`search/collections?query=${searchKeyword}&limit=12&page=1`)
      .then((res) => {
        setCollections(res.data.collections);
      })
      .catch((err) => {
        console.log(err);
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
