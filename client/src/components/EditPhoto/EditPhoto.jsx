import React, { useContext, useState } from "react";
import { PopupContext } from "../../contexts/popup.context";
import PopupWindow from "../PopupWindow/PopupWindow";
import TabBar from "./TabBar";
import useEditPhoto from "../../hooks/useEditPhoto";
import "./EditPhoto.css";

function EditPhoto({ show, selectedPhoto }) {
  const { popups, setPopups } = useContext(PopupContext);
  const [activeTab, setActiveTab] = useState("general");
  const [tags, setTags] = React.useState(["tag1", "tag2", "tag3"]);
  const [photo, setPhoto] = React.useState({
    photoTitle: selectedPhoto.photoTitle,
    location: selectedPhoto.location,
    photoDes: selectedPhoto.photoDes,
    capturedFrom: selectedPhoto.capturedFrom,
  });

  const closePopup = () => {
    setPopups({
      ...popups,
      editPhoto: false,
    });
  };

  return (
    <PopupWindow show={show} setShow={closePopup}>
      <div className="edit-photo-wrapper">
        <div className="image-box">
          <img src={selectedPhoto.photoUrl} alt={selectedPhoto.photoTitle} />
        </div>
        <div className="edit-area">
          <div className="tabs">
            <TabBar activeTab={activeTab} setActiveTab={setActiveTab} />
          </div>
          <div className="form">
            {activeTab === "general" && (
              <>
                <h2>Edit General Properties</h2>

                <form>
                  <div className="input-field">
                    <label htmlFor="photo-title">Name</label>
                    <input
                      type="text"
                      id="photo-title"
                      maxLength={255}
                      minLength={3}
                      value={photo.photoTitle}
                      placeholder="Enter Photo Title"
                      required
                    />
                  </div>
                  <div className="input-field">
                    <label htmlFor="photo-location">Location</label>
                    <input
                      type="text"
                      id="photo-location"
                      maxLength={255}
                      value={photo.location}
                      placeholder="Enter location"
                    ></input>
                  </div>
                  <div className="input-field">
                    <label htmlFor="photo-description">Description</label>
                    <textarea
                      id="photo-description"
                      maxLength={255}
                      rows={5}
                      value={photo.photoDes}
                      placeholder="Enter photo description (optional)"
                    ></textarea>
                  </div>
                </form>
              </>
            )}
            {activeTab === "tags" && (
              <div className="input-field">
                <label htmlFor="photo-tags">Tags</label>
                <div className="tag-area">
                  <div className="tag">Shavin</div>
                  {tags.forEach((tag) => {
                    <div className="tag">{tag}</div>;
                  })}
                </div>
              </div>
            )}
            {activeTab === "exif" && (
              <div className="exif-grid">
                <div className="input-field">
                  <label htmlFor="camera-model">Camera Model</label>
                  <input
                    type="text"
                    id="camera-model"
                    value="Canon EOS 5D Mark IV"
                  />
                </div>
                <div className="input-field">
                  <label htmlFor="focal-length">Focal Length</label>
                  <input type="text" id="focal-length" value="50mm" readOnly />
                </div>
                <div className="input-field">
                  <label htmlFor="apeture">Apeture</label>
                  <input type="text" id="apeture" value="f/1.8" readOnly />
                </div>
                <div className="input-field">
                  <label htmlFor="iso">ISO</label>
                  <input type="text" id="iso" value="100" readOnly />
                </div>
              </div>
            )}
            {activeTab === "other" && (
              <>
                <div className="input-field horizontal">
                  <input type="checkbox" id="private" />
                  <label htmlFor="private">Make Photo as Private</label>
                </div>
                <div className="delete-box">
                  <h2>Delete Photo</h2>
                  <p>
                    Are you sure you want to delete this photo? This action
                    cannot be undone. When an image is deleted from PixelStream,
                    we will do everything we can to prevent its further
                    distribution, including preventing it from being viewed and
                    downloaded through PixelStream. However, the PixelStream
                    License is irrevocable, so copies of the image that were
                    downloaded before deletion may still be used.
                  </p>
                  <button className="delete">Delete</button>
                </div>
              </>
            )}
          </div>
          <div className="buttons">
            <button className="cancel" onClick={closePopup}>
              Cancel
            </button>
            <button className="save">Save</button>
          </div>
        </div>
      </div>
    </PopupWindow>
  );
}

export default EditPhoto;
