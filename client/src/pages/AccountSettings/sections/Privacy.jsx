import React, { useState } from "react";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import axios from "../../../axios";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSpinner } from "@fortawesome/free-solid-svg-icons";
import "./Privacy.css";

function Privacy({ user }) {
  const [oldPassword, setOldPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [saving, setSaving] = useState(false);

  const changePassword = () => {
    // check whether if the password and confirm password are same
    if (newPassword !== confirmPassword) {
      return toast.error("Password and confirm password must be same");
    }

    // check whether the new password is same as the old password
    if (oldPassword === newPassword) {
      return toast.error(
        "New password must be different from the old password"
      );
    }

    setSaving(true);
    const changePasswordPromise = new Promise((resolve, reject) => {
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
          setSaving(false);
          resolve(res.data.message);
        })
        .catch((err) => {
          setSaving(false);
          reject(err);
        });
    });

    toast.promise(changePasswordPromise, {
      pending: "Changing password...",
      success: "Password changed successfully",
      error: "Failed to change password",
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
          <button type="submit" id="save" onClick={changePassword}>
            Change Password{"  "}
            <span>
              {saving && <FontAwesomeIcon icon={faSpinner} spin="true" />}
            </span>
          </button>
        </div>
      </div>

      <ToastContainer
        position="top-right"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="dark"
      />
    </div>
  );
}

export default Privacy;
