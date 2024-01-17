import React from "react";
import "./ProfileBadge.css";
import { useNavigate } from "react-router-dom";

function ProfileBadge({ user }) {
  const navigate = useNavigate();
  return (
    <div
      className="profile-badge"
      onClick={() => navigate(`/user/${user.username}`)}
    >
      <div className="profile-badge-photo">
        <img src={user.photoUrl} alt={user.username} />
      </div>
      <div className="profile-badge-info">
        <h2>{user.username}</h2>
      </div>
    </div>
  );
}

export default ProfileBadge;
