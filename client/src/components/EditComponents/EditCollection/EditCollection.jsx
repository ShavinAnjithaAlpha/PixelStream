import React, { useContext, useState } from "react";
import { PopupContext } from "../../../contexts/popup.context";
import PopupWindow from "../../PopupWindow/PopupWindow";
import TabBar from "../TabBar";
import useEditCollection from "../../../hooks/useEditCollection";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faClose, faSpinner } from "@fortawesome/free-solid-svg-icons";
import "./EditCollection.css";

const TAB_MAP = ["General", "Tag", "Other"];

function EditCollection({ show, selectedCollection }) {
  const { popups, setPopups } = useContext(PopupContext);
  const [activeTab, setActiveTab] = useState(TAB_MAP[0]);
  const {
    collection,
    dispatch,
    update,
    error,
    addTag,
    removeTag,
    updateCollection,
    deleteCollection,
  } = useEditCollection({ selectedCollection });

  const closePopup = () => {
    setPopups({
      ...popups,
      editCollection: false,
      selectedCollection: null,
    });
  };

  return (
    <PopupWindow show={show} setShow={closePopup}>
      <div className="edit-collection-wrapper">
        <div className="image-box">
          <img src={collection.cover} alt={collection.title} />
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
                    <label htmlFor="collection-title">Collection Name</label>
                    <input
                      type="text"
                      id="collection-title"
                      maxLength={255}
                      minLength={3}
                      value={collection.title}
                      placeholder="Enter Collection Title"
                      required
                      onChange={(e) =>
                        dispatch({ type: "SET_TITLE", payload: e.target.value })
                      }
                    />
                  </div>

                  <div className="input-field">
                    <label htmlFor="collection-description">Description</label>
                    <textarea
                      id="collection-description"
                      maxLength={255}
                      rows={5}
                      value={collection.description}
                      placeholder="Enter collection escription (optional)"
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
                  {collection.tags.map((tag, index) => (
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
              <>
                <div className="input-field horizontal">
                  <input type="checkbox" id="private" />
                  <label htmlFor="private">Make Collection as Private</label>
                </div>
                <div className="delete-box">
                  <h2>Delete Collection</h2>
                  <p>
                    Are you sure you want to delete this collection? This action
                    cannot be undone. When a collection is deleted from
                    PixelStream, we will do everything we can to prevent its
                    further distribution, including preventing it from being
                    viewed and downloaded through PixelStream.
                  </p>
                  <button className="delete" onClick={deleteCollection}>
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
            <button className="save" onClick={updateCollection}>
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

export default EditCollection;
