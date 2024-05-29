import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import defaultProfileImage from "../../../assets/img/default-profile-icon.png";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faClose, faSpinner } from "@fortawesome/free-solid-svg-icons";
import axios from "../../../axios";
import "./ProfileDetails.css";

function ProfileDetails({ user }) {
  const navigate = useNavigate();
  const [profile, setProfile] = useState({});
  const [userInterests, setUserInterets] = useState({
    tags: [],
    new_tags: [],
    removed_tags: [],
  });
  const [newProfileImage, setNewProfileImage] = useState(null);
  const [profileUrl, setProfileUrl] = useState(null);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [saving, setSaving] = useState(false);

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
    setUserInterets({
      ...userInterests,
      tags: userInterests.tags.filter((t) => t !== tag),
      removed_tags: [...userInterests.removed_tags, tag],
    });
  };

  const addTag = (e) => {
    if (e.key === "Enter") {
      setUserInterets({
        ...userInterests,
        tags: [...userInterests.tags, e.target.value],
        new_tags: [...userInterests.new_tags, e.target.value],
      });
    }
  };

  const handleSave = () => {
    setSaving(true);
    // save the profile details
    if (!user.username || !user.user) {
      return navigate("/login");
    }

    axios
      .post(`account/${user.username}`, profile, {
        headers: {
          Authorization: `${user.user}`,
        },
      })
      .then((res) => {
        setSaving(false);
        setSuccess("Profile Updated Successfully");
        setTimeout(() => {
          setSuccess("");
        }, 2000);
      })
      .catch((err) => {
        setError(err.response.data.error || "Some Error happened");
        setSaving(false);

        setTimeout(() => {
          setError("");
        }, 2000);
      });

    // if profile image changes update the profile image also
    if (newProfileImage) {
      // create new form data
      const formData = new FormData();
      formData.append("file", newProfileImage);

      axios
        .post(`account/${user.username}/change-profile-image`, formData, {
          headers: {
            "Content-Type": "multipart/form-data",
            Authorization: `${user.user}`,
          },
        })
        .then((res) => {
          setSaving(false);
          setSuccess("Profile Image Updated Successfully");
          setTimeout(() => {
            setSuccess("");
          }, 2000);
        })
        .catch((err) => {
          setError(
            err.response.data.error ||
              "Some Error happened while profile image uploading"
          );
          setSaving(false);

          setTimeout(() => {
            setError("");
          }, 2000);
        });
    }

    // save the new user interests
    // firs tclean the new tags and removed tags
    if (userInterests.new_tags.length !== 0) {
      // first remove items that are already in the removed tags
      const newTags = userInterests.new_tags.filter(
        (tag) => !userInterests.removed_tags.includes(tag)
      );

      axios
        .post(
          `account/${user.username}/interest`,
          { tags: newTags },
          {
            headers: {
              Authorization: `${user.user}`,
            },
          }
        )
        .then((res) => {
          setSaving(false);
          setSuccess("User Interests Updated Successfully");
          setTimeout(() => {
            setSuccess("");
          }, 2000);
        })
        .catch((err) => {
          setError(
            err.response.data.error ||
              "Some Error happened while saving user interests"
          );
          setSaving(false);

          setTimeout(() => {
            setError("");
          }, 2000);
        });
    }
  };

  useEffect(() => {
    if (user.username === undefined) {
      navigate("/login");
      return;
    }

    axios
      .get(`/users/${user.username}`)
      .then((res) => {
        // flatten the profile object
        const profileData = {
          username: res.data.userName,
          email: res.data.email,
          firstname: res.data.User.firstName,
          lastname: res.data.User.lastName,
          location: res.data.User.location,
          personalSite: res.data.User.personalSite,
          Bio: res.data.User.Bio,
          profilePic: res.data.User.profilePic,
        };

        setProfile(profileData);
      })
      .catch((err) => {});

    // fetch the user interests
    axios
      .get(`/users/${user.username}/interests`)
      .then((res) => {
        setUserInterets({
          ...userInterests,
          tags: res.data,
        });
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  return (
    <div className="profile-detail-section">
      <button type="submit" id="save2" onClick={handleSave}>
        Save{" "}
        <span>
          {saving && <FontAwesomeIcon icon={faSpinner} spin="true" />}
        </span>
      </button>

      <h1>Profile Details</h1>
      <p>
        Set your login preferences, help us personalize your experinece and make
        big account changes here
      </p>

      {error && <div className="error-msg">{error}</div>}

      {success && <div className="success-msg">{success}</div>}

      <div className="personal-detail-section">
        <h2>Personal Details</h2>
        <p>
          This information will be visible to everyone who views your profile
        </p>

        <div className="form-col">
          <div className="form-box">
            <div className="form-item">
              <label htmlFor="username">Username</label>
              <input
                type="text"
                id="username"
                maxLength={255}
                minLength={3}
                value={profile.username}
                placeholder="Username"
                onChange={(e) =>
                  setProfile({ ...profile, username: e.target.value })
                }
              />
            </div>

            <div className="form-item">
              <label htmlFor="firstname">First Name</label>
              <input
                type="text"
                id="username"
                maxLength={255}
                minLength={3}
                value={profile.firstname}
                placeholder="Username"
                onChange={(e) =>
                  setProfile({ ...profile, firstname: e.target.value })
                }
              />
            </div>

            <div className="form-item">
              <label htmlFor="lastname">Last Name</label>
              <input
                type="text"
                id="username"
                maxLength={255}
                minLength={3}
                value={profile.lastname}
                placeholder="Username"
                onChange={(e) =>
                  setProfile({ ...profile, lastname: e.target.value })
                }
              />
            </div>

            <div className="form-item">
              <label htmlFor="bio">Bio</label>
              <textarea
                type="text"
                id="bio"
                maxLength={255}
                minLength={3}
                value={profile.Bio}
                placeholder="Bio"
                rows={5}
                onChange={(e) =>
                  setProfile({ ...profile, Bio: e.target.value })
                }
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
                    : profile && profile.profilePic
                    ? profile.profilePic
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
              onChange={(e) =>
                setProfile({ ...profile, email: e.target.value })
              }
            />
          </div>

          <div className="form-item">
            <label htmlFor="location">Location</label>
            <input
              type="text"
              id="location"
              maxLength={255}
              minLength={3}
              value={profile.location}
              placeholder="location"
              onChange={(e) =>
                setProfile({ ...profile, location: e.target.value })
              }
            />
          </div>

          <div className="form-item">
            <label htmlFor="personal-site">Personal Site</label>
            <input
              type="text"
              id="personal-site"
              maxLength={255}
              minLength={3}
              value={profile.personalSite}
              placeholder="portfolio url"
              onChange={(e) =>
                setProfile({ ...profile, personalSite: e.target.value })
              }
            />
          </div>
        </div>
      </div>

      <div className="personal-detail-section">
        <h2>Preferences</h2>
        <p>This information don’t be visible to anyone</p>

        <h3>User Interests</h3>

        <div className="tagbar">
          {userInterests.tags.map((tag, index) => (
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

          <input type="text" onKeyDown={addTag} placeholder=" + Add Tag" />
        </div>
      </div>

      <button type="submit" id="save" onClick={handleSave}>
        Save{" "}
        <span>
          {saving && <FontAwesomeIcon icon={faSpinner} spin="true" />}
        </span>
      </button>
    </div>
  );
}

export default ProfileDetails;
