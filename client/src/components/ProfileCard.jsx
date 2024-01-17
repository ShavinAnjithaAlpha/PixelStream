import React from "react";
import "./ProfileCard.css";

export const ProfileCard = () => {
  return (
    <div className={`component`}>
      <div className="text-wrapper-2">Shavin Anjitha</div>
      <img
        src="../assets/img/default-profile-icon.png"
        className="default-profile-icon"
        alt="Default profile icon"
      />
    </div>
  );
};
