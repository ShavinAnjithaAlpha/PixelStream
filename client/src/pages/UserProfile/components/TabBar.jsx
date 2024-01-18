import React from "react";
import TabButton from "./TabButton";
import "./TabBar.css";

function TabBar({ setActiveTab }) {
  const [activeButton, setActiveButton] = React.useState(1);

  return (
    <div className="tab-bar">
      <TabButton
        label="Photos"
        id={1}
        isActive={activeButton === 1}
        setActiveButton={setActiveButton}
        setActiveTab={setActiveTab}
      />
      <TabButton
        label="Collections"
        id={2}
        isActive={activeButton === 2}
        setActiveButton={setActiveButton}
        setActiveTab={setActiveTab}
      />
      <TabButton
        label="Likes"
        id={3}
        isActive={activeButton === 3}
        setActiveButton={setActiveButton}
        setActiveTab={setActiveTab}
      />
    </div>
  );
}

export default TabBar;
