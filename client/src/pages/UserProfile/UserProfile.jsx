import React, { useEffect, useState, useContext } from "react";
import { useParams } from "react-router-dom";
import { AuthContext } from "../../contexts/auth.context";
import UserProfileDetail from "./components/UserProfileDetail";
import PhotoTab from "./components/PhotoTab";
import LikesTab from "./components/LikesTab";
import CollectionTab from "./components/CollectionTab";
import TabBar from "./components/TabBar";
import axios from "../../axios";
import StatTab from "./components/StatTab";
import fallBackImage from "../../assets/img/fallback.jpg";
import "./UserProfile.css";
import FollowersTab from "./components/FollowersTab";

function UserProfile({ defaultTab = "photos" }) {
  const { username } = useParams();
  const { authState } = useContext(AuthContext);
  const [activeTab, setActiveTab] = React.useState(defaultTab);
  const [backgroundImage, setBackgroundImage] = useState("");

  useEffect(() => {
    // fetch the random photo under this username for background image
    axios
      .get(`/photos/random?userName=${username}&limit=1`)
      .then((res) => {
        if (res.data.length > 0) setBackgroundImage(res.data.photos[0]);
        else
          setBackgroundImage({
            resizedPhotoUrl: fallBackImage,
            photoUrl: fallBackImage,
            fallback: true,
          });
      })
      .catch((err) => console.log(err));

    window.scrollTo(0, 0);
  }, [username]);

  return (
    <div
      className="user-profile"
      style={{
        backgroundImage: `url('${
          backgroundImage ? backgroundImage.resizedPhotoUrl : fallBackImage
        }')`,
      }}
    >
      <div className="user-profile-wrapper">
        <UserProfileDetail
          username={username}
          backgroundImage={backgroundImage}
        />
        <TabBar
          setActiveTab={setActiveTab}
          activeTab={activeTab}
          username={username}
        />

        <div className="tabs">
          {activeTab === "photos" && <PhotoTab username={username} />}
          {activeTab === "likes" && <LikesTab username={username} />}
          {activeTab === "collections" && <CollectionTab username={username} />}
          {authState.username === username && activeTab === "stat" && (
            <StatTab username={username} />
          )}
          {activeTab === "followers" && <FollowersTab username={username} />}
        </div>
      </div>
    </div>
  );
}

export default UserProfile;
