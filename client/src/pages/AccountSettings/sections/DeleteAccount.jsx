import React from "react";
import "./DeleteAccount.css";

function DeleteAccount() {
  return (
    <div className="delete-account-section">
      <h1>Delete Account</h1>
      <p>
        Are you sure you want to delete your account? This action is
        irreversible
      </p>

      <div className="delete-box">
        <p>
          <span style={{ color: "red" }}>Warning:</span> closing your account is
          irreversible. It deletes all of your photos, collections, and stats.
        </p>

        <div className="form-item">
          <label htmlFor="password">Password</label>
          <input type="password" id="password" placeholder="Password" />
        </div>

        <button type="submit" id="delete">
          Delete Account <span></span>
        </button>
      </div>
    </div>
  );
}

export default DeleteAccount;
