import React from "react";
import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";
import ProfileBadge from "../components/ProfileBadge";
import { StatCard } from "../components/StatCard";
import { DownloadButton } from "../components/DownloadButton";
import { ProfileCard } from "../components/ProfileCard";
import { TagBar } from "../components/TagBar";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import CalendarTodayIcon from "@mui/icons-material/CalendarToday";
import CameraIcon from "@mui/icons-material/Camera";
import "./Photo.css";

function Photo() {
  const { id } = useParams();
  const [photo, setPhoto] = useState({});

  useEffect(() => {
    console.log(id);
    axios.get(`http://localhost:3000/api/photos/${id}`).then((res) => {
      setPhoto(res.data);
    });
  }, [id]);

  const handleDownload = () => {
    // increase the download count
    setPhoto({
      ...photo,
      PhotoStat: {
        ...photo.PhotoStat,
        downloads: photo.PhotoStat.downloads + 1,
      },
    });
    console.log("photo is ", photo);
    // send a request to the server to update the download count
    axios.get(`http://localhost:3000/api/photos/${id}/get`).then((res) => {
      // console.log(res.data);
    });
  };

  return (
    <>
      {/* <h1>{photo.photoTitle}</h1>
      <div className="photo-page">
        <div className="column">
          <div className="photo-container">
            {photo ? (
              <img
                src={photo.photoUrl}
                alt={photo.photoDes}
                className="no-download"
              />
            ) : (
              <p>Loading photo...</p>
            )}
          </div>
          <p className="photo-des">{photo.photoDes}</p>
          <a
            href={photo.photoUrl}
            download
            onClick={handleDownload}
            className="download-link"
          >
            <button className="download-btn">Download</button>
          </a>
        </div>
        <div className="column">
          {photo.PhotoStat ? (
            <div className="stat-bar">
              <div className="stat">Views: {photo.PhotoStat.views}</div>
              <div className="stat">Downloads: {photo.PhotoStat.downloads}</div>
              <div className="stat">Likes: {photo.PhotoStat.likes}</div>
              <div className="stat">Dislikes: {photo.PhotoStat.dislikes}</div>
            </div>
          ) : null}
          {photo.User ? (
            <p className="author">Uploaded by: {photo.User.fullName}</p>
          ) : null}

          <ul>
            <li>Location: {photo.location}</li>
            <li>Captured From: {photo.capturedFrom}</li>
            <li>Published: {photo.createdAt}</li>
          </ul>
        </div>
      </div> */}

      <div className="photo-page">
        <div className="photo-container">
          <img
            className="photo no-download"
            src={photo.photoUrl}
            alt={photo.photoDes}
            width={600}
            height={600}
          />
        </div>
        <div className="detail-tab">
          <div className="photo-detail-panel">
            {photo.User && <ProfileCard user={photo.User} />}
            <div className="title-tab">
              <h2>{photo.photoTitle}</h2>
              <div className="btn-bar">
                <div className="btn">
                  <img
                    src="/assets/img/icons8-favorite-96.png"
                    className="img"
                    alt="Like"
                  />
                </div>
                <div className="btn">
                  <img
                    src="/assets/img/icons8-dislike-96.png"
                    className="img"
                    alt="DisLike"
                  />
                </div>
                <div className="btn">
                  <img
                    src="/assets/img/icons8-plus-96.png"
                    className="img"
                    alt="Add To"
                  />
                </div>

                <DownloadButton />
              </div>
            </div>
            <p>{photo.photoDes}</p>
            {photo.PhotoStat && (
              <div className="stat-bar">
                <StatCard labelName="View" labelValue={photo.PhotoStat.views} />
                <StatCard
                  labelName="Downloads"
                  labelValue={photo.PhotoStat.downloads}
                />
                <StatCard
                  labelName="Likes"
                  labelValue={photo.PhotoStat.likes}
                />
                <StatCard
                  labelName="Dislikes"
                  labelValue={photo.PhotoStat.dislikes}
                />
              </div>
            )}
            <ul className="detail-list">
              <li className="detail-item">
                <CalendarTodayIcon />
                <span className="line">Published on August , 2023</span>
              </li>
              <li className="detail-item">
                <LocationOnIcon />
                <span className="line">New York, United State</span>
              </li>
              <li className="detail-item">
                <CameraIcon />
                <span className="line">Sony 45EM</span>
              </li>
            </ul>
            <TagBar />
          </div>
        </div>
      </div>
    </>
  );
}

export default Photo;
