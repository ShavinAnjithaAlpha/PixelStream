import React from "react";
import SettingsIcon from "@mui/icons-material/Settings";
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
      <SettingsIcon width={50} />
      <h1>{title}</h1>
    </div>
  );
}

export default SettingTile;
