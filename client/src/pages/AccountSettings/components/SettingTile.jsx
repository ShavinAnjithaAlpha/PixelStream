import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import "./SettingTile.css";

function SettingTile({
  key,
  title,
  description,
  icon,
  onClick,
  isActive,
  setActiveSetting,
}) {
  const handleClick = (e) => {
    setActiveSetting({
      key,
      title,
      description,
      icon,
    });
    onClick();
  };

  return (
    <div
      className={`setting-tile ${isActive ? "selected" : ""}`}
      onClick={handleClick}
    >
      <FontAwesomeIcon icon={icon} style={{ color: "white" }} />
      <h1>{title}</h1>
    </div>
  );
}

export default SettingTile;
