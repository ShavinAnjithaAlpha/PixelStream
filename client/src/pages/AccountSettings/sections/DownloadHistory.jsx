import React, { useState } from "react";
import "./DownloadHistory.css";

function DownloadHistory() {
  const [downloads, setDownloads] = useState([1, 2, 3]);

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
                src="https://source.unsplash.com/random"
                alt="downloaded-img"
                width={100}
              />
            </div>

            <div className="details">
              <h3>Photo 1</h3>
              <h4>@Shavin Anjitha</h4>
            </div>

            <p>Downloaded on 12/12/2021</p>
            <button type="submit" id="download">
              Download <span></span>
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}

export default DownloadHistory;
