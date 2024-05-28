import React from "react";
import "./TabButton.css";

function TabButton({ label, isActive, setActiveTab, value }) {
  const handleClick = () => {
    setActiveTab(label.toLowerCase());
  };

  return (
    <div className="edit-tab-button">
      <div
        className={`button ${isActive ? "active" : ""}`}
        onClick={handleClick}
      >
        <div className="text">{label}</div>
      </div>
    </div>
  );
}

export default TabButton;
