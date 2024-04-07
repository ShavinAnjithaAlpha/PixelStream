import React, { useState } from "react";
import axios from "../../../axios";
import "./UploadImageTile.css";

function UploadImageTile({ image, user }) {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [location, setLocation] = useState("");
  const [tags, setTags] = useState([]);
  const [err, setErr] = useState(null);

  const addTag = (e) => {
    if (e.key === "Enter") {
      setTags([...tags, e.target.value]);
      e.target.value = "";
    }
  };

  const uploadImage = () => {
    if (!title || !location) {
      setErr("Title and location are required");
      return;
    }

    const payLoad = new FormData();
    payLoad.append("title", title);
    payLoad.append("description", description);
    payLoad.append("location", location);
    payLoad.append("file", image.file);

    axios
      .put("/photos/", payLoad, {
        headers: {
          "Content-Type": "multipart/form-data",
          Authorization: `${user}`,
        },
      })
      .then((response) => {
        console.log(response);
      })
      .catch((err) => {
        console.log(err);
        setErr(err.response.data.message || err.response.data.error);
      });
  };

  return (
    <div className="upload-image-tile">
      <div className="image-box">
        <img src={image.data} alt="upload" width={400} />
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
          <input
            type="text"
            placeholder="Image Description"
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
        <p>{err}</p>
      </div>
    </div>
  );
}

export default UploadImageTile;
