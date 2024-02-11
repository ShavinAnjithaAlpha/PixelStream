import React, { useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import TagSearch from "../../helpers/TagSearch";
import { SearchContext } from "../../contexts/search.context";
import "./TopicBar.css";

function TopicBar() {
  const navigate = useNavigate();
  const { setSearchKeyword } = useContext(SearchContext);

  const initialTopics = [
    "nature",
    "animals",
    "food",
    "travel",
    "architecture",
    "nature",
    "animals",
    "food",
    "travel",
    "architecture",
  ];
  const [topics, setTopics] = useState(initialTopics);

  const handleTagSearch = (tag) => {
    // set the search keyword so it will trigger the search end points
    setSearchKeyword(tag);
    // navigate to the search page
    navigate("/search");
  };

  return (
    <div className="topic-bar">
      {topics.map((topic, index) => (
        <button
          className="topic"
          key={index}
          onClick={(e) => {
            handleTagSearch(topic);
          }}
        >
          {topic}
        </button>
      ))}
    </div>
  );
}

export default TopicBar;
