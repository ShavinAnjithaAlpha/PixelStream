import { useState, useEffect, useContext } from "react";
import axios from "../axios";
import { SearchContext } from "../contexts/search.context";

function usePhotoSearch(options) {
  const { searchKeyword } = useContext(SearchContext);
  const [photos, setPhotos] = useState([]);
  const [loading, setLoading] = useState(false);

  const getPhotoSearchedFromAPI = (searchKeyword, options, page) => {
    if (searchKeyword) {
      setLoading(true);
      axios
        .get(
          `search/photos?query=${searchKeyword}&limit=12&orientation=${
            options.orientation || "all"
          }&sortBy=${options.sortBy || "latest"}&page=${page}`
        )
        .then((res) => {
          setPhotos(res.data.photos);
          setLoading(false);
        })
        .catch((err) => {
          console.log(err);
          setLoading(false);
        });
    }
  };

  useEffect(() => {
    let page = 1;
    if (localStorage.getItem("page-search-photo")) {
      page = parseInt(localStorage.getItem("page-search-photo"));
    }

    getPhotoSearchedFromAPI(searchKeyword, options, page);
  }, [searchKeyword, options]);

  const handlePageChange = (page) => {
    localStorage.setItem("page-search-photo", page);
    getPhotoSearchedFromAPI(searchKeyword, options, page);
  };

  return { photos, loading, handlePageChange };
}

export default usePhotoSearch;
