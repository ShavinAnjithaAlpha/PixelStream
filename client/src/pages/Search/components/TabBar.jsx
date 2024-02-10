import React from "react";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import CollectionsIcon from "@mui/icons-material/Collections";
import InsertPhotoIcon from "@mui/icons-material/InsertPhoto";
import TabButton from "./TabButton";
import "./TabBar.css";

function TabBar({ setActiveTab }) {
  const [activeButton, setActiveButton] = React.useState(1);

  return (
    <div className="tab-bar">
      <TabButton
        label="Photos"
        icon={<InsertPhotoIcon />}
        id={1}
        isActive={activeButton === 1}
        setActiveButton={setActiveButton}
        setActiveTab={setActiveTab}
        value={10}
      />
      <TabButton
        label="Collections"
        id={2}
        icon={<CollectionsIcon />}
        isActive={activeButton === 2}
        setActiveButton={setActiveButton}
        setActiveTab={setActiveTab}
        value={3}
      />
      <TabButton
        label="Users"
        id={3}
        icon={<FavoriteBorderIcon />}
        isActive={activeButton === 3}
        setActiveButton={setActiveButton}
        setActiveTab={setActiveTab}
        value={20}
      />
    </div>
  );
}

export default TabBar;
