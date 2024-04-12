import React, { useContext, useState } from "react";
import SettingsBar from "./components/SettingsBar";
import ProfileDetails from "./sections/ProfileDetails";
import {
  faComment,
  faEnvelope,
  faMoneyBill,
  faShieldHalved,
  faUser,
} from "@fortawesome/free-solid-svg-icons";
import ProfileBadge from "../../components/ProfileBadge";
import { AuthContext } from "../../contexts/auth.context";
import "./AccountSettings.css";
import EmailSettings from "./sections/EmailSettings";

function AccountSettings() {
  const initialSettings = [
    {
      key: 1,
      title: "Profile Details",
      description: "General settings",
      icon: faUser,
    },
    {
      key: 2,
      title: "Email",
      description: "Privacy settings",
      icon: faEnvelope,
    },
    {
      key: 3,
      title: "Privacy",
      description: "Password and Security settings",
      icon: faShieldHalved,
    },
    {
      key: 4,
      title: "Notifications",
      description: "Notification settings",
      icon: faComment,
    },
    {
      key: 5,
      title: "Billing",
      description: "Billing settings",
      icon: faMoneyBill,
    },
  ];

  const { authState } = useContext(AuthContext);
  const [settings, setSettings] = useState(initialSettings);
  const [activeSetting, setActiveSetting] = useState(initialSettings[0]);

  return (
    <div className="account-settings-page">
      <div className="account-navbar">
        <span>PS</span>
        <ProfileBadge user={authState.user} />
      </div>
      <div className="account-body">
        <SettingsBar
          settings={settings}
          setActiveSetting={setActiveSetting}
          activeSetting={activeSetting}
        />
        <div className="account-content">
          {activeSetting.title === "Profile Details" && (
            <ProfileDetails user={authState} />
          )}

          {activeSetting.title === "Email" && (
            <EmailSettings user={authState} />
          )}
        </div>
      </div>
    </div>
  );
}

export default AccountSettings;
