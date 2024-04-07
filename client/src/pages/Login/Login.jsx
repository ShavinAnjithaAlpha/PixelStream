import axios from "../../axios";
import React, { useState, useContext, useRef } from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../../contexts/auth.context";
import leafBackground from "../../assets/img/leafs.jpg";
import "./Login.css";

function Login() {
  const loginContainer = useRef(null);
  const navigate = useNavigate();
  const [loginError, setLoginError] = useState(false);

  const { setAuthState } = useContext(AuthContext);

  const initialValues = {
    email: "",
    password: "",
  };

  const validationSchema = Yup.object({
    email: Yup.string().email("Invalid email address").required("Required"),
    password: Yup.string().required("Required"),
  });

  const handleSubmit = (values) => {
    axios
      .post("/auth/login", values)
      .then((res) => {
        // save the access token in the local storage for house keeping
        localStorage.setItem("token", res.data.accessToken);
        localStorage.setItem("username", res.data.username);
        // save the user's access token in the session storage
        setAuthState({
          user: res.data.accessToken,
          username: res.data.username,
          status: true,
        });
        // redirect to the Home page with successfull login
        navigate("/");
      })
      .catch((err) => {
        setLoginError(true);
      });
  };

  return (
    <div className="login-container" ref={loginContainer}>
      <div className="form-col">
        <div className="title">
          <h1>Log In</h1>
        </div>
        <Formik
          initialValues={initialValues}
          validationSchema={validationSchema}
          onSubmit={handleSubmit}
        >
          <Form className="login-form">
            {loginError && <p className="login-error">Invalid credentials</p>}
            <div className="form-item">
              <Field type="email" id="email" name="email" placeholder="email" />
              <ErrorMessage
                name="email"
                component="div"
                className="error-message"
              />
            </div>
            <div className="form-item">
              <Field
                type="password"
                id="password"
                name="password"
                placeholder="password"
              />
              <ErrorMessage
                name="password"
                component="div"
                className="error-message"
              />
            </div>
            <button type="submit">Login</button>
          </Form>
        </Formik>
        <div className="register-box">
          <p>Don't have an account?</p>
          <p>
            <Link to="/signup">Sign Up</Link>
          </p>
        </div>
      </div>
      <div className="col">
        <img src={leafBackground} alt="leafs"></img>
        <div className="logo">
          <h1>
            <Link to="/">PhotoShav</Link>
          </h1>
        </div>
      </div>
    </div>
  );
}

export default Login;
