import React from "react";
import { Tag } from "./Tag";
import "./TagBar.css";

export const TagBar = ({ tags, handleTagSearch }) => {
  return (
    <div className="tag-bar">
      {tags.map((tag) => (
        <Tag key={tag} tagName={tag} onClick={(e) => handleTagSearch(tag)} />
      ))}
    </div>
  );
};
