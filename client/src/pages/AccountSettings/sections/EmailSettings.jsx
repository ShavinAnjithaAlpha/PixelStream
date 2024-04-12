import React from "react";
import "./EmailSettings.css";

function EmailSettings() {
  return (
    <div className="email-setting-section">
      <h1>Email Settings</h1>
      <p>
        Set your email preferences, help us personalize your experinece and make
        email account changes here
      </p>

      <div className="email-list-section">
        <ul>
          <li>
            <input type="check" />
          </li>
          <li>
            <input type="check" />
          </li>
          <li>
            <input type="check" />
          </li>
          <li>
            <input type="check" />
          </li>
        </ul>
      </div>
    </div>
  );
}

export default EmailSettings;
