import React, { useState } from "react";
import "./TopicBar.css";

function TopicBar() {
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

  return (
    <div className="topic-bar">
      {topics.map((topic) => (
        <button className="topic" key={topic}>
          {topic}
        </button>
      ))}
    </div>
  );
}

export default TopicBar;
