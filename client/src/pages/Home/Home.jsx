import React, { useEffect } from "react";
import PhotoGrid from "../../components/PhotoGrid";
import PageNavigationBar from "../../components/PageNavigationBar/PageNavigationBar";
import TopicBar from "../../components/TopicBar/TopicBar";
import CollectionPanel from "./components/CollectionPanel";
import FeaturedPhoto from "../../components/FeaturedPhoto/FeaturedPhoto";
import useGetPhotos from "../../hooks/useGetPhotos";
import "./Home.css";

function Home() {
  const { photos, status, handlePageChange, handleSearch, randomPhoto } =
    useGetPhotos();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [photos]);

  return (
    <div
      className="App"
      style={{
        backgroundImage: `url('${randomPhoto}')`,
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

        <PhotoGrid photos={photos} />
        <div className="page-bar">
          <PageNavigationBar
            max={100}
            limit={5}
            handlePageChange={handlePageChange}
            savedPage={parseInt(localStorage.getItem("page-photo")) || 1}
          />
        </div>
      </div>
    </div>
  );
}

export default Home;
