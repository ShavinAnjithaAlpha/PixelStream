import React, { useState, useEffect } from "react";
import StatCard from "./StatCard";
import "./UserProfileDetail.css";
import defaultProfileIcon from "../../../assets/img/default-profile-icon.png";
import leafsIcon from "../../../assets/img/leafs.jpg";
import axios from "../../../axios";

function UserProfileDetail({ username }) {
  const [userProfile, setUserProfile] = useState({});

  useEffect(() => {
    // first fetch user profile from the API
    axios
      .get(`/users/${username}`)
      .then((res) => {
        setUserProfile(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  });

  return (
    <>
      <div className="user-profile-section">
        <div className="profile-section">
          <div className="profile-img">
            <img
              src={
                userProfile.User && userProfile.User.profilePic
                  ? userProfile.User.profilePic
                  : defaultProfileIcon
              }
              width={150}
              height={150}
              alt={userProfile.userName}
            />
          </div>
          <div className="name">
            {userProfile.User && userProfile.User.fullName}
          </div>
          <div className="user-link">@{userProfile.userName}</div>

          <p>
            {userProfile.User && userProfile.User.Bio
              ? userProfile.User.Bio
              : "This user has no bio yet."}
          </p>
          <div className="stat-bar">
            <StatCard label="Followers" value={userProfile.followers} />
            <StatCard label="Followings" value={userProfile.followings} />
            <StatCard label="Likes" value={userProfile.totalLikes} />
            <StatCard label="Downloads" value={userProfile.totalDownloads} />
          </div>
        </div>
        <div className="btn-section">
          <img
            src={leafsIcon}
            width={600}
            height={350}
            style={{ objectFit: "cover" }}
            alt={leafsIcon}
          />
          <div className="btn-bar">
            <button>Follow</button>
            <button>Message</button>
          </div>
        </div>
      </div>
    </>
  );
}

export default UserProfileDetail;
