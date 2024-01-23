import React from "react";
import "./TabButton.css";

function TabButton({
  label,
  icon,
  id,
  isActive,
  setActiveButton,
  setActiveTab,
  value,
}) {
  const handleClick = () => {
    setActiveButton(id);
    setActiveTab(label.toLowerCase());
  };

  return (
    <div className="tab-button">
      <div
        className={`button ${isActive ? "active" : ""}`}
        onClick={handleClick}
      >
        {icon && <div className="icon">{icon}</div>}
        <div className="text">{label}</div>
        <div className="value">{value}</div>
      </div>
    </div>
  );
}

export default TabButton;
