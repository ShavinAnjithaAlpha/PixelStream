import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast, ToastContainer } from "react-toastify";
import defaultProfileImage from "../../../assets/img/default-profile-icon.png";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faClose, faSpinner } from "@fortawesome/free-solid-svg-icons";
import axios from "../../../axios";
import "react-toastify/dist/ReactToastify.css";
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

    const profileUpdate = new Promise((resolve, reject) => {
      if (!user.username || !user.user) {
        reject("User not logged in");
        navigate("/login");
      } else {
        axios
          .post(`account/${user.username}`, profile, {
            headers: {
              Authorization: `${user.user}`,
            },
          })
          .then((res) => {
            setSaving(false);
            resolve(res);
          })
          .catch((err) => {
            setSaving(false);
            reject(err);
          });
      }
    });

    toast.promise(profileUpdate, {
      pending: "Saving Profile Details...",
      success: "Profile Updated Successfully",
      error: {
        render({ data }) {
          return data.response.data.error || "Some Error happened";
        },
      },
    });

    // if profile image changes update the profile image also
    if (newProfileImage) {
      const profileImageUpdate = new Promise((resolve, reject) => {
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
            resolve(res);
          })
          .catch((err) => {
            setSaving(false);
            reject(err);
          });
      });

      toast.promise(profileImageUpdate, {
        pending: "Saving Profile Image...",
        success: "Profile Image Updated Successfully",
        error: {
          render({ data }) {
            return (
              data.response.data.error ||
              "Some Error happened while profile image uploading"
            );
          },
        },
      });
    }

    // save the new user interests
    // first clean the new tags and removed tags
    if (userInterests.new_tags.length !== 0) {
      const userInterestsUpdate = new Promise((resolve, reject) => {
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
            resolve(res);
          })
          .catch((err) => {
            setSaving(false);
            reject(err);
          });
      });

      toast.promise(userInterestsUpdate, {
        pending: "Saving User Interests...",
        success: "User Interests Updated Successfully",
        error: {
          render({ data }) {
            return data.response.data.error || "Some Error happened";
          },
        },
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
          firstName: res.data.User.firstName,
          lastName: res.data.User.lastName,
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

      <div className="personal-detail-section">
        <h2>Personal Details</h2>
        <p>
          This information will be visible to everyone who views your profile.
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
                value={profile.firstName}
                placeholder="Username"
                onChange={(e) =>
                  setProfile({ ...profile, firstName: e.target.value })
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
                value={profile.lastName}
                placeholder="Username"
                onChange={(e) =>
                  setProfile({ ...profile, lastName: e.target.value })
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

      <ToastContainer
        position="top-right"
        autoClose={2000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="dark"
      />
    </div>
  );
}

export default ProfileDetails;
