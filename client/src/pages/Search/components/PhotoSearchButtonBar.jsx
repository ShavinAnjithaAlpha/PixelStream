import React from "react";
import Select from "react-select";
import "./PhotoSearchButtonBar.css";

function PhotoSearchButtonBar() {
  const options = [
    { value: "chocolate", label: "Chocolate" },
    { value: "strawberry", label: "Strawberry" },
    { value: "vanilla", label: "Vanilla" },
  ];
  return (
    <div className="option-bar">
      <Select
        options={options}
        placeholder="Filter By"
        className="option-box"
      />
      <Select options={options} placeholder="Sort By" className="option-box" />
      <Select
        options={options}
        placeholder="Orientation"
        className="option-box"
      />
    </div>
  );
}

export default PhotoSearchButtonBar;
