import React, { useState } from "react";
import SettingTile from "./SettingTile";
import "./SettingsBar.css";

function SettingsBar() {
  const initialSettings = [
    { title: "General", description: "General settings", icon: "general-icon" },
    { title: "Privacy", description: "Privacy settings", icon: "privacy-icon" },
    {
      title: "Notifications",
      description: "Notification settings",
      icon: "notifications-icon",
    },
    {
      title: "Security",
      description: "Security settings",
      icon: "security-icon",
    },
    {
      title: "Security",
      description: "Security settings",
      icon: "security-icon",
    },
    {
      title: "Security",
      description: "Security settings",
      icon: "security-icon",
    },
  ];

  const [settings, setSettings] = useState(initialSettings);
  const [activeSetting, setActiveSetting] = useState(initialSettings[0]);

  return (
    <div className="settings-bar">
      {initialSettings.map((setting) => (
        <SettingTile
          key={setting.title}
          title={setting.title}
          description={setting.description}
          icon={setting.icon}
          isActive={activeSetting.title === setting.title}
          setActiveSetting={setActiveSetting}
          onClick={(e) => console.log(e)}
        />
      ))}
    </div>
  );
}

export default SettingsBar;
