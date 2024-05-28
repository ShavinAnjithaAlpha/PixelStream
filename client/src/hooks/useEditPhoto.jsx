import React, { useContext, useEffect } from "react";
import axios from "../axios";
import { AuthContext } from "../contexts/auth.context";

function useEditPhoto({ selectedPhoto }) {
  const reducer = (state, action) => {
    switch (action.type) {
      case "SET_TITLE":
        return { ...state, title: action.payload };
      case "SET_LOCATION":
        return { ...state, location: action.payload };
      case "SET_DESCRIPTION":
        return { ...state, description: action.payload };
      case "SET_CAPTURED_FROM":
        return { ...state, capturedFrom: action.payload };
      case "SET_TAGS":
        return { ...state, tags: action.payload };
      case "ADD_TAG":
        return {
          ...state,
          new_tags: [...state.new_tags, action.payload],
          tags: [...state.tags, action.payload],
        };
      case "REMOVE_TAG":
        return {
          ...state,
          remove_tags: [...state.remove_tags, state.tags[action.payload]],
          tags: state.tags.filter((_, index) => index !== action.payload),
        };
      default:
        return state;
    }
  };

  const { authState } = useContext(AuthContext);
  const [update, setUpdate] = React.useState(true);
  const [error, setError] = React.useState("");
  const [photo, dispatch] = React.useReducer(reducer, {
    id: selectedPhoto.photoId,
    title: selectedPhoto.photoTitle,
    location: selectedPhoto.location,
    description: selectedPhoto.photoDes,
    capturedFrom: selectedPhoto.capturedFrom,
    tags: [],
    new_tags: [],
    remove_tags: [],
  });

  const updatePhoto = () => {
    setUpdate(false);
    const data = {
      title: photo.title,
      location: photo.location,
      description: photo.description,
      capturedFrom: photo.capturedFrom,
    };
    axios
      .put(`/photos/${photo.id}`, data, {
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

    // update the tags of the photo
    // first add new tags to the photo
    if (photo.new_tags.length > 0) {
      // first remove existing tags in the remove_tags array
      const newTags = photo.new_tags.filter(
        (tag) => !photo.remove_tags.includes(tag)
      );
      axios
        .post(
          `/photos/${photo.id}/tags`,
          { tags: newTags },
          {
            headers: {
              Authorization: `${authState.user}`,
            },
          }
        )
        .then((res) => {})
        .catch((err) => {
          setError(err.response.data.error);
        });
    }

    // remove the tags from the photo
    if (photo.remove_tags.length > 0) {
      const removedTags = photo.remove_tags.filter(
        (tag) => !photo.new_tags.includes(tag)
      );
      axios
        .post(
          `/photos/${photo.id}/tags/remove`,
          { tags: removedTags },
          {
            headers: {
              Authorization: `${authState.user}`,
            },
          }
        )
        .then((res) => {})
        .catch((err) => {
          setError(err.response.data.error);
        });
    }
  };

  const deletePhoto = () => {
    axios
      .delete(`/photos/${photo.id}`, {
        headers: {
          Authorization: `${authState.user}`,
        },
      })
      .then((res) => {
        console.log(res.data);
      })
      .catch((err) => {
        setError(err.response.data.error);
      });
  };

  const addTag = (event) => {
    if (event.key === "Enter") {
      dispatch({ type: "ADD_TAG", payload: event.target.value });
    }
  };

  const removeTag = (index) => {
    dispatch({ type: "REMOVE_TAG", payload: index });
  };

  useEffect(() => {
    axios
      .get(`/photos/${photo.id}/tags`, {
        headers: {
          Authorization: `${authState.user}`,
        },
      })
      .then((res) => {
        dispatch({ type: "SET_TAGS", payload: res.data });
      })
      .catch((err) => {
        setError(err.response.data.error);
      });
  }, []);

  return {
    photo,
    dispatch,
    update,
    error,
    updatePhoto,
    deletePhoto,
    addTag,
    removeTag,
  };
}

export default useEditPhoto;
