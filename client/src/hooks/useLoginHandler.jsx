import { useState, useEffect, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../contexts/auth.context";
import axios from "../axios";

function useLoginHandler() {
  const navigate = useNavigate();
  const [backgroundImage, setBackgroundImage] = useState({});
  const [loginError, setLoginError] = useState(false);
  const [loading, setLoading] = useState(false);

  const { setAuthState } = useContext(AuthContext);

  const handleSubmit = (values) => {
    setLoading(true); // set the loading state to true
    axios
      .post("/auth/login", values)
      .then((res) => {
        // save the access token in the local storage for house keeping
        localStorage.setItem("token", res.data.accessToken);
        localStorage.setItem("username", res.data.username);
        localStorage.setItem("userId", res.data.userId);
        // save the user's access token in the session storage
        setAuthState({
          user: res.data.accessToken,
          username: res.data.username,
          uderId: res.data.userId,
          status: true,
        });
        // redirect to the Home page with successfull login
        navigate("/");
      })
      .catch((err) => {
        setLoading(false);
        setLoginError(err.response.data.error);

        const timerId = setTimeout(() => {
          setLoginError(false);
          clearTimeout(timerId);
        }, 3000);
      });
  };

  useEffect(() => {
    // get some random photo for set as login page background image and cover photo
    axios
      .get(`/photos/random?limit=1`)
      .then((res) => {
        setBackgroundImage(res.data.photos[0].photoUrl);
      })
      .catch((err) => {});
  }, []);

  return { backgroundImage, loginError, loading, handleSubmit };
}

export default useLoginHandler;
