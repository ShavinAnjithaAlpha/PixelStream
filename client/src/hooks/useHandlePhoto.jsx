import { useState, useEffect, useContext } from "react";
import { useNavigate } from "react-router-dom";
import axios from "../axios";
import { AuthContext } from "../contexts/auth.context";
import { PopupContext } from "../contexts/popup.context";

function useHandlePhoto(id) {
  const navigate = useNavigate();
  const { authState } = useContext(AuthContext);
  const { popups, setPopups } = useContext(PopupContext);
  const [photo, setPhoto] = useState({});
  const [comments, setComments] = useState([]);
  const [tags, setTags] = useState([]);
  const [like, setLike] = useState({});
  const [dislike, setDislike] = useState({});
  const [relatedPhotos, setRelatedPhotos] = useState([]);
  const [relatedCollections, setRelatedCollections] = useState([]);

  const addToNewCollection = () => {
    // if the user is not logged in, redirect to login page
    if (!authState.status) {
      navigate("/login");
      return;
    }

    setPopups({
      ...popups,
      selectedPhoto: photo,
      addToCollection: !popups.addToCollection,
    });
  };

  const likedThePhoto = (e) => {
    if (!authState.status) {
      navigate("/login");
      return;
    }

    // first change the state of the like
    setLike(!like);

    // based on the liked state call the API
    if (!like) {
      // set the photo as liiked
      axios
        .post(
          `/photos/${photo.photoId}/like`,
          {},
          {
            headers: {
              Authorization: `${authState.user}`,
            },
          }
        )
        .then((res) => {
          setDislike(false);
          // increase the like count and decrease the dislike count if needed
          setPhoto({
            ...photo,
            PhotoStat: {
              ...photo.PhotoStat,
              likes: photo.PhotoStat.likes + 1,
              dislikes: dislike
                ? photo.PhotoStat.dislikes - 1
                : photo.PhotoStat.dislikes,
            },
          });
        })
        .catch((err) => {
          setLike(false);
        });
    } else {
      // set the photo as non liked
      axios
        .delete(`/photos/${photo.photoId}/like`, {
          headers: {
            Authorization: `${authState.user}`,
          },
        })
        .then((res) => {
          // decrease the like count
          setPhoto({
            ...photo,
            PhotoStat: {
              ...photo.PhotoStat,
              likes: photo.PhotoStat.likes - 1,
            },
          });
        })
        .catch((err) => {
          setLike(true);
        });
    }
  };

  const dislikeThePhoto = (e) => {
    if (!authState.status) {
      navigate("/login");
      return;
    }
    // first change the state of the like
    setDislike(!dislike);

    // based on the liked state call the API
    if (!dislike) {
      // set the photo as liiked
      axios
        .post(
          `/photos/${photo.photoId}/dislike`,
          {},
          {
            headers: {
              Authorization: `${authState.user}`,
            },
          }
        )
        .then((res) => {
          setLike(false);
          // increase the like count and decrease the dislike count if needed
          setPhoto({
            ...photo,
            PhotoStat: {
              ...photo.PhotoStat,
              dislikes: photo.PhotoStat.dislikes + 1,
              likes: like ? photo.PhotoStat.likes - 1 : photo.PhotoStat.likes,
            },
          });
        })
        .catch((err) => {
          setDislike(false);
        });
    } else {
      // set the photo as non liked
      axios
        .delete(`/photos/${photo.photoId}/dislike`, {
          headers: {
            Authorization: `${authState.user}`,
          },
        })
        .then((res) => {
          // decrease the like count
          setPhoto({
            ...photo,
            PhotoStat: {
              ...photo.PhotoStat,
              dislikes: photo.PhotoStat.dislikes - 1,
            },
          });
        })
        .catch((err) => {
          setDislike(true);
        });
    }
  };

  const setImageViewerPhoto = () => {
    setPopups({
      ...popups,
      selectedPhoto: photo,
      photoViewer: true,
    });
  };

  const addNewComment = (comment) => {
    axios
      .post(
        `/photos/comment/${photo.photoId}`,
        { comment },
        {
          headers: {
            Authorization: `${authState.user}`,
          },
        }
      )
      .then((res) => {
        fetchComments(photo.photoId, 1);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const fetchComments = (photoId, page) => {
    axios
      .get(`/photos/comment/${photoId}?page=${page}&limit=20`)
      .then((res) => {
        setComments(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const updateComment = (comment) => {};

  const deleteComment = (comment) => {};

  useEffect(() => {
    axios.get(`/photos/${id}`).then((res) => {
      setPhoto(res.data);
    });

    axios.get(`/photos/${id}/tags`).then((res) => {
      setTags(res.data);
    });

    if (authState.status) {
      axios
        .get(`/photos/${id}/like`, {
          headers: {
            Authorization: `${authState.user}`,
          },
        })
        .then((res) => {
          setLike(res.data.status);
        });
      axios
        .get(`/photos/${id}/dislike`, {
          headers: {
            Authorization: `${authState.user}`,
          },
        })
        .then((res) => {
          setDislike(res.data.status);
        });
    }

    // fetch the related photos from the API
    axios
      .get(`/photos/${id}/related/photos?limit=10&page=1`)
      .then((res) => {
        setRelatedPhotos(res.data.photos);
      })
      .catch((err) => {
        console.log(err);
      });

    // fetch related collections from the API
    axios
      .get(`/photos/${id}/related/collections?limit=5&page=1`)
      .then((res) => {
        setRelatedCollections(res.data.collections);
      })
      .catch((err) => {
        console.log(err);
      });

    fetchComments(id, 1);
  }, [id, authState]);

  return {
    photo,
    comments,
    setPhoto,
    tags,
    like,
    dislike,
    relatedPhotos,
    relatedCollections,
    likedThePhoto,
    dislikeThePhoto,
    setImageViewerPhoto,
    addToNewCollection,
    addNewComment,
    updateComment,
    deleteComment,
  };
}

export default useHandlePhoto;
