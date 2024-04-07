import React from "react";
import { useState, useEffect } from "react";
import axios from "../axios";
import defaultProfileIcon from "../assets/img/default-profile-icon.png";
import { jwtDecode } from "jwt-decode";
import "./ProfileBadge.css";

function ProfileBadge({ user }) {
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
    // <div className="profile-badge">
    <div className="profile-badge-photo">
      <img
        src={
          userData.User && userData.User.profilePic
            ? userData.User.profilePic
            : defaultProfileIcon
        }
        alt={userData.userName}
        width={40}
        height={40}
      />
    </div>
    // </div>
  );
}

export default ProfileBadge;
