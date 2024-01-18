import React from "react";
import defaultProfileIcon from "../../../assets/img/default-profile-icon.png";
import "./ProfileCard.css";

export const ProfileCard = ({ user }) => {
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
