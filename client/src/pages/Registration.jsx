import React from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import axios from "axios";
import "./Registration.css";

function Registration() {
  const initialValues = {
    firstName: "",
    lastName: "",
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
    firstName: Yup.string()
      .min(3, "First name must be at least 3 characters long")
      .max(255, "First name must be at most 255 characters long")
      .required("First name is required"),
    lastName: Yup.string()
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
    location: Yup.string().max(255),
    bio: Yup.string().max(512).optional(),
    profile: Yup.string().optional(),
    personalsite: Yup.string().max(255).optional(),
  });

  const cleanData = (data) => {
    if (data.location === "") data.location = null;
    if (data.bio === "") data.bio = null;
    if (data.profile === "") data.profile = null;
    if (data.personalsite === "") data.personalsite = null;
  };

  const handleSubmit = (values) => {
    // Handle form submission logic here
    // first clean the form data -- remove the empty string values
    cleanData(values);
    // now make the api request to register the user
    console.log(values);
    axios
      .post("http://localhost:3000/api/auth/register", values)
      .then((res) => {
        console.log(res.data);
      })
      .catch((err) => console.log(err));
  };

  return (
    <div>
      <h2>Registration Form</h2>
      <Formik
        initialValues={initialValues}
        onSubmit={handleSubmit}
        validationSchema={validationSchema}
      >
        <Form className="registration-form">
          <div className="form-container">
            <div className="column">
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
                <label htmlFor="firstName">First Name:</label>
                <Field type="text" id="firstName" name="firstName" />
                <ErrorMessage
                  name="firstName"
                  component="div"
                  className="error-message"
                />
              </div>
              <div className="form-item">
                <label htmlFor="lastName">Last Name:</label>
                <Field type="text" id="lastName" name="lastName" />
                <ErrorMessage
                  name="lastName"
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

              {/* <div className="form-item">
                <label htmlFor="profile">Profile Image:</label>
                <Field type="text" id="profile" name="profile" />
                <ErrorMessage
                  name="profile"
                  component="div"
                  className="error-message"
                />
              </div> */}
            </div>
          </div>

          <button type="submit">Register</button>
        </Form>
      </Formik>
    </div>
  );
}

export default Registration;
