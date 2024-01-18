import React from "react";
import StatCard from "./StatCard";
import "./UserProfileDetail.css";

function UserProfileDetail() {
  const defaultProfilePhotoUrl = "/assets/img/dark-forest.jpg";

  return (
    <>
      <div className="user-profile-section">
        <div className="profile-section">
          <div className="profile-img">
            <img
              src={defaultProfilePhotoUrl}
              width={150}
              height={150}
              alt={defaultProfilePhotoUrl}
            />
          </div>
          <div className="name">Shavin Anjith</div>
          <div>@shavin</div>

          <p>
            Collection of free Bootstrap user profile page and card code
            examples. Bootstrap 4 profile card template with hover. Compatible
            browsers
          </p>
          <div className="stat-bar">
            <StatCard />
            <StatCard />
            <StatCard />
          </div>
        </div>
        <div className="btn-section">
          <img
            src={defaultProfilePhotoUrl}
            width={600}
            height={400}
            style={{ objectFit: "cover" }}
            alt={defaultProfilePhotoUrl}
          />
          <button className="btn btn-primary">Follow</button>
          <button className="btn btn-primary">Message</button>
        </div>
      </div>
    </>
  );
}

export default UserProfileDetail;
