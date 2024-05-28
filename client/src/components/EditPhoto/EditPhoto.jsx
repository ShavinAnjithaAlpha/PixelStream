import React, { useContext, useState } from "react";
import { PopupContext } from "../../contexts/popup.context";
import PopupWindow from "../PopupWindow/PopupWindow";
import TabBar from "./TabBar";
import useEditPhoto from "../../hooks/useEditPhoto";
import "./EditPhoto.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSpinner } from "@fortawesome/free-solid-svg-icons";

function EditPhoto({ show, selectedPhoto }) {
  const { popups, setPopups } = useContext(PopupContext);
  const [activeTab, setActiveTab] = useState("general");
  const { photo, dispatch, update, error, updatePhoto, deletePhoto } =
    useEditPhoto({ selectedPhoto });

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
                      value={photo.title}
                      placeholder="Enter Photo Title"
                      required
                      onChange={(e) =>
                        dispatch({ type: "SET_TITLE", payload: e.target.value })
                      }
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
                      onChange={(e) =>
                        dispatch({
                          type: "SET_LOCATION",
                          payload: e.target.value,
                        })
                      }
                    ></input>
                  </div>
                  <div className="input-field">
                    <label htmlFor="photo-description">Description</label>
                    <textarea
                      id="photo-description"
                      maxLength={255}
                      rows={5}
                      value={photo.description}
                      placeholder="Enter photo description (optional)"
                      onChange={(e) =>
                        dispatch({
                          type: "SET_DESCRIPTION",
                          payload: e.target.value,
                        })
                      }
                    ></textarea>
                  </div>
                </form>
              </>
            )}
            {activeTab === "tags" && (
              <div className="input-field">
                <label htmlFor="photo-tags">Tags</label>
                <div className="tag-area">
                  {photo.tags.map((tag, index) => (
                    <div className="tag" key={index}>
                      {tag}
                    </div>
                  ))}
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
                    value={photo.capturedFrom}
                    onChange={(e) =>
                      dispatch({
                        type: "SET_CAPTURED_FROM",
                        payload: e.target.value,
                      })
                    }
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
                  <button className="delete" onClick={deletePhoto}>
                    Delete
                  </button>
                </div>
              </>
            )}
          </div>
          <div className="buttons">
            {error && (
              <div className="error">
                <p>{error}</p>
              </div>
            )}
            <button className="cancel" onClick={closePopup}>
              Cancel
            </button>
            <button className="save" onClick={updatePhoto}>
              Save{"    "}
              {!update && (
                <span>
                  {" "}
                  <FontAwesomeIcon icon={faSpinner} spin={true} />{" "}
                </span>
              )}
            </button>
          </div>
        </div>
      </div>
    </PopupWindow>
  );
}

export default EditPhoto;
