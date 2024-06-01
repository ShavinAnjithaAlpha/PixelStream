import { useEffect, useState } from "react";
import axios from "../axios";

const PAGE_LIMIT = 18;

function useGetCollections() {
  const [collections, setCollections] = useState([]);
  const [backgroundPhoto, setBackgroundPhoto] = useState(null);
  const [loading, setLoading] = useState(true);

  const fetchCollectionsFromAPI = (page) => {
    setLoading(true);
    axios
      .get(`/collections?page=${page}&limit=${PAGE_LIMIT}`)
      .then((res) => {
        setCollections(res.data.collections);
        setLoading(false);
      })
      .catch((err) => {
        console.log(err);
        setLoading(false);
      });
  };

  const fetchRandomPhotoFromAPI = () => {
    axios
      .get("/photos/random?limit=1")
      .then((res) => {
        setBackgroundPhoto(res.data.photos[0].resizedPhotoUrl);
      })
      .catch(console.error());
  };

  useEffect(() => {
    // get the page from the local storage
    let page = 1;
    if (localStorage.getItem("page-collection")) {
      page = parseInt(localStorage.getItem("page-collection"));
    }

    fetchCollectionsFromAPI(page);
    fetchRandomPhotoFromAPI();
  }, []);

  const handlePageChange = (page) => {
    fetchCollectionsFromAPI(page);
    localStorage.setItem("page-collection", page);
  };

  return { collections, loading, backgroundPhoto, handlePageChange };
}

export default useGetCollections;
