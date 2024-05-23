import { useState, useEffect, useContext } from "react";
import axios from "../axios";
import { SearchContext } from "../contexts/search.context";

function useUserSearch() {
  const { searchKeyword } = useContext(SearchContext);
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(false);

  const getUserSearchedFromAPI = (searchKeyword, page) => {
    setLoading(true);
    axios
      .get(`search/users?query=${searchKeyword}&limit=18&page=${page}`)
      .then((res) => {
        setUsers(res.data);
        setLoading(false);
      })
      .catch((err) => {
        console.log(err);
        setLoading(false);
      });
  };

  const handlePageChange = (page) => {
    localStorage.setItem("page-search-user", page);
    getUserSearchedFromAPI(searchKeyword, page);
  };

  useEffect(() => {
    let page = 1;
    if (localStorage.getItem("page-search-user")) {
      page = parseInt(localStorage.getItem("page-search-user"));
    }

    getUserSearchedFromAPI(searchKeyword, page);
  }, []);

  return { users, loading, handlePageChange };
}

export default useUserSearch;
