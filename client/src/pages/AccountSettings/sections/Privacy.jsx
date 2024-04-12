import React from "react";
import "./Privacy.css";

function Privacy({ user }) {
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
            />
          </div>

          <div className="form-item">
            <label htmlFor="new-password">New Password</label>
            <input
              type="password"
              id="new-password"
              placeholder="New Password"
            />
          </div>

          <div className="form-item">
            <label htmlFor="confirm-password">Confirm Password</label>
            <input
              type="password"
              id="confirm-password"
              placeholder="Confirm Password"
            />
          </div>

          <button type="submit" id="save">
            Change Password <span></span>
          </button>
        </div>
      </div>
    </div>
  );
}

export default Privacy;
