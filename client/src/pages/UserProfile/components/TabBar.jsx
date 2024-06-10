import React, { useContext, useEffect } from "react";
import TabButton from "./TabButton";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import CollectionsIcon from "@mui/icons-material/Collections";
import InsertPhotoIcon from "@mui/icons-material/InsertPhoto";
import AnalyticsIcon from "@mui/icons-material/Analytics";
import GroupIcon from "@mui/icons-material/Group";
import "./TabBar.css";
import axios from "../../../axios";
import { AuthContext } from "../../../contexts/auth.context";

function TabBar({ setActiveTab, activeTab, username }) {
  const { authState } = useContext(AuthContext);
  const [stat, setStat] = React.useState({});

  useEffect(() => {
    axios
      .get(`/stats/user/${username}`)
      .then((res) => {
        setStat(res.data);
      })
      .catch((err) => {
        setStat({
          photos: 0,
          collections: 0,
          likes: 0,
        });
      });
  }, [username]);

  return (
    <div className="tab-bar">
      <TabButton
        label="Photos"
        icon={<InsertPhotoIcon />}
        isActive={activeTab === "photos"}
        setActiveTab={setActiveTab}
        value={stat.photos || "0"}
      />
      <TabButton
        label="Collections"
        icon={<CollectionsIcon />}
        isActive={activeTab === "collections"}
        setActiveTab={setActiveTab}
        value={stat.collections || "0"}
      />
      <TabButton
        label="Likes"
        icon={<FavoriteBorderIcon />}
        isActive={activeTab === "likes"}
        setActiveTab={setActiveTab}
        value={stat.likes || "0"}
      />
      {authState.username === username && (
        <TabButton
          label="Stat"
          icon={<AnalyticsIcon />}
          isActive={activeTab === "stat"}
          setActiveTab={setActiveTab}
        />
      )}
      <TabButton
        label="Followers"
        icon={<GroupIcon />}
        isActive={activeTab === "followers"}
        setActiveTab={setActiveTab}
      />
    </div>
  );
}

export default TabBar;
