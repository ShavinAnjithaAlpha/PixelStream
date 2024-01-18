import React from "react";
import "./ProfileBadge.css";
import { useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import axios from "../axios";
import defaultProfileIcon from "../assets/img/default-profile-icon.png";
import { jwtDecode } from "jwt-decode";

function ProfileBadge({ user }) {
  const navigate = useNavigate();
  const [userData, setUserData] = useState([]);

  useEffect(() => {
    // decode the access token provided by the context API
    const decodedToken = jwtDecode(user);
    const username = decodedToken.username;

    axios
      .get(`/users/${username}`)
      .then((res) => {
        setUserData(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  return (
    <div
      className="profile-badge"
      onClick={() => navigate(`/user/${userData.userName}`)}
    >
      <div className="profile-badge-photo">
        <img
          src={
            userData.User && userData.User.profilePic
              ? userData.User.profilePic
              : defaultProfileIcon
          }
          alt={userData.userName}
        />
      </div>
      <div className="profile-badge-info">
        <h2>{userData.userName}</h2>
      </div>
    </div>
  );
}

export default ProfileBadge;
