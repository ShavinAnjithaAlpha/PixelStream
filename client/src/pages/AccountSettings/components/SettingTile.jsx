import React from "react";
import SettingsIcon from "@mui/icons-material/Settings";
import "./SettingTile.css";

function SettingTile({
  title,
  description,
  icon,
  onClick,
  isActive,
  setActiveSetting,
}) {
  const handleClick = (e) => {
    setActiveSetting({
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
      <div className="title">
        <SettingsIcon width={50} />
        <h1>{title}</h1>
      </div>
      <p>{description}</p>
    </div>
  );
}

export default SettingTile;
