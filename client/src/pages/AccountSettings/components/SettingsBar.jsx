import React from "react";
import SettingTile from "./SettingTile";
import "./SettingsBar.css";

function SettingsBar({ settings, activeSetting, setActiveSetting }) {
  return (
    <div className="settings-bar">
      <h1 className="setting-bar-title">Account</h1>
      <div className="btn-col">
        {settings.map((setting) => (
          <SettingTile
            key={setting.key}
            title={setting.title}
            description={setting.description}
            icon={setting.icon}
            isActive={activeSetting.title === setting.title}
            setActiveSetting={setActiveSetting}
            onClick={(e) => console.log(e)}
          />
        ))}
      </div>
    </div>
  );
}

export default SettingsBar;
