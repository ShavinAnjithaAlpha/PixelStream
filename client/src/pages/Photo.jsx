import React from "react";
import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";
import { StatCard } from "../components/StatCard";
import { DownloadButton } from "../components/DownloadButton";
import { ProfileCard } from "../components/ProfileCard";
import { TagBar } from "../components/TagBar";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import CalendarTodayIcon from "@mui/icons-material/CalendarToday";
import CameraIcon from "@mui/icons-material/Camera";
import { format } from "date-fns";
import "./Photo.css";

function Photo() {
  const { id } = useParams();
  const [photo, setPhoto] = useState({});

  // format the date to readable format
  const date = photo.createdAt;
  const readableDate = date; // July 20, 2021

  useEffect(() => {
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
    // send a request to the server to update the download count
    axios.get(`http://localhost:3000/api/photos/${id}/get`).then((res) => {
      // console.log(res.data);
    });
  };

  return (
    <div className="photo-page">
      <div className="photo-container">
        <img
          className="photo no-download"
          src={photo.photoUrl}
          alt={photo.photoDes}
          width={700}
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

              <DownloadButton
                photoId={photo.photoId}
                setPhoto={setPhoto}
                photo={photo}
              />
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
              <StatCard labelName="Likes" labelValue={photo.PhotoStat.likes} />
              <StatCard
                labelName="Dislikes"
                labelValue={photo.PhotoStat.dislikes}
              />
            </div>
          )}
          <ul className="detail-list">
            <li className="detail-item">
              <CalendarTodayIcon />
              <span className="line">Published on {readableDate}</span>
            </li>
            {photo.location && (
              <li className="detail-item">
                <LocationOnIcon />
                <span className="line">{photo.location}</span>
              </li>
            )}
            {photo.capturedFrom && (
              <li className="detail-item">
                <CameraIcon />
                <span className="line">{photo.capturedFrom}</span>
              </li>
            )}
          </ul>
          <TagBar />
        </div>
      </div>
    </div>
  );
}

export default Photo;
