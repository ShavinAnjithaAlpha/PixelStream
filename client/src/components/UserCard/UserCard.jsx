import React from "react";
import defaultProfilePic from "../../assets/img/default-profile-icon.png";
import { useNavigate } from "react-router-dom";
import "./UserCard.css";

function UserCard({ user }) {
  const navigate = useNavigate();

  const gotoUserPage = () => {
    navigate(`/user/${user.UserAuth.userName}`);
  };

  return (
    <div className="user__profile-card" onClick={gotoUserPage}>
      <div className="profile-image">
        <img
          src={user.profilePic ? user.profilePic : defaultProfilePic}
          alt={user.fullName}
          width={60}
          height={60}
        />
      </div>
      <div className="detail-box">
        <h3>{user.fullName}</h3>
        {user.UserAuth && <p>@{user.UserAuth.userName}</p>}
      </div>
    </div>
  );
}

export default UserCard;
