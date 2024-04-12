import React, { useEffect, useState } from "react";
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
  const [backgroundImage, setBackgroundImage] = useState("");
  const [photos, setPhotos] = React.useState([]);

  const randomId = () => {
    return Math.floor(Math.random() * 100);
  };

  useEffect(() => {
    axios
      .get(`/users/${username}/photos?count=10`)
      .then((res) => {
        setPhotos(res.data.photos);
        // set the background image
        if (res.data.photos.length !== 0) {
          setBackgroundImage(res.data.photo[0].photoUrl);
        } else {
          axios
            .get(`/photos?limit=1&page=${randomId()}`)
            .then((res) => {
              console.log(res.data.photos[0].photoUrl);
              setBackgroundImage(res.data.photos[0].photoUrl);
            })
            .catch((err) => {});
        }
      })
      .catch((err) => {
        console.log(err);
      });
  }, [username]);

  return (
    <div
      className="user-profile"
      style={{
        backgroundImage: `url('${backgroundImage ? backgroundImage : ""}')`,
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
    >
      <UserProfileDetail
        username={username}
        photos={photos}
        backgroundImage={backgroundImage}
      />
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
