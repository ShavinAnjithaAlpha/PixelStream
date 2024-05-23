import { useState } from "react";
import React from "react";
import PhotoGrid from "../../components/PhotoGrid";
import PageNavigationBar from "../../components/PageNavigationBar/PageNavigationBar";
import TopicBar from "../../components/TopicBar/TopicBar";
import CollectionPanel from "./components/CollectionPanel";
import AddToCollectionBox from "../../components/AddToCollectionBox/AddToCollectionBox";
import FeaturedPhoto from "../../components/FeaturedPhoto/FeaturedPhoto";
import fallBackImage from "../../assets/img/fallback.jpg";
import useGetPhotos from "../../hooks/useGetPhotos";
import "./Home.css";

function Home() {
  const { photos, status, handlePageChange, handleSearch, randomPhotoId } =
    useGetPhotos();
  const [selectedPhoto, setSelectedPhoto] = useState({});
  const [addCollectionBox, setAddCollectionBox] = useState(false);

  return (
    <div
      className="App"
      style={{
        backgroundColor: "black",
        backgroundImage: `url('${
          photos[randomPhotoId()]
            ? photos[randomPhotoId()].photoUrl
            : fallBackImage
        }')`,
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
    >
      <div className="home-wrapper">
        <TopicBar />
        <div className="top-section">
          <div className="home-search">
            <h1>PixelStream</h1>
            <p>
              Unlock the power of seamless storytelling with our dynamic photo
              streaming service, where every image comes to life.
            </p>
            <input
              type="text"
              placeholder="Search for photos"
              onKeyUp={handleSearch}
            />
            <button>Search</button>
          </div>

          <CollectionPanel />

          {photos.length > 0 && <FeaturedPhoto />}
        </div>

        <PhotoGrid
          photos={photos}
          addCollection={setAddCollectionBox}
          setSelectedPhoto={setSelectedPhoto}
        />
        <div className="page-bar">
          <PageNavigationBar
            max={100}
            limit={5}
            handlePageChange={handlePageChange}
            savedPage={parseInt(localStorage.getItem("page-photo")) || 1}
          />
        </div>

        {addCollectionBox && (
          <div className="add-collection-popup">
            <AddToCollectionBox
              setClose={setAddCollectionBox}
              selectedPhoto={selectedPhoto}
            />
          </div>
        )}
      </div>
    </div>
  );
}

export default Home;
