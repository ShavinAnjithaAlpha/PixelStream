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

  const handleDownload = () => {
    // increase the download count
    setPhoto({
      ...photo,
      PhotoStat: {
        ...photo.PhotoStat,
        downloads: photo.PhotoStat.downloads + 1,
      },
    });
    console.log("photo is ", photo);
    // send a request to the server to update the download count
    axios.get(`http://localhost:3000/api/photos/${id}/get`).then((res) => {
      // console.log(res.data);
    });
  };

  return (
    <>
      <h1>{photo.photoTitle}</h1>
      <div className="photo-page">
        <div className="column">
          <div className="photo-container">
            {photo ? (
              <img
                src={photo.photoUrl}
                alt={photo.photoDes}
                className="no-download"
              />
            ) : (
              <p>Loading photo...</p>
            )}
          </div>
          <p className="photo-des">{photo.photoDes}</p>
          <a
            href={photo.photoUrl}
            download
            onClick={handleDownload}
            className="download-link"
          >
            <button className="download-btn">Download</button>
          </a>
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
