import React, { useContext, useState } from "react";
import { PopupContext } from "../../../contexts/popup.context";
import AddCollectionCard from "./AddCollectionCard";
import PopupWindow from "../../PopupWindow/PopupWindow";
import useAddToCollection from "../../../hooks/useAddToCollection";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSpinner } from "@fortawesome/free-solid-svg-icons";
import "./AddToCollectionBox.css";

function AddToCollectionBox({ show, selectedPhoto }) {
  const { popups, setPopups } = useContext(PopupContext);
  const [page, setPage] = useState(1);
  const {
    collections,
    update,
    addPhotoToCollection,
    createNewCollection,
    dispatch,
    newCollectionState,
  } = useAddToCollection(selectedPhoto, setPage);

  const goPrevious = () => {
    setPage(1);
    dispatch({
      type: "SET_NEW_COLLECTION_NAME",
      payload: "",
    });
    dispatch({
      type: "SET_NEW_COLLECTION_DESCRIPTION",
      payload: "",
    });
  };

  const goNext = () => {
    setPage(2);
  };

  const closePopup = () => {
    setPopups({
      ...popups,
      addToCollection: false,
    });
  };

  return (
    <PopupWindow show={show} setShow={closePopup}>
      <div className="add-to-collection-wrapper">
        {page === 1 && (
          <>
            <h1>Add to Collection</h1>

            <div className="add-to-collection-box">
              {collections &&
                collections.map((collection) => (
                  <AddCollectionCard
                    collection={collection}
                    key={collection.collectionId}
                    onAdd={(e) => addPhotoToCollection(collection.collectionId)}
                  />
                ))}

              <button className="new-collection-box" onClick={goNext}>
                <span>+</span>
              </button>
            </div>

            {newCollectionState.statusMessage && (
              <div className="status-message">
                {newCollectionState.statusMessage}
              </div>
            )}

            {newCollectionState.error && (
              <div className="error-message">{newCollectionState.error}</div>
            )}
          </>
        )}

        {page === 2 && (
          <div className="new-collection-form">
            <div className="image-box">
              <img
                src={selectedPhoto.resizedPhotoUrl}
                alt={selectedPhoto.photoUrl}
              />
            </div>
            <div className="input-form">
              <h2>Create new collection</h2>

              <form>
                <div className="input-field">
                  <label htmlFor="collection-name">Name</label>
                  <input
                    type="text"
                    id="collection-name"
                    maxLength={255}
                    minLength={3}
                    placeholder="Enter collection name"
                    value={newCollectionState.newCollectionName}
                    onChange={(e) =>
                      dispatch({
                        type: "SET_NEW_COLLECTION_NAME",
                        payload: e.target.value,
                      })
                    }
                    required
                  />
                </div>
                <div className="input-field">
                  <label htmlFor="collection-description">
                    Description (Optional)
                  </label>
                  <textarea
                    id="collection-description"
                    maxLength={255}
                    rows={5}
                    placeholder="Enter collection description (optional)"
                    value={newCollectionState.newCollectionDescription}
                    onChange={(e) =>
                      dispatch({
                        type: "SET_NEW_COLLECTION_DESCRIPTION",
                        payload: e.target.value,
                      })
                    }
                  ></textarea>
                </div>
                <div className="button-group">
                  {newCollectionState.error && (
                    <div className="error-message">
                      {newCollectionState.error}
                    </div>
                  )}
                  <button
                    type="button"
                    className="cancel-btn"
                    onClick={goPrevious}
                  >
                    Cancel
                  </button>
                  <button
                    type="button"
                    className="create-btn"
                    onClick={createNewCollection}
                  >
                    Create{"   "}{" "}
                    {!update && (
                      <span>
                        <FontAwesomeIcon icon={faSpinner} spin={true} />
                      </span>
                    )}
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}
      </div>
    </PopupWindow>
  );
}

export default AddToCollectionBox;
