import { useState, useEffect } from "react";
import axios from "../axios";

function useUserCollectionHandler(username) {
  const [collections, setCollections] = useState([]);
  const [loading, setLoading] = useState(true);

  const getCollectionsOfUserFromAPI = (username, page) => {
    setLoading(true);
    // fetch collections by username
    axios
      .get(`users/${username}/collections?limit=18&page=${page}`)
      .then((res) => {
        setCollections(res.data.collections);
        setLoading(false);
      })
      .catch((err) => {
        console.log(err);
        setLoading(false);
      });
  };

  useEffect(() => {
    let page = 1;
    if (localStorage.getItem("page-user-collection")) {
      page = parseInt(localStorage.getItem("page-user-collection"));
    }

    getCollectionsOfUserFromAPI(username, page);
  }, [username]);

  const handlePageChange = (page) => {
    localStorage.setItem("page-user-collection", page);
    getCollectionsOfUserFromAPI(username, page);
  };

  return { collections, loading, handlePageChange };
}

export default useUserCollectionHandler;
