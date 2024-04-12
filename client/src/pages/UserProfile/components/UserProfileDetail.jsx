import React, { useState, useEffect, useContext } from "react";
import { useNavigate } from "react-router-dom";
import StatCard from "./StatCard";
import defaultProfileIcon from "../../../assets/img/default-profile-icon.png";
import leafsIcon from "../../../assets/img/leafs.jpg";
import axios from "../../../axios";
import { Tag } from "../../../components/Tag/Tag";
import { SearchContext } from "../../../contexts/search.context";
import "./UserProfileDetail.css";

function UserProfileDetail({ username, photos, backgroundImage }) {
  const navigate = useNavigate();
  const [userProfile, setUserProfile] = useState({});
  const [userInterests, setUserInterets] = useState([]);
  const { setSearchKeyword } = useContext(SearchContext);
  const [randomPhoto, setRandomPhoto] = useState(null);

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

    // set the random photo every 1 second
    let photo_ = null;
    photo_ = photos[Math.floor(Math.random() * photos.length)];

    setRandomPhoto(
      photo_ ? photo_.photoUrl : "https://source.unsplash.com/random/600x350"
    );

    const intervalId = setInterval(() => {
      // set the random photo every 1 second
      let photo_ = null;
      // while (!photo_) {
      photo_ = photos[Math.floor(Math.random() * photos.length)];
      // }
      setRandomPhoto(
        photo_ ? photo_.photoUrl : "https://source.unsplash.com/random/600x350"
      );
    }, 10000);

    return () => clearInterval(intervalId);
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

  return (
    <>
      <div className="user-profile-section">
        <div
          className="profile-section-wrapper"
          style={{ backdropFilter: "blur(20px)" }}
        >
          <div className="profile-section">
            <div className="profile-img">
              <img
                src={
                  userProfile.User && userProfile.User.profilePic
                    ? userProfile.User.profilePic
                    : defaultProfileIcon
                }
                width={120}
                height={120}
                alt={userProfile.userName}
              />
            </div>
            <div className="name">
              {userProfile.User && userProfile.User.fullName}
            </div>
            <div className="user-link">@{userProfile.userName}</div>

            <p>
              {userProfile.User && userProfile.User.Bio
                ? userProfile.User.Bio
                : "This user has no bio yet."}
            </p>
            <div className="stat-bar">
              <StatCard label="Followers" value={userProfile.followers} />
              <StatCard label="Followings" value={userProfile.followings} />
              <StatCard label="Likes" value={userProfile.totalLikes} />
              <StatCard label="Downloads" value={userProfile.totalDownloads} />
            </div>
            <p>User Interests</p>
            <div className="user-tag-bar">
              {userInterests.map((tag, index) => (
                <Tag key={index} tagName={tag} handleClick={handleTagSearch} />
              ))}
            </div>
          </div>
          <div className="btn-section">
            <img
              src={backgroundImage ? backgroundImage : leafsIcon}
              width={800}
              // height={350}
              alt={leafsIcon}
            />
            <div className="btn-bar">
              <button onClick={followUser}>Follow</button>
              <button>Message</button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default UserProfileDetail;
