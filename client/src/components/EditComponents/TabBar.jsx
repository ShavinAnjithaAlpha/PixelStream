import React from "react";
import TabButton from "./TabButton";
import "./TabBar.css";

function TabBar({ setActiveTab, activeTab, label_map }) {
  return (
    <div className="edit-tab-bar">
      {label_map.map((tab_label, index) => (
        <TabButton
          key={index}
          label={tab_label}
          isActive={activeTab === tab_label}
          setActiveTab={setActiveTab}
        />
      ))}
    </div>
  );
}

export default TabBar;
