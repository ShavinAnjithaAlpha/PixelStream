import React from "react";
import CollectionCard from "../../components/CollectionCard/CollectionCard";
import Spinner from "../../components/Spinner/Spinner";
import useGetCollections from "../../hooks/useGetCollections";
import NextPrevPage from "../../components/NextPrevPage/NextPrevPage";
import "./Collections.css";

function Collections() {
  const { collections, loading, backgroundPhoto, handlePageChange } =
    useGetCollections();

  return (
    <div
      className="global-collections"
      style={{
        backgroundImage: `url('${backgroundPhoto}')`,
      }}
    >
      <div className="global-collections-wrapper">
        <h1>Collections</h1>

        {loading && <Spinner />}

        <div className="global-collections-grid">
          {collections.collections &&
            collections.collections.map((collection) => (
              <CollectionCard
                key={collection.collectionId}
                collection={collection}
              />
            ))}
        </div>
        {collections.total === 0 && !loading && <h2>No collections</h2>}

        {/* <div className="page-bar">
          <PageNavigationBar
            max={20}
            limit={5}
            handlePageChange={handlePageChange}
            savedPage={parseInt(localStorage.getItem("page-collection")) || 1}
          />
        </div> */}

        <div className="page-bar">
          <NextPrevPage
            initialPage={1}
            handlePageChange={handlePageChange}
            next={collections.total === collections.limit}
          />
        </div>
      </div>
    </div>
  );
}

export default Collections;
