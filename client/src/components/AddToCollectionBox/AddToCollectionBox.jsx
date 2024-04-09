import React, { useState, useEffect, useContext } from "react";
import axios from "../../axios";
import { AuthContext } from "../../contexts/auth.context";
import AddCollectionCard from "./AddCollectionCard";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faClose } from "@fortawesome/free-solid-svg-icons";
import "./AddToCollectionBox.css";

function AddToCollectionBox({ setClose, selectedPhoto }) {
  const { authState } = useContext(AuthContext);
  const [collections, setCollections] = useState([]);
  const [newCollection, setNewCollection] = useState(false);

  const [newCollectionName, setNewCollectionName] = useState("");
  const [newCollectionDescription, setNewCollectionDescription] = useState("");

  const [statusMessage, setStatusMessage] = useState("");
  const [error, setError] = useState("");

  useEffect(() => {
    // fetch the collections of the user from the API
    axios
      .get(`users/${authState.username}/collections`, {
        headers: {
          Authorization: `${authState.user}`,
        },
      })
      .then((res) => {
        setCollections(res.data.collections);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  const closePopup = (e) => {
    if (e.key === "Escape") {
      setClose(false);
    }
  };

  const changeToNewCollection = () => {
    setNewCollection(true);
  };

  const goPrevious = () => {
    setNewCollection(false);
  };

  const addPhotoToCollection = (collectionId) => {
    const data = {
      photoIds: [selectedPhoto.photoId],
    };

    axios
      .post(`collections/${collectionId}`, data, {
        headers: {
          Authorization: `${authState.user}`,
        },
      })
      .then((res) => {
        setStatusMessage(
          `Successfully added to the collection ${res.data.collection.collectionName}`
        );

        setTimeout(() => {
          setStatusMessage("");
        }, 2000);
      })
      .catch((err) => {
        setError(`${err.response.data.error}`);

        setTimeout(() => {
          setError("");
        }, 2000);
      });
  };

  const createNewCollection = () => {
    if (newCollectionName === "" || newCollectionDescription === "") {
      return;
    }

    const data = {
      title: newCollectionName,
      description: newCollectionDescription,
      coverPhoto: selectedPhoto.photoId,
    };
    // create a new collection via API
    axios
      .post(`collections`, data, {
        headers: {
          Authorization: `${authState.user}`,
        },
      })
      .then((res) => {
        // add the new collection to the collections
        setCollections([...collections, res.data]);
        setNewCollection(false);
      })
      .catch((err) => {
        setError(`${err.response.data.error}`);

        setTimeout(() => {
          setError("");
        }, 2000);
      });
  };

  return (
    <div className="add-to-collection-wrapper">
      {!newCollection && (
        <>
          <h1>Add to Collection</h1>

          <div className="add-to-collection-box" onKeyDown={closePopup}>
            {collections &&
              collections.map((collection) => (
                <AddCollectionCard
                  collection={collection}
                  key={collection.collectionId}
                  onAdd={(e) => addPhotoToCollection(collection.collectionId)}
                />
              ))}

            <button
              className="new-collection-box"
              onClick={changeToNewCollection}
            >
              <span>+</span>
            </button>
          </div>

          {statusMessage && (
            <div className="status-message">{statusMessage}</div>
          )}

          {error && <div className="error-message">{error}</div>}

          <button className="close-btn" onClick={(e) => setClose(false)}>
            <FontAwesomeIcon icon={faClose} />
          </button>
        </>
      )}

      {newCollection && (
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
                  value={newCollectionName}
                  onChange={(e) => setNewCollectionName(e.target.value)}
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
                  placeholder="Enter collection description (optional)"
                  value={newCollectionDescription}
                  onChange={(e) => setNewCollectionDescription(e.target.value)}
                ></textarea>
              </div>
              <div className="button-group">
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
                  Create
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}

export default AddToCollectionBox;
