import React, { useContext, useState } from "react";
import { AuthContext } from "../../contexts/auth.context";
import SettingsBar from "./components/SettingsBar";
import ProfileDetails from "./sections/ProfileDetails";
import {
  faArrowDown,
  faDeleteLeft,
  faEnvelope,
  faShieldHalved,
  faUser,
} from "@fortawesome/free-solid-svg-icons";
import ProfileBadge from "../../components/ProfileBadge";
import EmailSettings from "./sections/EmailSettings";
import Privacy from "./sections/Privacy";
import "./AccountSettings.css";
import DownloadHistory from "./sections/DownloadHistory";
import DeleteAccount from "./sections/DeleteAccount";

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
      title: "Download History",
      description: "Download history",
      icon: faArrowDown,
    },
    {
      key: 5,
      title: "Delete Account",
      description: "Delete Account",
      icon: faDeleteLeft,
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

          {activeSetting.title === "Privacy" && <Privacy user={authState} />}

          {activeSetting.title === "Download History" && (
            <DownloadHistory user={authState} />
          )}

          {activeSetting.title === "Delete Account" && (
            <DeleteAccount user={authState} />
          )}
        </div>
      </div>
    </div>
  );
}

export default AccountSettings;
