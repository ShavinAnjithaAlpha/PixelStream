import React from "react";
import "./ProfileBadge.css";
import { useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import axios from "axios";

function ProfileBadge({ user }) {
  const navigate = useNavigate();
  const [userData, setUserData] = useState([]);

  useEffect(() => {
    axios
      .get(`http://localhost:3000/api/users/${user.username}`)
      .then((res) => {
        setUserData(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  const defaultProfilePhotoUrl = "assets/img/default-profile-icon.png";

  return (
    <div
      className="profile-badge"
      onClick={() => navigate(`/user/${user.username}`)}
    >
      <div className="profile-badge-photo">
        <img
          src={
            userData.User && userData.User.profilePic
              ? userData.User.profilePic
              : defaultProfilePhotoUrl
          }
          alt={user.username}
        />
      </div>
      <div className="profile-badge-info">
        <h2>{user.username}</h2>
      </div>
    </div>
  );
}

export default ProfileBadge;
