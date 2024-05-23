import { useState, useEffect, useContext } from "react";
import axios from "../axios";
import { SearchContext } from "../contexts/search.context";

function useCollectionSearch() {
  const { searchKeyword } = useContext(SearchContext);
  const [collections, setCollections] = useState([]);
  const [loading, setLoading] = useState(false);

  const getCollectionSearchedFromAPI = (searchKeyword, page) => {
    setLoading(true);
    axios
      .get(`search/collections?query=${searchKeyword}&limit=12&page=${page}`)
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
    if (localStorage.getItem("page-search-collection")) {
      page = parseInt(localStorage.getItem("page-search-collection"));
    }
    getCollectionSearchedFromAPI(searchKeyword, page);
  }, [searchKeyword]);

  const handlePageChange = (page) => {
    localStorage.setItem("page-search-collection", page);
    getCollectionSearchedFromAPI(searchKeyword, page);
  };

  return { collections, loading, handlePageChange };
}

export default useCollectionSearch;
