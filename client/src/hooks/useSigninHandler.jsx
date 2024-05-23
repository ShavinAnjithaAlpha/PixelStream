import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "../axios";

function useSigninHandler() {
  const navigation = useNavigate();
  const [backgroundImage, setBackgroundImage] = useState({});
  const [error, setError] = useState("");
  const [status, setStatus] = useState("");
  const [profileImage, setProfileImage] = useState(null);

  const getImageUrl = (data) => {
    return URL.createObjectURL(data);
  };

  const setProfile = (e) => {
    if (!e.target.files[0]) return;

    if (e.target.files[0].size > 1024 * 1024 * 2) {
      alert("File size must be less than 2MB");
      return;
    }

    setProfileImage(e.target.files[0]);
  };

  const cleanData = (data) => {
    if (data.location === "") delete data.location;
    if (data.bio === "") delete data.bio;
    if (data.personalsite === "") delete data.personalsite;
    delete data.confirmPassword;
    return data;
  };

  const handleSubmit = (values) => {
    // Handle form submission logic here
    // cleaned the data before submit to the server endpoint
    const cleanedData = cleanData(values);
    // now make the api request to register the user
    // create a form data payload to send the user data
    const formData = new FormData();
    for (let key in cleanedData) {
      formData.append(key, cleanedData[key]);
    }
    // append the profile image to the form data
    if (profileImage) {
      formData.append("file", profileImage);
    }

    axios
      .post("/auth/register", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      })
      .then((res) => {
        setStatus(
          "Registration successful, you will be redirected to login page"
        );
        // redirect to the login page
        setTimeout(() => {
          navigation("/login");
        }, 2000);
      })
      .catch((err) => setError(err.response.data.error));
  };

  useEffect(() => {
    axios
      .get(`/photos/random?limit=1`)
      .then((res) => {
        setBackgroundImage(res.data.photos[0].photoUrl);
      })
      .catch((err) => console.log(err));
  }, []);

  return {
    backgroundImage,
    profileImage,
    error,
    status,
    setProfile,
    getImageUrl,
    handleSubmit,
  };
}

export default useSigninHandler;
