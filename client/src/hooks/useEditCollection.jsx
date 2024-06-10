import { useContext, useEffect, useReducer, useState } from "react";
import { AuthContext } from "../contexts/auth.context";
import axios from "../axios";
import { PopupContext } from "../contexts/popup.context";
import { toast } from "react-toastify";

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
    // update collection data
    const collectionUpdate = new Promise((resolve, reject) => {
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
          resolve(res);
        })
        .catch((err) => {
          reject(err);
          setUpdate(true);
        });
    });

    toast.promise(collectionUpdate, {
      loading: "Updating Collection...",
      success: "Collection Updated Successfully",
      error: "Failed to Update Collection",
    });

    // update the tags of the collection
    if (collection.new_tags.length > 0) {
      const collectionTagUpdate = new Promise((resolve, reject) => {
        // first remove existing tags in the remove_tags array
        const newTags = collection.new_tags.filter(
          (tag) => !collection.removed_tags.includes(tag)
        );

        const data = { tags: newTags };
        axios
          .post(`/collections/${collection.id}/tags`, data, {
            headers: {
              Authorization: `${authState.user}`,
            },
          })
          .then((res) => {
            setUpdate(true);
            resolve(res);
          })
          .catch((err) => {
            setUpdate(true);
            reject(err);
          });
      });

      toast.promise(collectionTagUpdate, {
        loading: "Updating Tags...",
        success: "Tags Updated Successfully",
        error: "Failed to Update Tags",
      });
    }

    // remove the tags from the photo
    if (collection.removed_tags.length > 0) {
      const collectionTagRemove = new Promise((resolve, reject) => {
        const removedTags = collection.removed_tags.filter(
          (tag) => !collection.new_tags.includes(tag)
        );

        const data = { tags: removedTags };
        axios
          .post(`/collections/${collection.id}/tags/remove`, data, {
            headers: {
              Authorization: `${authState.user}`,
            },
          })
          .then((res) => {
            setUpdate(true);
          })
          .catch((err) => {
            setUpdate(true);
            setError(err.response.data.error);
          });
      });

      toast.promise(collectionTagRemove, {
        loading: "Removing Tags...",
        success: "Tags Removed Successfully",
        error: "Failed to Remove Tags",
      });
    }
  };

  const deleteCollection = () => {
    setUpdate(false);

    const collectionDeletePromise = new Promise((resolve, reject) => {
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
          resolve(res);
        })
        .catch((err) => {
          setUpdate(true);
          reject(err);
        });
    });

    toast.promise(collectionDeletePromise, {
      loading: "Deleting Collection...",
      success: "Collection Deleted Successfully",
      error: "Failed to Delete Collection",
    });
  };

  useEffect(() => {
    // fetch the tags of the collection
    axios
      .get(`/collections/${collection.id}/tags`)
      .then((res) => {
        dispatch({ type: "SET_TAGS", payload: res.data });
      })
      .catch((err) => {
        toast.error(err.response.data.error || "Failed to fetch tags");
      });
  }, []);

  return {
    collection,
    dispatch,
    update,
    addTag,
    removeTag,
    updateCollection,
    deleteCollection,
  };
}

export default useEditCollection;
