import React, { useContext, useState } from "react";
import { useParams } from "react-router-dom";
import { AuthContext } from "../../contexts/auth.context";
import CollectionGrid from "./components/CollectionGrid";
import ProfileCard from "./components/ProfileCard";
import useGetCollection from "../../hooks/useGetCollection";
import { PopupContext } from "../../contexts/popup.context";
import SearchSection from "./components/SearchSection";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSpinner } from "@fortawesome/free-solid-svg-icons";
import NextPrevPage from "../../components/NextPrevPage/NextPrevPage";
import { Tag } from "../../components/Tag/Tag";
import CollectionCard from "../../components/CollectionCard/CollectionCard";
import "./Collection.css";

function Collection() {
  const { id } = useParams();
  const { authState } = useContext(AuthContext);
  const { popups, setPopups } = useContext(PopupContext);
  const [options, setOptions] = useState({});
  const { collection, relatedCollections, photos, loading, handlePageChange } =
    useGetCollection(id, options);

  const editCollection = () => {
    // set the selected collection
    setPopups({
      ...popups,
      editCollection: true,
      selectedCollection: collection,
    });
  };

  return (
    <div
      className="coll-section"
      style={{
        backgroundImage: `url('${
          collection.Photo && collection.Photo.photoUrl
        }')`,
      }}
    >
      <div className="coll-wrapper">
        <div className="cover-photo">
          {collection.Photo && (
            <img
              src={collection.Photo.photoUrl}
              alt={collection.Photo.photoTitle}
              height={200}
            />
          )}
        </div>
        <div className="detail-panel">
          <div className="profile"></div>
          {collection.User && <ProfileCard user={collection.User} />}
          <h1>
            {collection.collectionName}{" "}
            <span>
              {authState.status &&
                collection.User &&
                collection.User.UserAuth &&
                authState.username === collection.User.UserAuth.userName && (
                  <button className="edit-btn" onClick={editCollection}>
                    Edit
                  </button>
                )}
            </span>
          </h1>
          <p>{collection.collectionDescription}</p>
        </div>
        {collection.tags && collection.tags.length > 0 && (
          <div className="tag-bar">
            {collection.tags &&
              collection.tags.map((tag, index) => (
                <Tag key={index} tagName={tag} />
              ))}
          </div>
        )}

        <div className="button-bar">
          <SearchSection
            photos={photos}
            setOptions={setOptions}
            loading={loading}
          />
        </div>

        {photos && photos.photos && photos.photos.length > 0 && (
          <div className="photo-section">
            {photos.photos && <CollectionGrid photos={photos.photos} />}
          </div>
        )}

        {loading && (
          <div className="loading">
            {/* <Spinner /> */}
            <FontAwesomeIcon icon={faSpinner} spin={true} />
          </div>
        )}

        {!photos ||
          !photos.photos ||
          (photos.photos.length === 0 && <h1 id="no-photo">No Photos Yet</h1>)}

        <div className="page-bar">
          <NextPrevPage
            initialPage={1}
            handlePageChange={handlePageChange}
            next={photos.total === photos.limit}
          />
        </div>

        {/* // related collection section */}
        <h2>Related Collections</h2>
        {!relatedCollections && (
          <FontAwesomeIcon icon={faSpinner} spin="true" />
        )}

        {relatedCollections.length === 0 && <h3>No related Collections</h3>}
        <div className="photo-collections-grid">
          {relatedCollections.map((collection) => (
            <CollectionCard
              key={collection.collectionId}
              collection={collection}
            />
          ))}
        </div>
      </div>
    </div>
  );
}

export default Collection;
