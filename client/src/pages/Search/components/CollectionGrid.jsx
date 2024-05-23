import React, { Fragment } from "react";
import CollectionCard from "../../../components/CollectionCard/CollectionCard";
import PageNavigationBar from "../../../components/PageNavigationBar/PageNavigationBar";
import useCollectionSearch from "../../../hooks/useCollectionSearch";
import Spinner from "../../../components/Spinner/Spinner";
import "./CollectionGrid.css";

function CollectionGrid() {
  const { collections, loading, handlePageChange } = useCollectionSearch();

  return (
    <Fragment>
      {loading && <Spinner />}

      {collections.length === 0 && (
        <p className="no-coll-msg">No Collections Available</p>
      )}
      <div className="collection-grid">
        {collections.map((collection) => (
          <CollectionCard
            collection={collection}
            key={collection.collectionId}
          />
        ))}
      </div>

      <div className="page-bar">
        <PageNavigationBar
          max={10}
          limit={5}
          handlePageChange={handlePageChange}
          savedPage={localStorage.getItem("page-search-collection") || 1}
        />
      </div>
    </Fragment>
  );
}

export default CollectionGrid;
