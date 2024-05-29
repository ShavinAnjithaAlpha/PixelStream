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
  const [tags, setTags] = useState([]);
  const [like, setLike] = useState({});
  const [dislike, setDislike] = useState({});
  const [relatedPhotos, setRelatedPhotos] = useState([]);
  const [relatedCollections, setRelatedCollections] = useState([]);

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
      .get(`/photos?limit=10&page=2`)
      .then((res) => {
        setRelatedPhotos(res.data);
      })
      .catch((err) => {
        console.log(err);
      });

    // fetch related collections from the API
    axios
      .get(`/collections?limit=5&page=1`)
      .then((res) => {
        setRelatedCollections(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, [id, authState]);

  return {
    photo,
    setPhoto,
    tags,
    like,
    dislike,
    relatedPhotos,
    relatedCollections,
    likedThePhoto,
    dislikeThePhoto,
    setImageViewerPhoto,
  };
}

export default useHandlePhoto;
