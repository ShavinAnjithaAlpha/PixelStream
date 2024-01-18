import React from "react";
import "./StatCard.css";

export const StatCard = ({ labelName, labelValue }) => {
  return (
    <div className={`photo-detail-card`}>
      <div className="views">{labelName}</div>
      <div className="element">{labelValue}</div>
    </div>
  );
};
