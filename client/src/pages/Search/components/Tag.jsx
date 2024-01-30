import React from "react";
import "./Tag.css";

export const Tag = ({ key, tagName }) => {
  return (
    <div className="tag">
      <div className="text-wrapper">{tagName}</div>
    </div>
  );
};
