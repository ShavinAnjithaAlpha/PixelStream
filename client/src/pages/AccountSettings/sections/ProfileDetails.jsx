import React, { useEffect, useState } from "react";
import defaultProfileImage from "../../../assets/img/default-profile-icon.png";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faClose } from "@fortawesome/free-solid-svg-icons";
import axios from "../../../axios";
import "./ProfileDetails.css";

function ProfileDetails({ user }) {
  const [profile, setProfile] = useState({});
  const [userInterests, setUserInterets] = useState([]);
  const [newProfileImage, setNewProfileImage] = useState(null);
  const [profileUrl, setProfileUrl] = useState(null);

  const setProfileImage = (e) => {
    if (!e.target.files[0]) return;

    if (e.target.files[0].size > 1024 * 1024 * 2) {
      alert("File size must be less than 2MB");
      return;
    }

    setNewProfileImage(e.target.files[0]);
    setProfileUrl(URL.createObjectURL(e.target.files[0]));
  };

  const removeTag = (tag) => {
    // remove the tag from the user interests
    setUserInterets(userInterests.filter((item) => item !== tag));
  };

  const addTag = (e) => {
    if (e.key === "Enter") {
      setUserInterets([...userInterests, e.target.value]);
    }
  };

  useEffect(() => {
    axios
      .get(`/users/${user.username}`)
      .then((res) => {
        setProfile(res.data);
      })
      .catch((err) => {
        console.log(err);
      });

    // fetch the user interests
    axios
      .get(`/users/${user.username}/interests`)
      .then((res) => {
        setUserInterets(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, [user]);

  return (
    <div className="profile-detail-section">
      <button type="submit" id="save2">
        Save <span></span>
      </button>

      <h1>Profile Details</h1>
      <p>
        Set your login preferences, help us personalize your experinece and make
        big account changes here
      </p>

      <div className="personal-detail-section">
        <h2>Personal Details</h2>
        <p>This information don’t be visible to anyon</p>

        <div className="form-col">
          <div className="form-box">
            <div className="form-item">
              <label htmlFor="username">Username</label>
              <input
                type="text"
                id="username"
                maxLength={255}
                minLength={3}
                value={profile.userName}
                placeholder="Username"
              />
            </div>

            <div className="form-item">
              <label htmlFor="firstname">First Name</label>
              <input
                type="text"
                id="username"
                maxLength={255}
                minLength={3}
                value={profile.User && profile.User.firstName}
                placeholder="Username"
              />
            </div>

            <div className="form-item">
              <label htmlFor="lastname">Last Name</label>
              <input
                type="text"
                id="username"
                maxLength={255}
                minLength={3}
                value={profile.User && profile.User.lastName}
                placeholder="Username"
              />
            </div>

            <div className="form-item">
              <label htmlFor="bio">Bio</label>
              <textarea
                type="text"
                id="bio"
                maxLength={255}
                minLength={3}
                value={profile.User && profile.User.Bio}
                placeholder="Bio"
                rows={5}
              />
            </div>
          </div>

          <div className="image-col">
            <div className="profile-image">
              <input
                type="file"
                id="profile-image"
                name="profile-image"
                accept="image/*"
                onChange={setProfileImage}
              />
              <img
                src={
                  newProfileImage
                    ? profileUrl
                    : profile && profile.User && profile.User.profilePic
                    ? profile.User.profilePic
                    : defaultProfileImage
                }
                width={250}
                height={250}
                alt="profileImage"
              />
            </div>
          </div>
        </div>
      </div>

      <div className="personal-detail-section">
        <h2>Contact Details</h2>
        <p>This information don’t be visible to anyone</p>

        <div className="form-box">
          <div className="form-item">
            <label htmlFor="Email">Email</label>
            <input
              type="text"
              id="email"
              maxLength={255}
              minLength={3}
              value={profile.email}
              placeholder="Email"
            />
          </div>

          <div className="form-item">
            <label htmlFor="location">Location</label>
            <input
              type="text"
              id="location"
              maxLength={255}
              minLength={3}
              value={profile.User && profile.User.location}
              placeholder="location"
            />
          </div>

          <div className="form-item">
            <label htmlFor="personal-site">Personal Site</label>
            <input
              type="text"
              id="personal-site"
              maxLength={255}
              minLength={3}
              value={profile.User && profile.User.personalSite}
              placeholder="portfolio url"
            />
          </div>
        </div>
      </div>

      <div className="personal-detail-section">
        <h2>Preferences</h2>
        <p>This information don’t be visible to anyone</p>

        <h3>User Interests</h3>

        <div className="tagbar">
          {userInterests.map((tag, index) => (
            <div className="tag" key={index}>
              {tag}
              <span onClick={(e) => removeTag(tag)}>
                <FontAwesomeIcon
                  icon={faClose}
                  style={{ color: "white", margin: "0px 10px" }}
                />
              </span>
            </div>
          ))}

          <input type="text" onKeyDown={addTag} />
        </div>
      </div>

      <button type="submit" id="save">
        Save <span></span>
      </button>
    </div>
  );
}

export default ProfileDetails;
