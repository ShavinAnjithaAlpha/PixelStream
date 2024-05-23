import React from "react";
import CollectionCard from "../../../components/CollectionCard/CollectionCard";
import PageNavigationBar from "../../../components/PageNavigationBar/PageNavigationBar";
import useUserCollectionHandler from "../../../hooks/useUserCollectionHandler";
import Spinner from "../../../components/Spinner/Spinner";
import "./CollectionTab.css";

function CollectionTab({ username }) {
  const { collections, loading, handlePageChange } =
    useUserCollectionHandler(username);

  return (
    <div className="user-collection-tab">
      {loading && <Spinner />}

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

      <PageNavigationBar
        max={20}
        limit={5}
        handlePageChange={handlePageChange}
        savedPage={parseInt(localStorage.getItem("page-user-collection")) || 1}
      />
    </div>
  );
}

export default CollectionTab;
