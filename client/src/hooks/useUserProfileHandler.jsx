import { useState, useContext, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "../axios";
import { AuthContext } from "../contexts/auth.context";
import { SearchContext } from "../contexts/search.context";

function useUserProfileHandler(username) {
  const { authState } = useContext(AuthContext);
  const navigate = useNavigate();
  const [userProfile, setUserProfile] = useState({});
  const [userInterests, setUserInterets] = useState([]);
  const { setSearchKeyword } = useContext(SearchContext);

  const goToAccount = () => {
    navigate(`/account`);
  };

  useEffect(() => {
    // first fetch user profile from the API
    axios
      .get(`/users/${username}`)
      .then((res) => {
        setUserProfile(res.data);
      })
      .catch((err) => {
        console.log(err);
      });

    // then fetch user interests
    axios
      .get(`/users/${username}/interests`)
      .then((res) => {
        setUserInterets(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, [username]);

  const handleTagSearch = (tag) => {
    // first navigate to the search page
    navigate(`/search`);
    // set the search keyword so it will triger the search end points
    setSearchKeyword(tag);
  };

  const followUser = (e) => {
    e.preventDefault();
    // call the follow user API
  };

  return {
    userProfile,
    userInterests,
    goToAccount,
    handleTagSearch,
    followUser,
  };
}

export default useUserProfileHandler;
