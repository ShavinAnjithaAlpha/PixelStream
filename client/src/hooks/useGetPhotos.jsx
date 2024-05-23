import { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "../axios";
import { SearchContext } from "../contexts/search.context";

const PAGE_LIMIT = 18;

function useGetPhotos() {
  const navigate = useNavigate();
  const [photos, setPhotos] = useState([]);
  const [status, setStatus] = useState(false);
  const { setSearchKeyword } = useContext(SearchContext);

  useEffect(() => {
    setStatus(false);
    // load the loclal storage data for paging the photos
    let page = 1;
    if (localStorage.getItem("page-photo")) {
      page = parseInt(localStorage.getItem("page-photo"));
    }

    axios
      .get(`/photos?limit=${PAGE_LIMIT}&page=${page}`)
      .then((res) => {
        setPhotos(res.data);
        setStatus(true);
      })
      .catch((err) => {
        console.log(err);
        setStatus(true);
      });
  }, []);

  const handlePageChange = (page) => {
    axios
      .get(`/photos?limit=18&page=${page}`)
      .then((res) => {
        setPhotos(res.data);
        // save the page to the local storage
        localStorage.setItem("page-photo", page);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const handleSearch = (e) => {
    if (e.key === "Enter") {
      // first navigate to the search page
      navigate("/search");
      // then set the search keyword so it will triger the search end points
      setSearchKeyword(e.target.value);
    }
  };

  const randomPhotoId = () => {
    return (Math.floor(Math.random() * 100) + 1) % PAGE_LIMIT;
  };

  return { photos, status, handlePageChange, handleSearch, randomPhotoId };
}

export default useGetPhotos;
