import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import CollectionGrid from "./components/CollectionGrid";
import ProfileCard from "./components/ProfileCard";
import axios from "../../axios";
import "./Collection.css";

function Collection() {
  const { id } = useParams();
  const [collection, setCollection] = useState({});
  const [photos, setPhotos] = useState([]);

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
        console.log(res.data);
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
        <p>{photos.photos && photos.photos.length} Photos</p>
      </div>
      <div className="photo-section">
        {photos.photos && <CollectionGrid photos={photos.photos} />}
      </div>
    </div>
  );
}

export default Collection;
