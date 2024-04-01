import React, { useState, useEffect, useContext } from "react";
import axios from "../../axios";
import { AuthContext } from "../../contexts/auth.context";
import AddCollectionCard from "./AddCollectionCard";
import "./AddToCollectionBox.css";

function AddToCollectionBox({ setClose }) {
  const { authState } = useContext(AuthContext);
  const [collections, setCollections] = useState([]);

  useEffect(() => {
    // fetch the collections of the user from the API
    axios
      .get(`collections/`, {
        headers: {
          Authorization: `${authState.user}`,
        },
      })
      .then((res) => {
        setCollections(res.data);
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

  return (
    <>
      <h1>Add to Collection</h1>

      <div className="add-to-collection-box" onKeyDown={closePopup}>
        {collections &&
          collections.map((collection) => (
            <AddCollectionCard
              collection={collection}
              key={collection.collectionId}
            />
          ))}

        <button className="new-collection-box">
          <span>+</span> New Collection
        </button>
        <button className="close-btn" onClick={(e) => setClose(false)}>
          X
        </button>
      </div>
    </>
  );
}

export default AddToCollectionBox;
