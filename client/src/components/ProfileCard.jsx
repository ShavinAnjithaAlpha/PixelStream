import React from "react";
import "./ProfileCard.css";

export const ProfileCard = ({ user }) => {
  const defaultProfileIcon = "../assets/img/default-profile-icon.png";

  return (
    <div className="component">
      <div className="text-wrapper-2">{user.fullName}</div>
      <img
        src={user && user.profilePic ? user.profilePic : defaultProfileIcon}
        className="default-profile-icon"
        alt="Default profile icon"
      />
    </div>
  );
};
