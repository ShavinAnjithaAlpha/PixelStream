import React from "react";
import "./DownloadButton.css";
import { useContext } from "react";
import { AuthContext } from "../../../helpers/AuthContext";
import axios from "../../../axios";

export const DownloadButton = ({ photoId, setPhoto, photo }) => {
  const { authState } = useContext(AuthContext);

  const downloadPhoto = () => {
    // based on  the auth state, differ the download API endpoint
    if (authState.status) {
      axios
        .get(`/photos/${photoId}/download`, {
          headers: {
            Authorization: `${authState.user}`,
          },
        })
        .then((res) => {
          // increase the download count
          setPhoto({
            ...photo,
            PhotoStat: {
              ...photo.PhotoStat,
              downloads: photo.PhotoStat.downloads + 1,
            },
          });
        });
    } else {
      axios.get(`/photos/${photoId}/download`, {}).then((res) => {
        // increase the download count
        setPhoto({
          ...photo,
          PhotoStat: {
            ...photo.PhotoStat,
            downloads: photo.PhotoStat.downloads + 1,
          },
        });
      });
    }
  };

  return (
    <a onClick={downloadPhoto} href={photo.photoUrl}>
      <button className={`download-button`}>
        <div className={`text-wrapper`}>Download</div>
      </button>
    </a>
  );
};
