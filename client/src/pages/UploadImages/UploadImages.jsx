import React, { useState, useContext } from "react";
import styled from "styled-components";
import { AuthContext } from "../../contexts/auth.context";
import UploadImageTile from "./components/UploadImageTile";
import UploadedImageTile from "./components/UploadedImageTile";
import axios from "../../axios";
import ProfileBadge from "../../components/ProfileBadge";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSpinner } from "@fortawesome/free-solid-svg-icons";
import Popup from "reactjs-popup";
import "./UploadImages.css";

const MAXIMUM_COUNT = 20;

const Menu = styled.div`
  background-color: #111111dd;
  backdrop-filter: blur(10px);
  transition: all 0.3s ease;
  padding: 0;
  border: 1px solid #ffffff33;
  border-radius: 10px;
`;

const MenuItem = styled.div`
  background: none;
  padding: 10px;
  border-bottom: 0px solid #f1f1f1;
  text-align: left;
  cursor: pointer;
  transition: all 0.3s ease;
  font-size: 0.9rem;
  color: white;

  &:hover {
    background-color: #ffffff33;
  }

  &:nth-child(1) {
    border-radius: 10px 10px 0 0;
  }

  & > a {
    color: white;
  }
`;

const LogOutMenuItem = styled.div`
  padding: 10px;
  text-align: left;
  cursor: pointer;
  transition: all 0.3s ease;
  font-size: 0.9rem;
  color: red;
  border-top: 1px solid #ffffff33;
  border-radius: 0 0 10px 10px;

  &:hover {
    background-color: #ff0000aa;
    color: black;
  }

  & > a {
    color: red;
  }

  &:hover > a {
    color: red;
  }
`;

function UploadImages() {
  const { authState, setAuthState } = useContext(AuthContext);
  const [selectedPhotos, setSelectedPhotos] = useState([]);
  const [uploading, setUploading] = useState(false);
  const [progress, setProgress] = useState(0);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const onClose = (photo) => {
    // remove the photo from the selected photos
    setSelectedPhotos(selectedPhotos.filter((p) => p !== photo));
  };

  const logout = () => {
    if (selectedPhotos.length !== 0) {
      alert("Please upload the photos before logout");
      return;
    }

    // now logout
    localStorage.removeItem("token");
    setAuthState({ status: false });
  };

  const uploadPhotos = async () => {
    setUploading(true);
    setProgress(0);

    // map each photo to a promise
    const promises = selectedPhotos.map((photo, index) => {
      const payLoad = new FormData();
      payLoad.append("title", photo.title);
      payLoad.append("description", photo.description);
      payLoad.append("location", photo.location);
      payLoad.append("file", photo.photoData);
      payLoad.append("tags", photo.tags);

      return axios
        .put("/photos/", payLoad, {
          headers: {
            "Content-Type": "multipart/form-data",
            Authorization: `${authState.user}`,
          },
        })
        .then((res) => {
          setProgress(((index + 1) / selectedPhotos.length) * 100);
          setSelectedPhotos([...selectedPhotos, { ...photo, status: true }]);
        })
        .catch((err) => {
          console.log(err);
          setError(err.response.data.message || err.response.data.error);
        });
    });

    // wait for all promises to resolve
    await Promise.all(promises);

    setSuccess("Photos uploaded successfully");
    setProgress(0);
    setUploading(false);
    setSelectedPhotos([]);
    // run your code here
    setTimeout(() => {
      setSuccess("");
    }, 3000);
  };

  return (
    <div className="upload-photos">
      <div className="title-bar">
        <Link to="/">
          <div className="logo">PS</div>
        </Link>
        <h1>Uplaod Images</h1>

        <Popup
          trigger={
            <button
              style={{
                background: "none",
                border: "none",
                outline: "none",
              }}
            >
              <ProfileBadge user={authState.user} />
            </button>
          }
          position={["bottom center", "right center"]}
          contentStyle={{ background: "none", border: "none" }}
        >
          <Menu>
            <MenuItem>
              <Link to={`/user/${authState.username}`}>Profile</Link>
            </MenuItem>
            <MenuItem>
              <Link to="/account">Settings</Link>
            </MenuItem>
            <MenuItem>
              <Link to="/upload">Upload Photo</Link>
            </MenuItem>
            <MenuItem>
              <Link to={`/stat/${authState.username}`}>Stat</Link>
            </MenuItem>
            <LogOutMenuItem onClick={logout}>
              Logout @{authState.username}
            </LogOutMenuItem>
          </Menu>
        </Popup>
      </div>
      <p>
        You can upload upto 20 photos at a time. Only JPEG and PNG files.
        Maximum 50MB
      </p>

      <h3 id="count">
        {MAXIMUM_COUNT - selectedPhotos.length} more photo remaining
      </h3>

      {uploading && (
        <p id="uploading">
          <span>
            <FontAwesomeIcon
              icon={faSpinner}
              spin
              style={{ marginRight: "10px" }}
            />
          </span>
          {progress}% Complete...
        </p>
      )}
      <div className="upload-photo-grid">
        {selectedPhotos.length < MAXIMUM_COUNT && (
          <UploadImageTile
            setSelectedPhotos={setSelectedPhotos}
            selectedPhotos={selectedPhotos}
          />
        )}

        {selectedPhotos.map((photo, index) => (
          <UploadedImageTile key={index} photo={photo} onClose={onClose} />
        ))}
      </div>

      {error && <p className="error">{error}</p>}
      {success && <p className="success">{success}</p>}

      <button className="upload-btn" onClick={uploadPhotos}>
        Upload{" "}
        {uploading && (
          <span>
            <FontAwesomeIcon
              icon={faSpinner}
              spin="true"
              style={{ marginLeft: "10px" }}
            />
          </span>
        )}
      </button>
    </div>
  );
}

export default UploadImages;
