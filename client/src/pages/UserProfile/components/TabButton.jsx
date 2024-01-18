import React from "react";
import "./TabButton.css";

function TabButton({ label, id, isActive, setActiveButton, setActiveTab }) {
  const handleClick = () => {
    setActiveButton(id);
    setActiveTab(label.toLowerCase());
  };

  return (
    <div className="tab-button">
      <button className={isActive ? "active" : ""} onClick={handleClick}>
        {label}
      </button>
    </div>
  );
}

export default TabButton;
