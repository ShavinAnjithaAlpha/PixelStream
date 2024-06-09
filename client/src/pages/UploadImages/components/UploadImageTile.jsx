import React, { useEffect, useState } from "react";
import imageIcon from "../../../assets/img/photo-upload.png";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCity, faClose } from "@fortawesome/free-solid-svg-icons";
import getLocations from "../../../utils/location";
import "./UploadImageTile.css";

function UploadImageTile({ setSelectedPhotos, selectedPhotos }) {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [location, setLocation] = useState("");
  const [locations, setLocations] = useState([]);
  const [fetchLocations, setFetchLocations] = useState(true);
  const [tags, setTags] = useState([]);
  const [err, setErr] = useState(null);
  const [photo, setPhoto] = useState(imageIcon);
  const [photoData, setPhotoData] = useState(null);

  const addTag = (e) => {
    if (e.key === "Enter") {
      setTags([...tags, e.target.value]);
      e.target.value = "";
    }
  };

  const removeTag = (index) => {
    const newTags = tags.filter((tag, i) => i !== index);
    setTags(newTags);
  };

  const turnLocationFetchingOn = () => {
    setFetchLocations(true);
  };

  const setImageUrl = (e) => {
    setPhotoData(e.target.files[0]);
    setPhoto(URL.createObjectURL(e.target.files[0]));
  };

  const finalizedLocation = (location) => {
    setLocation(location.formatted);
    setLocations([]);
    setFetchLocations(false);
  };

  const addPhoto = () => {
    if (!title || !location || photo === imageIcon) {
      setErr("Image, Title and location are required");

      setTimeout(() => {
        setErr(null);
      }, 3000);
      return;
    }

    const newPhoto = {
      title,
      description,
      location,
      tags,
      photo,
      photoData,
      status: false,
    };

    setSelectedPhotos([...selectedPhotos, newPhoto]);
    setTitle("");
    setDescription("");
    setLocation("");
    setTags([]);
    setPhoto(imageIcon);
    setPhotoData(null);
  };

  useEffect(() => {
    const timerId = setTimeout(async () => {
      if (location.length > 0 && fetchLocations) {
        const locations = await getLocations(location);
        setLocations(locations);
        setFetchLocations(false);
      }
    }, 500);

    return () => clearTimeout(timerId);
  }, [location, fetchLocations]);

  return (
    <div className="upload-image-tile">
      <div className="image-box">
        <input type="file" accept="image/*" onChange={setImageUrl} />
        <img src={photo} width={150} alt="upload" />
      </div>
      <div className="image-input-form">
        <div className="input-field">
          <input
            type="text"
            placeholder="Image Title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
        </div>
        <div className="input-field">
          <textarea
            type="text"
            placeholder="Image Description"
            rows={3}
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          />
        </div>
        <div className="input-field">
          <input
            type="text"
            placeholder="Image Location"
            value={location}
            onChange={(e) => setLocation(e.target.value)}
            onKeyDown={turnLocationFetchingOn}
          />
          {locations.length !== 0 && (
            <div className="location-box">
              <ul>
                {locations.map((location, index) => (
                  <li key={index} onClick={(e) => finalizedLocation(location)}>
                    <span>
                      <FontAwesomeIcon
                        icon={faCity}
                        style={{ marginRight: "10px" }}
                      />
                    </span>
                    {location.formatted}
                  </li>
                ))}
              </ul>
            </div>
          )}
        </div>

        <p>Tags</p>
        <div className="input-field">
          <input
            type="text"
            id="tag-input"
            placeholder="Tags"
            onKeyDown={addTag}
          />
        </div>
        <div className="tag-list">
          {tags.map((tag, index) => (
            <div className="tag" key={tag}>
              {tag}{" "}
              <span onClick={(e) => removeTag(index)}>
                <FontAwesomeIcon
                  icon={faClose}
                  style={{ marginLeft: "10px" }}
                />
              </span>
            </div>
          ))}
        </div>
        <p className="error-msg">*{err}</p>
        <button className="add-btn" onClick={addPhoto}>
          Add
        </button>
      </div>
    </div>
  );
}

export default UploadImageTile;
