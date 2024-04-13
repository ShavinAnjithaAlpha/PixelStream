import React, { useContext } from "react";
import { useNavigate } from "react-router-dom";
import { SearchContext } from "../../../contexts/search.context";
import { Tag } from "./Tag";
import "./TagBar.css";

export const TagBar = ({ tags }) => {
  const navigate = useNavigate();
  const { setSearchKeyword } = useContext(SearchContext);

  const handleTagSearch = (tag) => {
    // set the search keyword so it will trigger the search end points
    setSearchKeyword(tag);
    // navigate to the search page
    navigate("/search");
  };

  return (
    <div className="tag-bar">
      {tags.map((tag, index) => (
        <Tag key={index} tagName={tag} handleClick={handleTagSearch} />
      ))}
    </div>
  );
};
