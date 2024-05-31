import { useState, useContext, useEffect, useReducer } from "react";
import axios from "../axios";
import { AuthContext } from "../contexts/auth.context";

function useAddToCollection(selectedPhoto, setPage) {
  const initialState = {
    newCollectionName: "",
    newCollectionDescription: "",
  };

  const reducer = (state, action) => {
    switch (action.type) {
      case "SET_NEW_COLLECTION_NAME":
        return {
          ...state,
          newCollectionName: action.payload,
        };
      case "SET_NEW_COLLECTION_DESCRIPTION":
        return {
          ...state,
          newCollectionDescription: action.payload,
        };
      case "SET_STATUS":
        return {
          ...state,
          statusMessage: action.payload,
        };
      case "SET_ERROR":
        return {
          ...state,
          error: action.payload,
        };
      default:
        return state;
    }
  };

  const { authState } = useContext(AuthContext);
  const [collections, setCollections] = useState([]);
  const [newCollectionState, dispatch] = useReducer(reducer, initialState);
  const [update, setUpdate] = useState(true);

  const addPhotoToCollection = (collectionId) => {
    setUpdate(false);
    const data = {
      photoIds: [selectedPhoto.photoId],
    };

    let interval = null;
    axios
      .post(`collections/${collectionId}`, data, {
        headers: {
          Authorization: `${authState.user}`,
        },
      })
      .then((res) => {
        setUpdate(true);
        dispatch({ type: "SET_STATUS", payload: "Photo added to collection" });
        dispatch({ type: "SET_ERROT", payload: "" });

        interval = setTimeout(() => {
          dispatch({ type: "SET_STATUS", payload: "" });
        }, 2000);
      })
      .catch((err) => {
        setUpdate(true);
        dispatch({ type: "SET_ERROR", payload: `${err.response.data.error}` });

        interval = setTimeout(() => {
          dispatch({ type: "SET_ERROR", payload: "" });
        }, 2000);
      });
  };

  const createNewCollection = () => {
    setUpdate(false);
    if (
      newCollectionState.newCollectionName === "" ||
      newCollectionState.newCollectionDescription === ""
    ) {
      setUpdate(true);
      dispatch({
        type: "SET_ERROR",
        payload: "Collecion title and description is required!",
      });
      return;
    }

    const data = {
      title: newCollectionState.newCollectionName,
      description: newCollectionState.newCollectionDescription,
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
        setUpdate(true);
        // add the new collection to the collections
        setCollections([...collections, res.data]);
        dispatch({ type: "SET_ERROR", payload: "" });
        setPage(1);
      })
      .catch((err) => {
        setUpdate(true);
        dispatch({
          type: "SET_ERROR",
          payload: `${err.response.data.error}`,
        });

        setTimeout(() => {
          dispatch({
            type: "SET_ERROR",
            payload: "",
          });
        }, 2000);
      });
  };

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
        dispatch({ type: "SET_ERROR", payload: err.response.data.error });
      });
  }, [authState.username, authState.user]);

  return {
    collections,
    update,
    addPhotoToCollection,
    createNewCollection,
    dispatch,
    newCollectionState,
  };
}

export default useAddToCollection;
