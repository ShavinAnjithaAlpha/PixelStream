import React, { useContext, useEffect } from "react";
import { toast } from "react-toastify";
import axios from "../axios";
import { AuthContext } from "../contexts/auth.context";
import getLocations from "../utils/location";

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
  const [locations, setLocations] = React.useState([]);
  const [locationQuery, setLocationQuery] = React.useState("");
  const [locationFetching, setLocationFetching] = React.useState(true);
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
    // update the photo details
    const updatePhotodetails = new Promise((resolve, reject) => {
      const data = {
        title: photo.title,
        location: locationQuery,
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
          resolve(res);
        })
        .catch((err) => {
          setUpdate(true);
          reject(err);
        });
    });

    toast.promise(updatePhotodetails, {
      pending: "Updating photo...",
      success: "Photo updated successfully",
      error: "Failed to update photo",
    });

    // update the tags of the photo
    // first add new tags to the photo
    if (photo.new_tags.length > 0) {
      const tagUpdate = new Promise((resolve, reject) => {
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
          .then((res) => {
            resolve(res);
          })
          .catch((err) => {
            reject(err);
          });
      });

      toast.promise(tagUpdate, {
        pending: "Updating tags...",
        success: "Tags updated successfully",
        error: {
          render({ data }) {
            return data.response.data.error || "Failed to update tags";
          },
        },
      });
    }

    // remove the tags from the photo
    if (photo.remove_tags.length > 0) {
      const removeTags = new Promise((resolve, reject) => {
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
          .then((res) => {
            resolve(res);
          })
          .catch((err) => {
            reject(err);
          });
      });

      toast.promise(removeTags, {
        pending: "Removing tags...",
        success: "Tags removed successfully",
        error: {
          render({ data }) {
            return data.response.data.error || "Failed to remove tags";
          },
        },
      });
    }
  };

  const deletePhoto = () => {
    const deletePhoto = new Promise((resolve, reject) => {
      axios
        .delete(`/photos/${photo.id}`, {
          headers: {
            Authorization: `${authState.user}`,
          },
        })
        .then((res) => {
          resolve(res);
        })
        .catch((err) => {
          reject(err);
        });
    });

    toast.promise(deletePhoto, {
      pending: "Deleting photo...",
      success: "Photo deleted successfully",
      error: "Failed to delete photo",
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

  const onLocationFetching = (e) => {
    setLocationFetching(true);
  };

  const finalizedLocation = (location) => {
    setLocationQuery(location.formatted);
    setLocations([]);
    setLocationFetching(false);
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
        toast.error(err.response.data.error || "Failed to fetch tags");
      });
  }, []);

  useEffect(() => {
    const timerId = setTimeout(async () => {
      if (locationQuery.length > 0 && locationFetching) {
        const locations = await getLocations(locationQuery);
        setLocations(locations);
      } else {
        setLocations([]);
      }
    }, 500);

    return () => clearTimeout(timerId);
  }, [locationQuery, locationFetching]);

  return {
    photo,
    dispatch,
    update,
    updatePhoto,
    deletePhoto,
    addTag,
    removeTag,
    locations,
    setLocations,
    locationQuery,
    setLocationQuery,
    finalizedLocation,
    onLocationFetching,
  };
}

export default useEditPhoto;
