import React from "react";
import { useParams } from "react-router-dom";
import UserProfileDetail from "./components/UserProfileDetail";
import "./UserProfile.css";

function UserProfile() {
  const { username } = useParams();

  return (
    <div className="user-profile">
      <UserProfileDetail />
    </div>
  );
}

export default UserProfile;
