import React, { useContext, useEffect, useState } from "react";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { PopupContext } from "../../../contexts/popup.context";
import PopupWindow from "../../PopupWindow/PopupWindow";
import TabBar from "../TabBar";
import useEditPhoto from "../../../hooks/useEditPhoto";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCity, faClose, faSpinner } from "@fortawesome/free-solid-svg-icons";
import "./EditPhoto.css";

const TAB_MAP = ["General", "Tags", "Exif", "Other"];

function EditPhoto({ show, selectedPhoto }) {
  const { popups, setPopups } = useContext(PopupContext);
  const [activeTab, setActiveTab] = useState(TAB_MAP[0]);
  const {
    photo,
    dispatch,
    update,
    updatePhoto,
    deletePhoto,
    addTag,
    removeTag,
    locations,
    locationQuery,
    setLocationQuery,
    finalizedLocation,
    onLocationFetching,
  } = useEditPhoto({ selectedPhoto });

  const closePopup = () => {
    setPopups({
      ...popups,
      editPhoto: false,
      selectedPhoto: null,
    });
  };

  useEffect(() => {}, [locations]);

  return (
    <PopupWindow show={show} setShow={closePopup}>
      <div className="edit-photo-wrapper">
        <div className="image-box">
          <img src={selectedPhoto.photoUrl} alt={selectedPhoto.photoTitle} />
        </div>
        <div className="edit-area">
          <div className="tabs">
            <TabBar
              activeTab={activeTab}
              setActiveTab={setActiveTab}
              label_map={TAB_MAP}
            />
          </div>
          <div className="form">
            {activeTab === TAB_MAP[0] && (
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
                      value={locationQuery}
                      onChange={(e) => setLocationQuery(e.target.value)}
                      onKeyDownCapture={onLocationFetching}
                      placeholder="Search for a location"
                    />
                    {locations.length !== 0 && (
                      <div className="location-box">
                        {locations.length > 0 && (
                          <ul>
                            {locations.map((location, index) => (
                              <li
                                key={index}
                                onClick={(e) => finalizedLocation(location)}
                              >
                                <span>
                                  <FontAwesomeIcon
                                    icon={faCity}
                                    style={{ marginRight: "10px" }}
                                  />
                                </span>
                                {location.formatted}{" "}
                              </li>
                            ))}
                          </ul>
                        )}
                      </div>
                    )}
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
            {activeTab === TAB_MAP[1] && (
              <div className="input-field">
                <label htmlFor="photo-tags">Tags</label>
                <div className="tag-area">
                  {photo.tags.map((tag, index) => (
                    <div className="tag" key={index}>
                      {tag}
                      {"   "}
                      <span>
                        {"   "}
                        <FontAwesomeIcon
                          icon={faClose}
                          onClick={(e) => removeTag(index)}
                        />{" "}
                      </span>
                    </div>
                  ))}
                  <input type="text" id="photo-tags" onKeyDown={addTag} />
                </div>
              </div>
            )}
            {activeTab === TAB_MAP[2] && (
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
            {activeTab === TAB_MAP[3] && (
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

      <ToastContainer
        position="top-right"
        autoClose={2000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="dark"
      />
    </PopupWindow>
  );
}

export default EditPhoto;
