import React from "react";
import "./SettingTile.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

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
      <FontAwesomeIcon icon={icon} />
      <h1>{title}</h1>
    </div>
  );
}

export default SettingTile;
