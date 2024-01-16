import axios from "axios";
import React from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import "./Login.css";
import { Link } from "react-router-dom";

function Login() {
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
        console.log(res.data);
        console.log("User logged in successfully!");
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <div className="login-container">
      <div className="col">
        <img src="/assets/img/dark-forest.jpg" alt="dark-forest"></img>
      </div>
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
          <Link to="/signup">Don't have an account? Register here!</Link>
        </div>
      </div>
    </div>
  );
}

export default Login;
