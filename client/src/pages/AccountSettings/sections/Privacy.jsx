import React, { useState } from "react";
import axios from "../../../axios";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSpinner } from "@fortawesome/free-solid-svg-icons";
import "./Privacy.css";

function Privacy({ user }) {
  const [oldPassword, setOldPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [errorMsg, setErrorMsg] = useState("");
  const [success, setSuccess] = useState("");
  const [saving, setSaving] = useState(false);

  const changePassword = () => {
    setSaving(true);
    // check whether if the password and confirm password are same
    if (newPassword !== confirmPassword) {
      setErrorMsg("Password and confirm password must be same");
    }

    // check whether the new password is same as the old password
    if (oldPassword === newPassword) {
      setErrorMsg("New password must be different from the old password");
    }

    const data = {
      oldPassword: oldPassword,
      newPassword: newPassword,
    };

    // call the API to the change the password
    axios
      .post("auth/change-password", data, {
        headers: {
          Authorization: user.user,
        },
      })
      .then((res) => {
        setSuccess(res.data.message);
        setSaving(false);

        setTimeout(() => {
          setSuccess("");
        }, 2000);
      })
      .catch((err) => {
        setSaving(false);
        setErrorMsg(err.response.data.message);

        setTimeout(() => {
          setErrorMsg("");
        }, 2000);
      });
  };

  return (
    <div className="privacy-section">
      <h1>Privacy Settings</h1>
      <p>
        Set your provacy preferences and account login credentials, help us
        personalize your experinece and make email account changes here
      </p>
      <div className="change-password">
        <h2>Change Password</h2>

        <div className="form-box">
          <div className="form-item">
            <label htmlFor="current-password">Current Password</label>
            <input
              type="password"
              id="current-password"
              placeholder="Current Password"
              onChange={(e) => setOldPassword(e.target.value)}
            />
          </div>

          <div className="form-item">
            <label htmlFor="new-password">New Password</label>
            <input
              type="password"
              id="new-password"
              placeholder="New Password"
              onChange={(e) => setNewPassword(e.target.value)}
            />
          </div>

          <div className="form-item">
            <label htmlFor="confirm-password">Confirm Password</label>
            <input
              type="password"
              id="confirm-password"
              placeholder="Confirm Password"
              onChange={(e) => setConfirmPassword(e.target.value)}
            />
          </div>

          {errorMsg && <div className="error-msg">{errorMsg}</div>}

          {success && <div className="success-msg">{success}</div>}

          <button type="submit" id="save" onClick={changePassword}>
            Change Password{"  "}
            <span>
              {saving && <FontAwesomeIcon icon={faSpinner} spin="true" />}
            </span>
          </button>
        </div>
      </div>
    </div>
  );
}

export default Privacy;
