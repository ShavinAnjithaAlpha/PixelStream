import React, { useContext } from "react";
import { AuthContext } from "../../../contexts/auth.context";
import StatCard from "./StatCard";
import defaultProfileIcon from "../../../assets/img/default-profile-icon.png";
import { Tag } from "../../../components/Tag/Tag";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faLink, faLocationDot } from "@fortawesome/free-solid-svg-icons";
import fallBackImage from "../../../assets/img/fallback.jpg";
import useUserProfileHandler from "../../../hooks/useUserProfileHandler";
import "./UserProfileDetail.css";

function UserProfileDetail({ username, backgroundImage }) {
  const { authState } = useContext(AuthContext);
  const {
    userProfile,
    userInterests,
    goToAccount,
    handleTagSearch,
    followUser,
    unfollowUser,
    isFollowing,
  } = useUserProfileHandler(username);

  return (
    <>
      <div className="user-profile-section">
        <div className="profile-section-wrapper">
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
              {userProfile.User && userProfile.User.fullName}{" "}
              <span>
                {
                  (authState.status && authState,
                  authState.username === userProfile.userName && (
                    <button className="edit-btn" onClick={goToAccount}>
                      Edit
                    </button>
                  ))
                }
              </span>
              <span>
                {
                  (authState.status && authState,
                  authState.username !== userProfile.userName &&
                    !isFollowing && (
                      <button onClick={followUser}>Follow</button>
                    ))
                }
              </span>
              <span>
                {authState.status &&
                  authState.username !== userProfile.userName &&
                  isFollowing && (
                    <button onClick={unfollowUser}>Unfollow</button>
                  )}
              </span>
              <span>
                <button>Message</button>
              </span>
            </div>
            <div className="user-link">@{userProfile.userName}</div>

            <p>
              {userProfile.User && userProfile.User.Bio
                ? userProfile.User.Bio
                : "This user has no bio yet."}
            </p>

            <p>
              <span>
                <FontAwesomeIcon
                  icon={faLocationDot}
                  style={{ marginRight: "10px" }}
                />
              </span>
              {userProfile.User && userProfile.User.location}
            </p>
            <p>
              <span>
                <FontAwesomeIcon
                  icon={faLink}
                  style={{ marginRight: "10px" }}
                />
              </span>
              <a href={userProfile.User && userProfile.User.personalSite}>
                {(userProfile.User && userProfile.User.personalSite) || "-"}
              </a>
            </p>
            <div className="stat-bar">
              <StatCard label="Followers" value={userProfile.followers} />
              <StatCard label="Followings" value={userProfile.followings} />
              <StatCard label="Likes" value={userProfile.totalLikes} />
              <StatCard label="Downloads" value={userProfile.totalDownloads} />
            </div>
            <p>User Interests</p>
            <div className="user-tag-bar">
              {userInterests.length === 0 && <p>No Interets Yet</p>}
              {userInterests.map((tag, index) => (
                <Tag key={index} tagName={tag} handleClick={handleTagSearch} />
              ))}
            </div>
          </div>
          <div className="btn-section">
            <img
              src={backgroundImage ? backgroundImage.photoUrl : fallBackImage}
              alt={fallBackImage}
            />
            <div className="btn-bar">
              {/* <button onClick={followUser}>Follow</button>
              <button>Message</button> */}
            </div>
            {!backgroundImage.fallback && (
              <div className="photo-detail-bar">
                <h2>{backgroundImage.photoTitle}</h2>
                <p>{backgroundImage.photoDes}</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </>
  );
}

export default UserProfileDetail;
