import { useState, useEffect } from "react";
import axios from "../axios";

function useUserLikesHandler(username) {
  const [likePhotos, setLikePhotos] = useState([]);
  const [loading, setLoading] = useState(true);

  const getLikesOfUserFromAPI = (username, page) => {
    setLoading(true);
    axios
      .get(`users/${username}/likes?limit=18&page=${page}`)
      .then((res) => {
        // rreformat the data to match the photo card component
        const formattedPhotoData = [];
        res.data.photos.forEach((photo) => {
          formattedPhotoData.push(photo.Photo);
        });
        // set the formatted photo data as the state
        setLikePhotos(formattedPhotoData);
        setLoading(false);
      })
      .catch((err) => {
        console.log(err);
        setLoading(false);
      });
  };

  useEffect(() => {
    let page = 1;
    if (localStorage.getItem("page-user-likes")) {
      page = parseInt(localStorage.getItem("page-user-likes"));
    }

    getLikesOfUserFromAPI(username, page);
  }, [username]);

  const handlePageChange = (page) => {
    localStorage.setItem("page-user-likes", page);
    getLikesOfUserFromAPI(username, page);
  };

  return { likePhotos, loading, handlePageChange };
}

export default useUserLikesHandler;
