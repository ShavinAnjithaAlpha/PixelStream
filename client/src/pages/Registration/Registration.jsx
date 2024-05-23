import React, { useState } from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faArrowLeft,
  faArrowRight,
  faSpinner,
} from "@fortawesome/free-solid-svg-icons";
import defaultProfileIcon from "../../assets/img/default-profile-icon.png";
import fallBackImage from "../../assets/img/fallback.jpg";
import useSigninHandler from "../../hooks/useSigninHandler";
import "./Registration.css";

function Registration() {
  const {
    backgroundImage,
    profileImage,
    error,
    status,
    setProfile,
    getImageUrl,
    handleSubmit,
  } = useSigninHandler();
  const [formState, setFormState] = useState(0);

  // const calculateStrength = (password) => {
  //   let strength = 0;
  //   if (password.length > 5) strength++;
  //   if (password.match(/[a-z]+/)) strength++;
  //   if (password.match(/[A-Z]+/)) strength++;
  //   if (password.match(/[0-9]+/)) strength++;
  //   if (password.match(/[$@#&!]+/)) strength++;
  //   return strength;
  // };

  // const strength = calculateStrength(password);

  const initialValues = {
    firstname: "",
    lastname: "",
    email: "",
    username: "",
    password: "",
    confirmPassword: "",
    location: "",
    bio: "",
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
    Bio: Yup.string().max(512).optional().nullable(),
    personalSite: Yup.string().max(255).optional().nullable(),
  });

  return (
    <div
      className="register-page"
      style={{
        backgroundImage: `url('${
          backgroundImage ? backgroundImage : fallBackImage
        }')`,
      }}
    >
      <div className="register-page-wrapper">
        <div className="form-box">
          <Formik
            initialValues={initialValues}
            onSubmit={handleSubmit}
            validationSchema={validationSchema}
          >
            {({ isSubmitting }) => (
              <Form className="registration-form">
                <div className="form-container">
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
                        Please provide your personal information to complete
                        your registration
                      </p>

                      <div className="profile-img">
                        <input
                          type="file"
                          id="profile"
                          name="profile"
                          accept="image/*"
                          onChange={setProfile}
                        />
                        <img
                          src={
                            profileImage
                              ? getImageUrl(profileImage)
                              : defaultProfileIcon
                          }
                          alt="profile"
                          width="150"
                        />
                      </div>

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
                        Please provide your password to complete your
                        registration
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
                          // value={password}
                          // onChange={updatePassword}
                        />
                        <ErrorMessage
                          name="password"
                          component="div"
                          className="error-message"
                        />
                      </div>

                      {/* <div className="password-indicator">
                        Strength {"    "}
                        <span>{"🟢".repeat(strength)}</span>
                        <span>{"⚪".repeat(5 - strength)}</span>
                      </div> */}

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
                          type="submit"
                          id="register"
                          disabled={isSubmitting}
                        >
                          Register{"    "}
                          {isSubmitting && (
                            <FontAwesomeIcon icon={faSpinner} spin={true} />
                          )}
                        </button>
                      </div>
                    </div>
                  )}
                </div>
              </Form>
            )}
          </Formik>
          {status && <div className="success-msg">{status}</div>}
          {error && <p className="error-msg">{error}</p>}
        </div>

        <div className="image-box">
          <img
            src={backgroundImage ? backgroundImage : fallBackImage}
            alt="background"
            loading="lazy"
          />
          <h1>
            <span>Sign in with</span> <br /> PixelStream
          </h1>
        </div>
      </div>
    </div>
  );
}

export default Registration;
