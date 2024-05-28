import React, { useContext } from "react";
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
  });

  const updatePhoto = () => {
    setUpdate(false);
    const data = {
      title: photo.title,
      location: photo.location,
      description: photo.description,
      capturedFrom: photo.capturedFrom,
      tags: photo.tags,
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

  return { photo, dispatch, update, error, updatePhoto, deletePhoto };
}

export default useEditPhoto;
