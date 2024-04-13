import React, { useContext, useState } from "react";
import { AuthContext } from "../../contexts/auth.context";
import SettingsBar from "./components/SettingsBar";
import ProfileDetails from "./sections/ProfileDetails";
import styled from "styled-components";
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
import DownloadHistory from "./sections/DownloadHistory";
import DeleteAccount from "./sections/DeleteAccount";
import { Link, useNavigate } from "react-router-dom";
import Popup from "reactjs-popup";
import "./AccountSettings.css";

const Menu = styled.div`
  background-color: #111111dd;
  backdrop-filter: blur(10px);
  transition: all 0.3s ease;
  padding: 0;
  border: 1px solid #ffffff33;
  border-radius: 10px;
`;

const MenuItem = styled.div`
  background: none;
  padding: 10px;
  border-bottom: 0px solid #f1f1f1;
  text-align: left;
  cursor: pointer;
  transition: all 0.3s ease;
  font-size: 0.9rem;
  color: white;

  &:hover {
    background-color: #ffffff33;
  }

  &:nth-child(1) {
    border-radius: 10px 10px 0 0;
  }

  & > a {
    color: white;
  }
`;

const LogOutMenuItem = styled.div`
  padding: 10px;
  text-align: left;
  cursor: pointer;
  transition: all 0.3s ease;
  font-size: 0.9rem;
  color: red;
  border-top: 1px solid #ffffff33;
  border-radius: 0 0 10px 10px;

  &:hover {
    background-color: #ff0000aa;
    color: black;
  }

  & > a {
    color: red;
  }

  &:hover > a {
    color: red;
  }
`;

function AccountSettings() {
  const navigate = useNavigate();

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

  const logout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("username");
    authState.setStatus(false);
    navigate("/login");
  };

  return (
    <div className="account-settings-page">
      <div className="account-navbar">
        <Link to="/">
          <span>PS</span>
        </Link>
        <Popup
          trigger={
            <button
              style={{
                background: "none",
                border: "none",
                outline: "none",
              }}
            >
              <ProfileBadge user={authState.user} />
            </button>
          }
          position={["bottom center", "right center"]}
          contentStyle={{ background: "none", border: "none" }}
        >
          <Menu>
            <MenuItem>
              <Link to={`/user/${authState.username}`}>Profile</Link>
            </MenuItem>
            <MenuItem>
              <Link to="/account">Settings</Link>
            </MenuItem>
            <MenuItem>
              <Link to="/upload">Upload Photo</Link>
            </MenuItem>
            <MenuItem>
              <Link to={`/stat/${authState.username}`}>Stat</Link>
            </MenuItem>
            <LogOutMenuItem onClick={logout}>
              Logout @{authState.username}
            </LogOutMenuItem>
          </Menu>
        </Popup>
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
