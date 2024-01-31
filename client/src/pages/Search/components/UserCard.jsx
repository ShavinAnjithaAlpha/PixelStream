import React, { useEffect, useState } from "react";
import defaultProfilePic from "../../../assets/img/default-profile-icon.png";
import axios from "../../../axios";
import "./UserCard.css";
import { Link } from "react-router-dom";

function UserCard({ user }) {
  const [userPhotos, setUserPhotos] = useState([]);

  useEffect(() => {
    // fetch three photos of the user from the API
    axios
      .get(`/users/${user.UserAuth.userName}/photos?limit=3`)
      .then((res) => {
        setUserPhotos(res.data.photos);
        console.log(res.data.photos);
      })
      .catch((err) => {
        console.log(err);
      });
  });

  return (
    <div className="user-card">
      <div className="profile-bar">
        <div className="profile-image">
          <img
            src={user.profilePic ? user.profilePic : defaultProfilePic}
            alt={user.fullName}
            width={60}
            height={60}
          />
        </div>
        <div className="detail-box">
          <h1>{user.fullName}</h1>
          {user.UserAuth && <p>{user.UserAuth.userName}</p>}
        </div>
      </div>
      <div className="image-bar">
        {userPhotos &&
          userPhotos.map((photo) => (
            <img
              src={photo.photoUrl}
              alt={photo.photoTitle}
              width={50}
              height={50}
            />
          ))}

        {userPhotos.length === 0 && <p className="no-photo">No photos</p>}
      </div>
      <Link to={`/user/${user.UserAuth.userName}`} className="view-profile">
        <button className="view-btn">View Profile</button>
      </Link>
    </div>
  );
}

export default UserCard;
