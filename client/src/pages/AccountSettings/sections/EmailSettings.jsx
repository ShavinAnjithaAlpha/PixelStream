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
        <p>Send me emails related to: </p>
        <div className="email-setting">
          <input type="checkbox" name="setting1" />
          <label>Annoucement</label>
        </div>

        <div className="email-setting">
          <input type="checkbox" name="setting1" />
          <label>Community Updates</label>
        </div>

        <div className="email-setting">
          <input type="checkbox" name="setting1" />
          <label>Feedback & Surveys</label>
        </div>

        <div className="email-setting">
          <input type="checkbox" name="setting1" />
          <label>Milestone & Notifications</label>
        </div>

        <div className="email-setting">
          <input type="checkbox" name="setting1" />
          <label>Recommendation photos, collections, & Photogrpagers</label>
        </div>
      </div>

      <button type="submit" id="save">
        Save <span></span>
      </button>
    </div>
  );
}

export default EmailSettings;
