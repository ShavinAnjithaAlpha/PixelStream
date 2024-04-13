import React from "react";
import defaultProfileIcon from "../../../assets/img/default-profile-icon.png";
import { useNavigate } from "react-router-dom";
import "./ProfileCard.css";

export const ProfileCard = ({ user }) => {
  const navigate = useNavigate();

  const goToProfile = () => {
    navigate(`/user/${user.UserAuth.userName}`);
  };

  return (
    <div className="component" onClick={goToProfile}>
      <div className="profile-card-name">{user.fullName}</div>
      <img
        src={user && user.profilePic ? user.profilePic : defaultProfileIcon}
        className="default-profile-icon"
        alt="Default profile icon"
      />
    </div>
  );
};
