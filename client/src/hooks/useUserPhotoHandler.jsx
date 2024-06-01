import { useState, useEffect } from "react";
import axios from "../axios";

function useUserPhotoHandler(username) {
  const [photos, setPhotos] = useState([]);
  const [loading, setLoading] = useState(false);

  const getUserPhotoFromAPI = (username, page) => {
    setLoading(true);
    axios
      .get(`/users/${username}/photos?limit=18&page=${page}`)
      .then((res) => {
        setPhotos(res.data);
        setLoading(false);
      })
      .catch((err) => {
        console.log(err);
        setLoading(false);
      });
  };

  useEffect(() => {
    let page = 1;
    if (localStorage.getItem("page-user-photo")) {
      page = parseInt(localStorage.getItem("page-user-photo"));
    }
    getUserPhotoFromAPI(username, page);
  }, [username]);

  const handlePageChange = (page) => {
    localStorage.setItem("page-user-photo", page);
    getUserPhotoFromAPI(username, page);
  };

  return { photos, loading, handlePageChange };
}

export default useUserPhotoHandler;
