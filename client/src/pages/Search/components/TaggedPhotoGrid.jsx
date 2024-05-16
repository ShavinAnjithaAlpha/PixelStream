import React, { useState, useEffect, useContext, Fragment } from "react";
import axios from "../../../axios";
import TaggedPhotoCard from "./TaggedPhotoCard";
import { SearchContext } from "../../../contexts/search.context";
import "./TaggedPhotoGrid.css";
import PageNavigationBar from "../../../components/PageNavigationBar/PageNavigationBar";

function TaggedPhotoGrid({ setBackgroundImage, options }) {
  const { searchKeyword } = useContext(SearchContext);
  const [photos, setPhotos] = useState([]);

  useEffect(() => {
    if (searchKeyword) {
      axios
        .get(
          `search/photos?query=${searchKeyword}&limit=12&orientation=${
            options.orientation || "all"
          }&sortBy=${options.sortBy || "latest"}`
        )
        .then((res) => {
          setPhotos(res.data.photos);

          // set the background image as a random photo from search results
          if (res.data.photos.length > 0) {
            setBackgroundImage(
              res.data.photos[
                Math.floor(Math.random() * res.data.photos.length)
              ].photoUrl
            );
          } else {
            // if no photos found, set the background image as a random image from API
            axios
              .get(
                `/photos?page=${Math.floor(Math.random() * 100) + 1}&limit=1`
              )
              .then((res) => {
                setBackgroundImage(
                  res.data[0].resizedPhotoUrl
                    ? res.data[0].resizedPhotoUrl
                    : res.data[0].photoUrl
                );
              })
              .catch((err) => {
                console.log(err);
              });
          }
        })
        .catch((err) => {
          console.log(err);
        });
    }
  }, [searchKeyword, setBackgroundImage, options]);
  return (
    <Fragment>
      {photos.length === 0 && (
        <p className="no-photos-msg">No Photos Available</p>
      )}
      <div className="tagged-photo-grid">
        {photos.map((photo) => (
          <TaggedPhotoCard photo={photo} key={photo.photoId} />
        ))}
      </div>

      {photos.length > 0 && (
        <div className="page-bar">
          <PageNavigationBar
            max={10}
            limit={5}
            onPageChange={(page) => {
              console.log(page);
            }}
            savedPage={1}
          />
        </div>
      )}
    </Fragment>
  );
}

export default TaggedPhotoGrid;
