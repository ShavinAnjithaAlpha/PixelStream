import React, { useEffect } from "react";
import axios from "../axios";

const LIMIT = 10;

function useFollow(username, options) {
  const [followers, setFollowers] = React.useState([]);
  const [followings, setFollowings] = React.useState([]);
  const [stat, setStat] = React.useState([{}, {}]);
  const [loading, setLoading] = React.useState([false, false]);
  const [error, setError] = React.useState([null, null]);

  const getFollowingDataFromAPI = (username, options, page) => {
    setLoading([loading[0], true]);
    // get followings
    axios
      .get(
        `/users/${username}/followings?sortBy=${
          options.followings_sort ? options.followings_sort : "latest"
        }&limit=${LIMIT}&page=${page}`
      )
      .then((res) => {
        setFollowings(res.data.followings);
        setStat([
          stat[0],
          {
            limit: res.data.limit,
            total: res.data.total,
            page: res.data.page,
            count: res.data.count,
          },
        ]);
        setLoading([loading[0], false]);
      })
      .catch((err) => {
        setError([error[0], err.response.data.error]);
        setLoading([loading[0], false]);
      });
  };

  const getFollowersDataFromAPI = (username, options, page) => {
    setLoading([true, loading[1]]);
    // get followers
    axios
      .get(
        `/users/${username}/followers?sortBy=${
          options.followers_sort ? options.followers_sort : "latest"
        }&limit=${LIMIT}&page=${page}`
      )
      .then((res) => {
        setFollowers(res.data.followers);
        setStat([
          {
            limit: res.data.limit,
            total: res.data.total,
            page: res.data.page,
            count: res.data.count,
          },
          stat[1],
        ]);
        setLoading([false, loading[1]]);
      })
      .catch((err) => {
        setError([err.response.data.error, error[1]]);
        setLoading(false, loading[1]);
      });
  };

  const handleFollowersPageChange = (page) => {
    getFollowersDataFromAPI(username, options, page);
  };

  const handleFollowingsPageChange = (page) => {
    getFollowingDataFromAPI(username, options, page);
  };

  useEffect(() => {
    getFollowersDataFromAPI(username, options, 1);
    getFollowingDataFromAPI(username, options, 1);
  }, [username, options]);

  return {
    followers,
    followings,
    stat,
    loading,
    error,
    handleFollowersPageChange,
    handleFollowingsPageChange,
  };
}

export default useFollow;
