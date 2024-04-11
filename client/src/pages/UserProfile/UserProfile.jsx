import React, { useEffect } from "react";
import { useParams } from "react-router-dom";
import UserProfileDetail from "./components/UserProfileDetail";
import PhotoTab from "./components/PhotoTab";
import LikesTab from "./components/LikesTab";
import CollectionTab from "./components/CollectionTab";
import TabBar from "./components/TabBar";
import axios from "../../axios";
import StatTab from "./components/StatTab";
import "./UserProfile.css";

function UserProfile({ defaultTab = "photos" }) {
  const { username } = useParams();
  // state variables of the page
  const [activeTab, setActiveTab] = React.useState(defaultTab);
  const [photos, setPhotos] = React.useState([]);

  useEffect(() => {
    axios
      .get(`/users/${username}/photos?count=10`)
      .then((res) => {
        setPhotos(res.data.photos);
      })
      .catch((err) => {
        console.log(err);
      });
  }, [username]);

  return (
    <div
      className="user-profile"
      style={{
        backgroundImage: `url('${
          photos.length > 0 ? photos[0].photoUrl : ""
        }')`,
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
    >
      <UserProfileDetail username={username} photos={photos} />
      <TabBar setActiveTab={setActiveTab} activeTab={activeTab} />

      <div className="tabs">
        {activeTab === "photos" && <PhotoTab photos={photos} />}
        {activeTab === "likes" && <LikesTab username={username} />}
        {activeTab === "collections" && <CollectionTab username={username} />}
        {activeTab === "stat" && <StatTab username={username} />}
      </div>
    </div>
  );
}

export default UserProfile;
