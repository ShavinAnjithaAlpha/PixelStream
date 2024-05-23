import React from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSpinner } from "@fortawesome/free-solid-svg-icons";
import fallBackImage from "../../assets/img/fallback.jpg";
import useLoginHandler from "../../hooks/useLoginHandler";
import "./Login.css";

function Login() {
  const { backgroundImage, loginError, loading, handleSubmit } =
    useLoginHandler();

  const initialValues = {
    email: "",
    password: "",
  };

  const validationSchema = Yup.object({
    email: Yup.string().email("Invalid email address").required("Required"),
    password: Yup.string().required("Required"),
  });

  return (
    <div
      className="login-container"
      style={{
        backgroundImage: `url('${
          backgroundImage ? backgroundImage : fallBackImage
        }')`,
      }}
    >
      <div className="login-wrapper">
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
              {loginError && <p className="login-error">{loginError}</p>}
              <div className="form-item">
                <Field
                  type="email"
                  id="email"
                  name="email"
                  placeholder="email"
                />
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
              <button type="submit">
                Login{"    "}
                {loading && <FontAwesomeIcon icon={faSpinner} spin={true} />}
              </button>
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
          <img
            src={backgroundImage ? backgroundImage : fallBackImage}
            alt="leafs"
            loading="lazy"
          ></img>
          <div className="logo">
            <h1>
              <Link to="/">PixelStream</Link>
            </h1>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Login;
