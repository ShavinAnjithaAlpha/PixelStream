import { useContext, useEffect, useReducer, useState } from "react";
import { AuthContext } from "../contexts/auth.context";
import axios from "../axios";
import { PopupContext } from "../contexts/popup.context";

function useEditCollection({ selectedCollection }) {
  const { popups, setPopups } = useContext(PopupContext);

  const reducer = (state, action) => {
    switch (action.type) {
      case "SET_TITLE":
        return { ...state, title: action.payload };
      case "SET_DESCRIPTION":
        return { ...state, description: action.payload };
      case "SET_TAGS":
        return { ...state, tags: action.payload };
      case "ADD_TAG":
        return {
          ...state,
          tags: [...state.tags, action.payload],
          new_tags: [...state.new_tags, action.payload],
        };
      case "REMOVE_TAG":
        return {
          ...state,
          tags: state.tags.filter((_, index) => index !== action.payload),
          removed_tags: [...state.removed_tags, action.payload],
        };

      default:
        return state;
    }
  };

  const { authState } = useContext(AuthContext);
  const [update, setUpdate] = useState(true);
  const [error, setError] = useState("");
  const [collection, dispatch] = useReducer(reducer, {
    id: selectedCollection.collectionId,
    title: selectedCollection.collectionName,
    description: selectedCollection.collectionDescription,
    cover: selectedCollection.Photo.photoUrl,
    tags: [],
    new_tags: [],
    removed_tags: [],
  });

  const addTag = (event) => {
    if (event.key === "Enter") {
      dispatch({ type: "ADD_TAG", payload: event.target.value });
    }
  };

  const removeTag = (index) => {
    dispatch({ type: "REMOVE_TAG", payload: index });
  };

  const updateCollection = () => {
    setUpdate(false);
    // create the post data
    const data = {
      collectionName: collection.title,
      collectionDescription: collection.description,
    };

    axios
      .put(`/collections/${collection.id}/`, data, {
        headers: {
          Authorization: `${authState.user}`,
        },
      })
      .then((res) => {
        setUpdate(true);
      })
      .catch((err) => {
        setError(err.response.data.error);
        setUpdate(true);
      });

    // update the tags of the collection
    if (collection.new_tags.length > 0) {
      // first remove existing tags in the remove_tags array
      const newTags = collection.new_tags.filter(
        (tag) => !collection.remove_tags.includes(tag)
      );
    }

    // remove the tags from the photo
    if (collection.remove_tags.length > 0) {
      const removedTags = collection.remove_tags.filter(
        (tag) => !collection.new_tags.includes(tag)
      );
    }
  };

  const deleteCollection = () => {
    setUpdate(false);
    axios
      .delete(`collections/${collection.id}`, {
        headers: {
          Authorization: `${authState.user}`,
        },
      })
      .then((res) => {
        setUpdate(true);
        // close the edit collecton popup
        setPopups({
          ...popups,
          editCollection: false,
          selectedCollection: null,
        });
      })
      .catch((err) => {
        setError(err.response.data.error);
        setUpdate(true);
      });
  };

  useEffect(() => {}, []);

  return {
    collection,
    dispatch,
    update,
    error,
    addTag,
    removeTag,
    updateCollection,
    deleteCollection,
  };
}

export default useEditCollection;
