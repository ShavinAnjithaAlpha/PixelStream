import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "../../axios";
import "./FeaturedPhoto.css";

function FeaturedPhoto() {
  const [featuredPhoto, setFeaturedPhoto] = useState({});
  const navigate = useNavigate();

  useEffect(() => {
    // fetch the featured photo from the API endpoints
    axios
      .get(`photos?count=1`)
      .then((res) => {
        setFeaturedPhoto(res.data[0]);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  const gotoPhoto = () => {
    // navifgate to the appropriate photo page
    navigate(`/photo/${featuredPhoto.photoId}`);
  };

  return (
    <div className="featured-photo" onClick={gotoPhoto}>
      {featuredPhoto && (
        <img
          src={
            featuredPhoto.resizedPhotoUrl
              ? featuredPhoto.resizedPhotoUrl
              : featuredPhoto.photoUrl
          }
          alt={featuredPhoto.photoDes}
        />
      )}

      <div className="photo-info">
        <h3>{featuredPhoto.photoTitle}</h3>
        <p>featured by {featuredPhoto.User && featuredPhoto.User.fullName}</p>
      </div>
    </div>
  );
}

export default FeaturedPhoto;
