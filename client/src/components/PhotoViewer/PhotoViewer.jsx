import React, { useContext } from "react";
import PopupWindow from "../PopupWindow/PopupWindow";
import "./PhotoViewer.css";
import { PopupContext } from "../../contexts/popup.context";

function PhotoViewer({ show, selectedPhoto }) {
  const { popups, setPopups } = useContext(PopupContext);

  const closePopup = () => {
    setPopups({
      ...popups,
      photoViewer: false,
    });
  };

  return (
    <PopupWindow show={show} setShow={closePopup}>
      <div className="photo-viewer-container">
        <img src={selectedPhoto.photoUrl} alt={selectedPhoto.photoTitle} />
      </div>
    </PopupWindow>
  );
}

export default PhotoViewer;
