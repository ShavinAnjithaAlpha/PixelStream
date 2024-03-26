import React, { useState, useContext } from "react";
import axios from "../../axios";
import { AuthContext } from "../../contexts/auth.context";
import "./UploadImages.css";

function UploadImages() {
  const { authState } = useContext(AuthContext);
  const [selectedFile, setSelectedFile] = useState(null);
  const [selectedImage, setSelectedImage] = useState(null);
  const [err, setErr] = useState(null);

  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [location, setLocation] = useState("");

  const handleImageUpload = (event) => {
    setSelectedFile(event.target.files[0]);
    setSelectedImage(URL.createObjectURL(event.target.files[0]));
  };

  const uploadImage = (e) => {
    const payLoad = new FormData();
    payLoad.append("title", title);
    payLoad.append("description", description);
    payLoad.append("location", location);
    payLoad.append("file", selectedFile);

    axios
      .put("/photos/", payLoad, {
        headers: {
          "Content-Type": "multipart/form-data",
          Authorization: `${authState.user}`,
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
    <div>
      <h1>Uplaod Images</h1>
      <input type="file" accept="image/*" onChange={handleImageUpload} />
      {selectedImage && (
        <img
          src={selectedImage}
          alt="Selected"
          style={{ width: "500px" }}
          loading="lazy"
        />
      )}
      <h3>{selectedImage}</h3>

      <label htmlFor="title">Title:</label>
      <input
        type="text"
        placeholder="Title"
        onChange={(e) => setTitle(e.target.value)}
      />

      <label htmlFor="description">Description:</label>
      <input
        type="text"
        placeholder="Description"
        onChange={(e) => setDescription(e.target.value)}
      />

      <label htmlFor="location">Location:</label>
      <input
        type="text"
        placeholder="Location"
        onChange={(e) => setLocation(e.target.value)}
      />

      <button onClick={uploadImage}>Upload</button>

      {err && (
        <div>
          <p>{err}</p>
        </div>
      )}
    </div>
  );
}

export default UploadImages;
