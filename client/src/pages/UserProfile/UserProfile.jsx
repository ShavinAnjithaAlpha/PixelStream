import React from "react";
import { useParams } from "react-router-dom";
import UserProfileDetail from "./components/UserProfileDetail";
import PhotoTab from "./components/PhotoTab";
import LikesTab from "./components/LikesTab";
import CollectionTab from "./components/CollectionTab";
import TabBar from "./components/TabBar";
import "./UserProfile.css";

function UserProfile() {
  const { username } = useParams();

  const [activeTab, setActiveTab] = React.useState("photos");

  return (
    <div className="user-profile">
      <UserProfileDetail username={username} />
      <TabBar setActiveTab={setActiveTab} />

      <div className="tabs">
        {activeTab === "photos" && <PhotoTab username={username} />}
        {activeTab === "likes" && <LikesTab username={username} />}
        {activeTab === "collections" && <CollectionTab username={username} />}
      </div>
    </div>
  );
}

export default UserProfile;
