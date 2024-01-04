import React from "react";
import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";

function Photo() {
  const { id } = useParams();
  const [photo, setPhoto] = useState({});

  useEffect(() => {
    console.log(id);
    axios.get(`http://localhost:3000/api/photos/${id}`).then((res) => {
      console.log(res.data);
      setPhoto(res.data);
    });
  }, [id]);

  return (
    <div className="photo-page">
      <h1>{photo.photoTitle}</h1>
      <div className="photo-container">
        {photo ? (
          <img
            src="http://localhost:3000/upload/20231212_113419.jpg"
            alt={photo.photoDes}
          />
        ) : (
          <p>Loading photo...</p>
        )}
      </div>
      <p>{photo.photoDes}</p>
      <p>
        <b>{photo.location}</b>
      </p>
      {photo.User ? <p>Uploaded by: {photo.User.fullName}</p> : null}
    </div>
  );
}

export default Photo;
