import React, { useContext } from "react";
import { useParams } from "react-router-dom";
import { AuthContext } from "../../contexts/auth.context";
import Select from "react-select";
import CollectionGrid from "./components/CollectionGrid";
import ProfileCard from "./components/ProfileCard";
import useGetCollection from "../../hooks/useGetCollection";
import Spinner from "../../components/Spinner/Spinner";
import PageNavigationBar from "../../components/PageNavigationBar/PageNavigationBar";
import "./Collection.css";
import { PopupContext } from "../../contexts/popup.context";

function Collection() {
  const { id } = useParams();
  const { authState } = useContext(AuthContext);
  const { popups, setPopups } = useContext(PopupContext);
  const { collection, photos, loading } = useGetCollection(id);

  const filterByOptions = [
    { value: "all", label: "All" },
    { value: "landscape", label: "Landscape" },
    { value: "portrait", label: "Portrait" },
    { value: "square", label: "Square" },
  ];

  const sortByOptions = [
    { value: "latest", label: "Latest" },
    { value: "oldest", label: "Oldest" },
    { value: "popular", label: "Popular" },
  ];

  const orientationOptions = [
    { value: "landscape", label: "Landscape" },
    { value: "portrait", label: "Portrait" },
    { value: "square", label: "Square" },
  ];

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

        <div className="button-bar">
          <div className="search">
            <p>{photos.photos && photos.photos.length} Photos</p>
            <input type="text" placeholder="Search" className="search-bar" />
          </div>

          <div className="option-bar">
            <Select
              options={filterByOptions}
              placeholder="Filter By"
              className="option-box"
            />
            <Select
              options={sortByOptions}
              placeholder="Sort By"
              className="option-box"
            />
            <Select
              options={orientationOptions}
              placeholder="Orientation"
              className="option-box"
            />
          </div>
        </div>

        {photos && photos.photos && photos.photos.length > 0 && (
          <div className="photo-section">
            {photos.photos && <CollectionGrid photos={photos.photos} />}
          </div>
        )}

        {loading && (
          <div className="loading">
            <Spinner />
          </div>
        )}

        {!photos ||
          !photos.photos ||
          (photos.photos.length === 0 && <h1 id="no-photo">No Photos Yet</h1>)}

        <div className="page-bar">
          <PageNavigationBar
            max={100}
            limit={5}
            // handlePageChange={handlePageChange}
            savedPage={
              parseInt(localStorage.getItem("page-one-collection")) || 1
            }
          />
        </div>
      </div>
    </div>
  );
}

export default Collection;
