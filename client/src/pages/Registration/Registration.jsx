import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import axios from "../../axios";
import "./Registration.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faArrowLeft,
  faArrowRight,
  faBackward,
} from "@fortawesome/free-solid-svg-icons";

function Registration() {
  const navigation = useNavigate();
  const [backgroundImage, setBackgroundImage] = useState({});
  const [error, setError] = useState(false);
  const [formState, setFormState] = useState(0);

  const initialValues = {
    firstname: "",
    lastname: "",
    email: "",
    username: "",
    password: "",
    confirmPassword: "",
    location: "",
    bio: "",
    profile: "",
    personalsite: "",
  };

  const validationSchema = Yup.object().shape({
    firstname: Yup.string()
      .min(3, "First name must be at least 3 characters long")
      .max(255, "First name must be at most 255 characters long")
      .required("First name is required"),
    lastname: Yup.string()
      .min(3, "Last name must be at least 3 characters long")
      .max(255, "Last name must be at most 255 characters long")
      .required("Last name is required"),
    email: Yup.string()
      .email("Invalid email address")
      .required("Email is required"),
    username: Yup.string()
      .min(3, "Username must be at least 3 characters long")
      .max(255, "Username must be at most 255 characters long")
      .required("Username is required"),
    password: Yup.string()
      .min(6, "Password must be at least 6 characters long")
      .required("Password is required"),
    confirmPassword: Yup.string()
      .oneOf([Yup.ref("password"), null], "Passwords must match")
      .required("Confirm Password is required"),
    location: Yup.string().max(255).optional().nullable(),
    bio: Yup.string().max(512).optional().nullable(),
    profile: Yup.string().optional().nullable(),
    personalsite: Yup.string().max(255).optional().nullable(),
  });

  const cleanData = (data) => {
    if (data.location === "") delete data.location;
    if (data.bio === "") delete data.bio;
    if (data.profile === "") delete data.profile;
    if (data.personalsite === "") delete data.personalsite;
    delete data.confirmPassword;
    return data;
  };

  const handleSubmit = (values) => {
    // Handle form submission logic here
    // cleaned the data before submit to the server endpoint
    const cleanedData = cleanData(values);
    // now make the api request to register the user
    axios
      .post("/auth/register", cleanedData, {
        headers: {
          "Content-Type": "application/json",
        },
      })
      .then((res) => {
        console.log(res.data);
        // redirect to the login page
        navigation("/login");
      })
      .catch((err) => setError(true));
  };

  const getRandomId = () => {
    return Math.floor(Math.random() * 100) + 1;
  };

  useEffect(() => {
    axios
      .get(`/photos?page=${getRandomId()}&limit=1`)
      .then((res) => {
        setBackgroundImage(res.data[0]);
      })
      .catch((err) => console.log(err));
  }, []);

  return (
    <div
      className="register-page"
      style={{
        backgroundImage: `url('${
          backgroundImage && backgroundImage.resizedPhotoUrl
            ? backgroundImage.resizedPhotoUrl
            : ""
        }')`,
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
    >
      <div className="register-page-wrapper">
        <h2>Registration</h2>
        <div className="form-box">
          {error && <p className="error-message">Invalid credentials</p>}
          <Formik
            initialValues={initialValues}
            onSubmit={handleSubmit}
            validationSchema={validationSchema}
          >
            <Form className="registration-form">
              <div className="form-container">
                {/* <div className="column">
                  <div className="form-item">
                    <label htmlFor="username">Username:</label>
                    <Field type="text" id="username" name="username" />
                    <ErrorMessage
                      name="username"
                      component="div"
                      className="error-message"
                    />
                  </div>

                  <div className="form-item">
                    <label htmlFor="email">Email:</label>
                    <Field type="email" id="email" name="email" />
                    <ErrorMessage
                      name="email"
                      component="div"
                      className="error-message"
                    />
                  </div>

                  <div className="form-item">
                    <label htmlFor="password">Password:</label>
                    <Field type="password" id="password" name="password" />
                    <ErrorMessage
                      name="password"
                      component="div"
                      className="error-message"
                    />
                  </div>

                  <div className="form-item">
                    <label htmlFor="confirmPassword">Confirm Password:</label>
                    <Field
                      type="password"
                      id="confirmPassword"
                      name="confirmPassword"
                    />
                    <ErrorMessage
                      name="confirmPassword"
                      component="div"
                      className="error-message"
                    />
                  </div>
                </div>

                <div className="column">
                  <div className="form-item">
                    <label htmlFor="firstname">First Name:</label>
                    <Field type="text" id="firstname" name="firstname" />
                    <ErrorMessage
                      name="firstname"
                      component="div"
                      className="error-message"
                    />
                  </div>
                  <div className="form-item">
                    <label htmlFor="lastname">Last Name:</label>
                    <Field type="text" id="lastname" name="lastname" />
                    <ErrorMessage
                      name="lastname"
                      component="div"
                      className="error-message"
                    />
                  </div>
                  <div className="form-item">
                    <label htmlFor="location">Address:</label>
                    <Field type="text" id="location" name="location" />
                    <ErrorMessage
                      name="location"
                      component="div"
                      className="error-message"
                    />
                  </div>

                  <div className="form-item">
                    <label htmlFor="bio">Bio:</label>
                    <Field type="text" id="bio" name="bio" />
                    <ErrorMessage
                      name="bio"
                      component="div"
                      className="error-message"
                    />
                  </div>

                  <div className="form-item">
                    <label htmlFor="personalsite">Personal Site:</label>
                    <Field type="text" id="personalsite" name="personalsite" />
                    <ErrorMessage
                      name="personalsite"
                      component="div"
                      className="error-message"
                    />
                  </div>
                </div> */}

                {formState === 0 && (
                  <div className="column">
                    <h2>Username and email</h2>
                    <p>
                      Please provide your username and email to complete your
                      registration
                    </p>
                    <div className="form-item">
                      <label htmlFor="username">
                        Username <sup>*</sup>
                      </label>
                      <Field
                        type="text"
                        id="username"
                        name="username"
                        placeholder="Username"
                      />
                      <ErrorMessage
                        name="username"
                        component="div"
                        className="error-message"
                      />
                    </div>

                    <div className="form-item">
                      <label htmlFor="email">
                        Email <sup>*</sup>
                      </label>
                      <Field
                        type="email"
                        id="email"
                        name="email"
                        placeholder="Email"
                      />
                      <ErrorMessage
                        name="email"
                        component="div"
                        className="error-message"
                      />
                    </div>

                    <div className="btn-bar">
                      <button type="button" onClick={() => setFormState(1)}>
                        <FontAwesomeIcon icon={faArrowRight} /> {"   "}Next
                      </button>
                    </div>
                  </div>
                )}

                {formState === 1 && (
                  <div className="column">
                    <h2>Personal Informations</h2>
                    <p>
                      Please provide your personal information to complete your
                      registration
                    </p>
                    <div className="form-item">
                      <label htmlFor="firstname">
                        First Name <sup>*</sup>
                      </label>
                      <Field
                        type="text"
                        id="firstname"
                        name="firstname"
                        placeholder="Your firstname"
                      />
                      <ErrorMessage
                        name="firstname"
                        component="div"
                        className="error-message"
                      />
                    </div>
                    <div className="form-item">
                      <label htmlFor="lastname">
                        Last Name <sup>*</sup>
                      </label>
                      <Field
                        type="text"
                        id="lastname"
                        name="lastname"
                        placeholder="Your lastname"
                      />
                      <ErrorMessage
                        name="lastname"
                        component="div"
                        className="error-message"
                      />
                    </div>

                    <div className="btn-bar">
                      <button type="button" onClick={() => setFormState(0)}>
                        <FontAwesomeIcon icon={faArrowLeft} /> {"   "}
                        Back
                      </button>
                      <button type="button" onClick={() => setFormState(2)}>
                        <FontAwesomeIcon icon={faArrowRight} /> {"   "}
                        Next
                      </button>
                    </div>
                  </div>
                )}

                {formState === 2 && (
                  <div className="column">
                    <h2>Profile Information</h2>
                    <p>
                      Please provide your profile information to complete your
                      registration (Optional)
                    </p>
                    <div className="form-item">
                      <label htmlFor="location">Address</label>
                      <Field
                        type="text"
                        id="location"
                        name="location"
                        placeholder="Your location / address"
                      />
                      <ErrorMessage
                        name="location"
                        component="div"
                        className="error-message"
                      />
                    </div>

                    <div className="form-item">
                      <label htmlFor="bio">Bio</label>
                      <Field
                        as="textarea"
                        id="bio"
                        name="bio"
                        rows="6"
                        placeholder="Your Bio (Optional)"
                      />
                      <ErrorMessage
                        name="bio"
                        component="div"
                        className="error-message"
                      />
                    </div>

                    <div className="btn-bar">
                      <button type="button" onClick={() => setFormState(1)}>
                        <FontAwesomeIcon icon={faArrowLeft} /> {"   "}
                        Back
                      </button>
                      <button type="button" onClick={() => setFormState(3)}>
                        <FontAwesomeIcon icon={faArrowRight} /> {"   "}
                        Next
                      </button>
                    </div>
                  </div>
                )}

                {formState === 3 && (
                  <div className="column">
                    <h2>Account Passwords</h2>
                    <p>
                      Please provide your password to complete your registration
                    </p>
                    <div className="form-item">
                      <label htmlFor="password">
                        Password<sup>*</sup>
                      </label>
                      <Field
                        type="password"
                        id="password"
                        name="password"
                        placeholder="Password"
                      />
                      <ErrorMessage
                        name="password"
                        component="div"
                        className="error-message"
                      />
                    </div>

                    <div className="form-item">
                      <label htmlFor="confirmPassword">
                        Confirm Password <sup>*</sup>
                      </label>
                      <Field
                        type="password"
                        id="confirmPassword"
                        name="confirmPassword"
                        placeholder="Confirm Password"
                      />
                      <ErrorMessage
                        name="confirmPassword"
                        component="div"
                        className="error-message"
                      />
                    </div>

                    <div className="btn-bar">
                      <button onClick={() => setFormState(2)}>
                        <FontAwesomeIcon icon={faArrowLeft} /> {"   "} Back
                      </button>
                      <button
                        type="button"
                        id="register"
                        onClick={() => setFormState(3)}
                      >
                        Register{" "}
                      </button>
                    </div>
                  </div>
                )}
              </div>
            </Form>
          </Formik>
        </div>

        <div className="image-box">
          <img
            src={backgroundImage ? backgroundImage.photoUrl : ""}
            alt="background"
            loading="lazy"
          />
          <h1>
            <span>Sign in with</span> <br /> PhotoStock <br />
            <span>Today!</span>
          </h1>
        </div>
      </div>
    </div>
  );
}

export default Registration;
