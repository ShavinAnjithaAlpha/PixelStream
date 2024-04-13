import React, { useContext, useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { AuthContext } from "../../contexts/auth.context";
import axios from "../../axios";
import { StatCard } from "./components/StatCard";
import { DownloadButton } from "./components/DownloadButton";
import { ProfileCard } from "./components/ProfileCard";
import { TagBar } from "./components/TagBar";
import AddToCollectionBox from "../../components/AddToCollectionBox/AddToCollectionBox";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import CalendarTodayIcon from "@mui/icons-material/CalendarToday";
import CameraIcon from "@mui/icons-material/Camera";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faHeart,
  faPlus,
  faHeartCrack,
  faSpinner,
} from "@fortawesome/free-solid-svg-icons";
import PhotoGrid from "../../components/PhotoGrid";
import CollectionCard from "../../components/CollectionCard/CollectionCard";
import "./Photo.css";
import getFormattedDate from "../../utils/DateFormatter";

function Photo() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { authState } = useContext(AuthContext);
  const [photo, setPhoto] = useState({});
  const [tags, setTags] = useState([]);
  const [like, setLike] = useState({});
  const [dislike, setDislike] = useState({});
  const [relatedPhotos, setRelatedPhotos] = useState([]);
  const [relatedCollections, setRelatedCollections] = useState([]);

  const [addCollectionBox, setAddCollectionBox] = useState(false);

  const likedThePhoto = (e) => {
    if (!authState.status) {
      navigate("/login");
      return;
    }

    // first change the state of the like
    setLike(!like);

    // based on the liked state call the API
    if (!like) {
      // set the photo as liiked
      axios
        .post(
          `/photos/${photo.photoId}/like`,
          {},
          {
            headers: {
              Authorization: `${authState.user}`,
            },
          }
        )
        .then((res) => {
          setDislike(false);
          // increase the like count and decrease the dislike count if needed
          setPhoto({
            ...photo,
            PhotoStat: {
              ...photo.PhotoStat,
              likes: photo.PhotoStat.likes + 1,
              dislikes: dislike
                ? photo.PhotoStat.dislikes - 1
                : photo.PhotoStat.dislikes,
            },
          });
        })
        .catch((err) => {
          setLike(false);
        });
    } else {
      // set the photo as non liked
      axios
        .delete(`/photos/${photo.photoId}/like`, {
          headers: {
            Authorization: `${authState.user}`,
          },
        })
        .then((res) => {
          // decrease the like count
          setPhoto({
            ...photo,
            PhotoStat: {
              ...photo.PhotoStat,
              likes: photo.PhotoStat.likes - 1,
            },
          });
        })
        .catch((err) => {
          setLike(true);
        });
    }
  };

  const dislikeThePhoto = (e) => {
    if (!authState.status) {
      navigate("/login");
      return;
    }
    // first change the state of the like
    setDislike(!dislike);

    // based on the liked state call the API
    if (!dislike) {
      // set the photo as liiked
      axios
        .post(
          `/photos/${photo.photoId}/dislike`,
          {},
          {
            headers: {
              Authorization: `${authState.user}`,
            },
          }
        )
        .then((res) => {
          setLike(false);
          // increase the like count and decrease the dislike count if needed
          setPhoto({
            ...photo,
            PhotoStat: {
              ...photo.PhotoStat,
              dislikes: photo.PhotoStat.dislikes + 1,
              likes: like ? photo.PhotoStat.likes - 1 : photo.PhotoStat.likes,
            },
          });
        })
        .catch((err) => {
          setDislike(false);
        });
    } else {
      // set the photo as non liked
      axios
        .delete(`/photos/${photo.photoId}/dislike`, {
          headers: {
            Authorization: `${authState.user}`,
          },
        })
        .then((res) => {
          // decrease the like count
          setPhoto({
            ...photo,
            PhotoStat: {
              ...photo.PhotoStat,
              dislikes: photo.PhotoStat.dislikes - 1,
            },
          });
        })
        .catch((err) => {
          setDislike(true);
        });
    }
  };

  useEffect(() => {
    axios.get(`/photos/${id}`).then((res) => {
      setPhoto(res.data);
    });

    axios.get(`/photos/${id}/tags`).then((res) => {
      setTags(res.data);
    });

    if (authState.status) {
      axios
        .get(`/photos/${id}/like`, {
          headers: {
            Authorization: `${authState.user}`,
          },
        })
        .then((res) => {
          setLike(res.data.status);
        });
      axios
        .get(`/photos/${id}/dislike`, {
          headers: {
            Authorization: `${authState.user}`,
          },
        })
        .then((res) => {
          setDislike(res.data.status);
        });
    }

    // fetch the related photos from the API
    axios
      .get(`/photos?limit=10&page=2`)
      .then((res) => {
        setRelatedPhotos(res.data);
      })
      .catch((err) => {
        console.log(err);
      });

    // fetch related collections from the API
    axios
      .get(`/collections?limit=5&page=1`)
      .then((res) => {
        setRelatedCollections(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, [id]);

  return (
    <div
      className="photo-page-wrapper"
      style={{
        backgroundImage: `url('${photo.resizedPhotoUrl}')`,
        backgroundSize: "repeat",
        backgroundPosition: "center",
        width: "100%",
      }}
    >
      <div className="photo-page-box">
        <div className="photo-page">
          <div className="photo-container">
            <img
              className="photo no-download"
              src={photo.photoUrl}
              alt={photo.photoDes}
              width={700}
            />
          </div>
          <div className="detail-tab">
            <div className="photo-detail-panel">
              {photo.User && <ProfileCard user={photo.User} />}
              <div className="title-tab">
                <h2>{photo.photoTitle}</h2>
                <div className="btn-bar">
                  <div className="btn" onClick={likedThePhoto}>
                    <FontAwesomeIcon
                      icon={faHeart}
                      size="2xl"
                      style={{ color: like ? "red" : "black" }}
                    />
                  </div>
                  <div className="btn" onClick={dislikeThePhoto}>
                    <FontAwesomeIcon
                      icon={faHeartCrack}
                      size="2xl"
                      style={{
                        color: dislike ? "orange" : "black",
                      }}
                    />
                  </div>
                  <div
                    className="btn"
                    onClick={(e) => setAddCollectionBox(true)}
                  >
                    <FontAwesomeIcon icon={faPlus} size="2xl" />
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
                  <StatCard
                    labelName="View"
                    labelValue={photo.PhotoStat.views}
                  />
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
                  <span className="line">
                    Published on {getFormattedDate(photo.createdAt)}
                  </span>
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
              <TagBar tags={tags} />
            </div>
          </div>
        </div>

        {/* add to collection popup window */}
        {addCollectionBox && (
          <div className="add-collection-popup">
            <AddToCollectionBox
              setClose={setAddCollectionBox}
              selectedPhoto={photo}
            />
          </div>
        )}

        {/* related photo section */}
        <h2>Related Photos</h2>
        {!relatedPhotos && <FontAwesomeIcon icon={faSpinner} spin="true" />}
        {relatedPhotos && <PhotoGrid photos={relatedPhotos} />}

        {/* // related collection section */}
        <h2>Related Collections</h2>
        {!relatedCollections && (
          <FontAwesomeIcon icon={faSpinner} spin="true" />
        )}
        <div className="photo-collections-grid">
          {relatedCollections.map((collection) => (
            <CollectionCard
              key={collection.collectionId}
              collection={collection}
            />
          ))}
        </div>
      </div>
    </div>
  );
}

export default Photo;
