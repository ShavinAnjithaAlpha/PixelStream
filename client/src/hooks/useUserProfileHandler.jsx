import { useState, useContext, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "../axios";
import { AuthContext } from "../contexts/auth.context";
import { SearchContext } from "../contexts/search.context";

function useUserProfileHandler(username) {
  const { authState } = useContext(AuthContext);
  const { setSearchKeyword } = useContext(SearchContext);
  const navigate = useNavigate();
  const [userProfile, setUserProfile] = useState({});
  const [userInterests, setUserInterets] = useState([]);
  const [isFollowing, setIsFollowing] = useState(false);

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

    // fetch whether the user is following the visited user or not
    axios
      .get(`/users/${username}/follow`, {
        headers: {
          Authorization: `${authState.user}`,
        },
      })
      .then((res) => {
        if (res.data.status === "Following") {
          setIsFollowing(true);
        } else {
          setIsFollowing(false);
        }
      })
      .catch((err) => {
        console.log(err);
      });
  }, [username, authState.user]);

  const handleTagSearch = (tag) => {
    // first navigate to the search page
    navigate(`/search`);
    // set the search keyword so it will triger the search end points
    setSearchKeyword(tag);
  };

  const followUser = (e) => {
    axios
      .post(
        `/users/${username}/follow`,
        {},
        {
          headers: {
            Authorization: `${authState.user}`,
          },
        }
      )
      .then((res) => {
        setIsFollowing(true);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const unfollowUser = (e) => {
    axios
      .delete(`/users/${username}/follow`, {
        headers: {
          Authorization: `${authState.user}`,
        },
      })
      .then((res) => {
        setIsFollowing(false);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return {
    userProfile,
    userInterests,
    goToAccount,
    handleTagSearch,
    followUser,
    unfollowUser,
    isFollowing,
  };
}

export default useUserProfileHandler;
