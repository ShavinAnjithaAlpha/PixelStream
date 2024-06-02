import React from "react";
import Select from "react-select";
import useFollow from "../../../hooks/useFollow";
import UserCard from "../../../components/UserCard/UserCard";
import NextPrevPage from "../../../components/NextPrevPage/NextPrevPage";
import Spinner from "../../../components/Spinner/Spinner";
import "./FollowersTab.css";

const sortOptions = [
  { value: "latest", label: "Latest" },
  { value: "oldest", label: "Oldest" },
  { value: "email", label: "email" },
  { value: "username", label: "Username" },
  { value: "location", label: "Location" },
];

function FollowersTab({ username }) {
  const [options, setOptions] = React.useState({});
  const {
    followers,
    followings,
    stat,
    loading,
    error,
    handleFollowersPageChange,
    handleFollowingsPageChange,
  } = useFollow(username, options);

  return (
    <div className="follow-tab">
      <div className="column">
        <div className="title-bar">
          <h2>Followers</h2>
          <p>{stat[0].count || "0"} followers</p>
          <Select
            options={sortOptions}
            defaultValue={sortOptions[0]}
            onChange={(e) =>
              setOptions({ ...options, followers_sort: e.value })
            }
          />
        </div>
        {loading[0] && (
          <div className="loader">
            <Spinner />
          </div>
        )}
        {followers.map((follower, index) => (
          <UserCard key={index} user={follower} />
        ))}

        {followers.length === 0 && <h3>No Followers Yet</h3>}

        {error[0] && <div className="error">{error[0]}</div>}

        <NextPrevPage
          initialPage={1}
          onPageChange={handleFollowersPageChange}
          next={stat[0].limit !== 0 && stat[0].limit === stat[0].total}
        />
      </div>
      <div className="column">
        <div className="title-bar">
          <h2>Followings</h2>
          <p>{stat[1].count || "0"} followings</p>
          <Select
            options={sortOptions}
            defaultValue={sortOptions[0]}
            onChange={(e) =>
              setOptions({ ...options, followings_sort: e.value })
            }
          />
        </div>{" "}
        {loading[1] && (
          <div className="loader">
            <Spinner />
          </div>
        )}
        {followings.map((following, index) => (
          <UserCard key={index} user={following} />
        ))}
        {followings.length === 0 && <h3>Not Following Anyone Yet</h3>}
        {error[1] && <div className="error">{error[1]}</div>}
        <NextPrevPage
          initialPage={1}
          onPageChange={handleFollowingsPageChange}
          next={stat[1].limit !== 0 && stat[1].limit === stat[1].total}
        />
      </div>
    </div>
  );
}

export default FollowersTab;
