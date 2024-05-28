import React from "react";
import TabButton from "./TabButton";
import "./TabBar.css";

function TabBar({ setActiveTab, activeTab }) {
  return (
    <div className="tab-bar">
      <TabButton
        label="General"
        isActive={activeTab === "general"}
        setActiveTab={setActiveTab}
      />
      <TabButton
        label="Tags"
        isActive={activeTab === "tags"}
        setActiveTab={setActiveTab}
      />
      <TabButton
        label="Exif"
        isActive={activeTab === "exif"}
        setActiveTab={setActiveTab}
      />
      <TabButton
        label="Other"
        isActive={activeTab === "other"}
        setActiveTab={setActiveTab}
      />
    </div>
  );
}

export default TabBar;
