import React from "react";
import { useContext } from "react";
import { AuthContext } from "../../../contexts/auth.context";
import axios from "../../../axios";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowDown } from "@fortawesome/free-solid-svg-icons";
import "./DownloadButton.css";

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
        {/* <div className={`text-wrapper`}>Download</div> */}
        <FontAwesomeIcon icon={faArrowDown} size="xl" />
      </button>
    </a>
  );
};
