import React, { useState, useEffect } from "react";
import Select from "react-select";
import { useParams } from "react-router-dom";
import CollectionGrid from "./components/CollectionGrid";
import ProfileCard from "./components/ProfileCard";
import axios from "../../axios";
import "./Collection.css";

function Collection() {
  const { id } = useParams();
  const [collection, setCollection] = useState({});
  const [photos, setPhotos] = useState([]);

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

  useEffect(() => {
    // fetch the colection data from the API endpoints
    axios
      .get(`collections/${id}`)
      .then((res) => {
        setCollection(res.data);
      })
      .catch((err) => {
        console.log(err);
      });

    // fetch the photos from the API endpoints
    axios
      .get(`collections/${id}/photo`)
      .then((res) => {
        setPhotos(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, [id]);

  return (
    <div className="coll-section">
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
        <h1>{collection.collectionName}</h1>
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
      {/* <div className="col-image-slide-bar">
        <div class="stage">
          <div class="container">
            <div class="ring">
              {photos.photos &&
                photos.photos.map((photo) => (
                  <div className="img">
                    <img src={photo.photoUrl} alt={photo.photoTitle} />
                  </div>
                ))}
            </div>
          </div>
        </div>
      </div> */}
      <div className="photo-section">
        {photos.photos && <CollectionGrid photos={photos.photos} />}
      </div>
    </div>
  );
}

export default Collection;
