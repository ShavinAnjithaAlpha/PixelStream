import React from "react";
import "./StatCard.css";

function StatCard({ label, value }) {
  return (
    <div className="profile-stat-card">
      <div className="large">{value}</div>
      <div className="small">{label}</div>
    </div>
  );
}

export default StatCard;
