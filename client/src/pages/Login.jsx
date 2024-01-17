import axios from "axios";
import React, { useEffect, useState } from "react";
import { useRef } from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import "./Login.css";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";

function Login() {
  const loginContainer = useRef(null);
  const navigate = useNavigate();
  const [loginError, setLoginError] = useState(false);

  useEffect(() => {
    // loginContainer.current.style.backgroundImage = `url("/assets/img/snow-forest.jpg")`;
    loginContainer.current.style.backgroundSize = "cover";
    loginContainer.current.style.backdropFilter = "blur(5px)";
  });

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
      .post("http://localhost:3000/api/auth/login", values)
      .then((res) => {
        console.log("User logged in successfully!");
        // save the user's access token in the session storage
        sessionStorage.setItem("token", res.data.accessToken);
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
              {/* <label htmlFor="email">Email</label> */}
              <Field type="email" id="email" name="email" placeholder="email" />
              <ErrorMessage
                name="email"
                component="div"
                className="error-message"
              />
            </div>
            <div className="form-item">
              {/* <label htmlFor="password">Password</label> */}
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
        <img src="/assets/img/leafs.jpg" alt="dark-forest"></img>
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
