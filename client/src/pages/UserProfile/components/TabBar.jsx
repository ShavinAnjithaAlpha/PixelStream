import React from "react";
import TabButton from "./TabButton";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import CollectionsIcon from "@mui/icons-material/Collections";
import InsertPhotoIcon from "@mui/icons-material/InsertPhoto";
import AnalyticsIcon from "@mui/icons-material/Analytics";
import "./TabBar.css";

function TabBar({ setActiveTab, activeTab }) {
  return (
    <div className="tab-bar">
      <TabButton
        label="Photos"
        icon={<InsertPhotoIcon />}
        isActive={activeTab === "photos"}
        setActiveTab={setActiveTab}
        value={10}
      />
      <TabButton
        label="Collections"
        icon={<CollectionsIcon />}
        isActive={activeTab === "collections"}
        setActiveTab={setActiveTab}
        value={3}
      />
      <TabButton
        label="Likes"
        icon={<FavoriteBorderIcon />}
        isActive={activeTab === "likes"}
        setActiveTab={setActiveTab}
        value={20}
      />
      <TabButton
        label="Stat"
        icon={<AnalyticsIcon />}
        isActive={activeTab === "stat"}
        setActiveTab={setActiveTab}
        value={20}
      />
    </div>
  );
}

export default TabBar;
