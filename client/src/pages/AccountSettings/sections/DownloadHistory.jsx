import React, { useEffect, useState } from "react";
import axios from "../../../axios";
import getFormattedDate from "../../../utils/DateFormatter";
import "./DownloadHistory.css";

function DownloadHistory({ user }) {
  const [downloads, setDownloads] = useState([]);

  const downloadPhoto = (url) => {
    // open new window with given url
    window.open(url, "_blank");
  };

  useEffect(() => {
    axios
      .get(`/account/${user.username}/downloads`, {
        headers: {
          Authorization: `${user.user}`,
        },
      })
      .then((res) => {
        setDownloads(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, [user]);

  return (
    <div className="download-history-section">
      <h1>Download History</h1>
      <p>
        Your download history includes everything that you have downloaded while
        being logged in. It is only visible to you. Some activity might take
        some time to appear.
      </p>
      <div className="download-list-section">
        {downloads.map((download, index) => (
          <div className="download-item" key={index}>
            <div className="img-box">
              <img
                src={
                  (download.Photo && download.Photo.resizedPhotoUrl) ||
                  (download.Photo && download.Photo.photoUrl) ||
                  download.Photo
                }
                alt="downloaded-img"
                width={100}
              />
            </div>

            <div className="details">
              <h3>{download.Photo && download.Photo.photoTitle}</h3>
              <h4>
                @
                {download.Photo &&
                  download.Photo.User &&
                  download.Photo.User.UserAuth &&
                  download.Photo.User.UserAuth.userName}
              </h4>
            </div>

            <p>
              Downloaded on {download && getFormattedDate(download.createdAt)}
            </p>
            <button
              type="submit"
              id="download"
              onClick={(e) =>
                downloadPhoto(download.Photo && download.Photo.photoUrl)
              }
            >
              Download <span></span>
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}

export default DownloadHistory;
