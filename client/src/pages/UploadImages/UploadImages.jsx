import React, { useState, useContext } from "react";
import axios from "../../axios";
import { AuthContext } from "../../contexts/auth.context";
import UploadImageTile from "./components/UploadImageTile";
import "./UploadImages.css";

function UploadImages() {
  const { authState } = useContext(AuthContext);
  const [err, setErr] = useState(null);
  const [addedPhotos, setAddedPhotos] = useState([]);

  const handleImageUpload = (event) => {
    const data = {
      file: event.target.files[0],
      data: URL.createObjectURL(event.target.files[0]),
    };
    setAddedPhotos([...addedPhotos, data]);
    // setSelectedImage(URL.createObjectURL(event.target.files[0]));
  };

  const uploadImage = (e) => {
    const payLoad = new FormData();
    // payLoad.append("title", title);
    // payLoad.append("description", description);
    // payLoad.append("location", location);
    // payLoad.append("file", selectedFile);

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
    <div className="upload-photos">
      <h1>Uplaod Images</h1>

      <div className="upload-photo-grid">
        {addedPhotos.map((photo) => (
          <UploadImageTile image={photo} user={authState.user} />
        ))}

        <div className="image-portal">
          <input type="file" accept="image/*" onChange={handleImageUpload} />
          <label htmlFor="file">Choose file</label>
        </div>
      </div>

      <button onClick={uploadImage} className="upload-btn">
        Upload
      </button>

      {err && (
        <div>
          <p>{err}</p>
        </div>
      )}
    </div>
  );
}

export default UploadImages;
