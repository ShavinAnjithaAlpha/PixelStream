import React from "react";
import "./Tag.css";

const defaultHandleClick = (tagName) => {
  // console.log(`Tag: ${tagName}`);
};

export const Tag = ({ tagName, handleClick = defaultHandleClick }) => {
  return (
    <div className="tag-component" onClick={(e) => handleClick(tagName)}>
      <div className="text-wrapper">{tagName}</div>
    </div>
  );
};
