import React from "react";
import { faClose } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import "./PopupWindow.css";

function PopupWindow(props) {
  return (
    <div
      className="popup-screen"
      style={{
        display: props.show ? "flex" : "none",
      }}
    >
      <div className="popup-window">
        <button className="close-btn" onClick={props.setShow}>
          <FontAwesomeIcon icon={faClose} />
        </button>
        {props.children}
      </div>
    </div>
  );
}

export default PopupWindow;
