import React from "react";
import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";
import "./Photo.css";

function Photo() {
  const { id } = useParams();
  const [photo, setPhoto] = useState({});

  useEffect(() => {
    console.log(id);
    axios.get(`http://localhost:3000/api/photos/${id}`).then((res) => {
      setPhoto(res.data);
    });
  }, [id]);

  return (
    <>
      <h1>{photo.photoTitle}</h1>
      <div className="photo-page">
        <div className="column">
          <div className="photo-container">
            {photo ? (
              <img src={photo.photoUrl} alt={photo.photoDes} />
            ) : (
              <p>Loading photo...</p>
            )}
          </div>
          <p className="photo-des">{photo.photoDes}</p>
        </div>
        <div className="column">
          {photo.PhotoStat ? (
            <div className="stat-bar">
              <div className="stat">Views: {photo.PhotoStat.views}</div>
              <div className="stat">Downloads: {photo.PhotoStat.downloads}</div>
              <div className="stat">Likes: {photo.PhotoStat.likes}</div>
              <div className="stat">Dislikes: {photo.PhotoStat.dislikes}</div>
            </div>
          ) : null}
          {photo.User ? (
            <p className="author">Uploaded by: {photo.User.fullName}</p>
          ) : null}

          <ul>
            <li>Location: {photo.location}</li>
            <li>Captured From: {photo.capturedFrom}</li>
            <li>Published: {photo.createdAt}</li>
          </ul>
        </div>
      </div>
    </>
  );
}

export default Photo;
