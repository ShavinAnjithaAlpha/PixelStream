import React, { useState } from "react";
import imageIcon from "../../../assets/img/image-icon.png";
import "./UploadImageTile.css";

function UploadImageTile({ setSelectedPhotos, selectedPhotos }) {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [location, setLocation] = useState("");
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

  const setImageUrl = (e) => {
    setPhotoData(e.target.files[0]);
    setPhoto(URL.createObjectURL(e.target.files[0]));
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
    };

    setSelectedPhotos([...selectedPhotos, newPhoto]);
    setTitle("");
    setDescription("");
    setLocation("");
    setTags([]);
    setPhoto(imageIcon);
    setPhotoData(null);
  };

  // const uploadImage = () => {
  //   if (!title || !location) {
  //     setErr("Title and location are required");
  //     return;
  //   }

  //   const payLoad = new FormData();
  //   payLoad.append("title", title);
  //   payLoad.append("description", description);
  //   payLoad.append("location", location);
  //   payLoad.append("file", image.file);

  //   axios
  //     .put("/photos/", payLoad, {
  //       headers: {
  //         "Content-Type": "multipart/form-data",
  //         Authorization: `${user}`,
  //       },
  //     })
  //     .then((response) => {
  //       console.log(response);
  //     })
  //     .catch((err) => {
  //       console.log(err);
  //       setErr(err.response.data.message || err.response.data.error);
  //     });
  // };

  return (
    <div className="upload-image-tile">
      <div className="image-box">
        <input type="file" accept="image/*" onChange={setImageUrl} />
        <img src={photo} width={300} alt="upload" />
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
          />
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
          {tags.map((tag) => (
            <div className="tag" key={tag}>
              {tag}
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
