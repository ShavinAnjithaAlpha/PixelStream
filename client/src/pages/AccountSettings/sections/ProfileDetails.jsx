import React from "react";
import "./ProfileDetails.css";

function ProfileDetails() {
  return (
    <div className="profile-detail-section">
      <h1>Profile Details</h1>
      <p>
        Set your login preferences, help us personalize your experinece and make
        big account changes here
      </p>

      <div className="personal-detail-section">
        <h2>Personal Details</h2>
        <p>This information don’t be visible to anyone</p>
      </div>

      <div className="personal-detail-section">
        <h2>Contact Details</h2>
        <p>This information don’t be visible to anyone</p>
      </div>

      <div className="personal-detail-section">
        <h2>Preferences</h2>
        <p>This information don’t be visible to anyone</p>
      </div>
    </div>
  );
}

export default ProfileDetails;
