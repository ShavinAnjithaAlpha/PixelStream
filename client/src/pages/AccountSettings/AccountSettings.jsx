import React, { useState } from "react";
import SettingsBar from "./components/SettingsBar";
import ProfileDetails from "./sections/ProfileDetails";
import "./AccountSettings.css";

function AccountSettings() {
  const initialSettings = [
    {
      key: 1,
      title: "Profile Details",
      description: "General settings",
      icon: "general-icon",
    },
    {
      key: 2,
      title: "Email",
      description: "Privacy settings",
      icon: "privacy-icon",
    },
    {
      key: 3,
      title: "Privacy",
      description: "Password and Security settings",
      icon: "notifications-icon",
    },
    {
      key: 4,
      title: "Notifications",
      description: "Notification settings",
      icon: "notifications-icon",
    },
    {
      key: 5,
      title: "Billing",
      description: "Billing settings",
      icon: "billing-icon",
    },
  ];

  const [settings, setSettings] = useState(initialSettings);
  const [activeSetting, setActiveSetting] = useState(initialSettings[0]);

  return (
    <div className="account-settings-page">
      <div className="account-navbar">
        <span>PS</span>
      </div>
      <div className="account-body">
        <SettingsBar
          settings={settings}
          setActiveSetting={setActiveSetting}
          activeSetting={activeSetting}
        />
        <div className="account-content">
          {activeSetting.title === "Profile Details" && <ProfileDetails />}
        </div>
      </div>
    </div>
  );
}

export default AccountSettings;
