import React, { useEffect, useState, useContext } from "react";
import { Routes, Route, Link, useLocation } from "react-router-dom";
import Home from "./pages/Home";
import About from "./pages/About";
import Photo from "./pages/Photo";
import Login from "./pages/Login";
import UserProfile from "./pages/UserProfile";
import ProfileBadge from "./components/ProfileBadge";
import Registration from "./pages/Registration";
import "./Main.css";
import { AuthContext } from "./helpers/AuthContext";

function Main() {
  const location = useLocation();
  const { setAuthState, authState } = useContext(AuthContext);
  const user = {
    username: "shavin",
    photoUrl: "https://picsum.photos/200",
  };

  // logout function
  const logout = () => {
    sessionStorage.removeItem("token");
    setAuthState({ status: false });
    console.log("logout");
  };

  return (
    <div className="App">
      {location.pathname !== "/login" && location.pathname !== "/signup" && (
        <nav className="nav">
          <i className="logo">
            <Link to="/" className="logo">
              PhotoShave
            </Link>
          </i>
          <ul className="nav-links">
            <li className="nav-item">
              <Link to="/">Home</Link>
            </li>
            <li className="nav-item">
              <Link to="/about">About</Link>
            </li>
            <li className="nav-item">
              <Link to="/about">Contact</Link>
            </li>
            <li className="nav-item">
              <Link to="/signup" className="signup">
                Signup
              </Link>
            </li>

            {!authState.status ? (
              <i className="login">
                <Link to="/login">Login</Link>
              </i>
            ) : (
              <>
                <ProfileBadge user={user} />
                <i className="logout" onClick={logout}>
                  Logout
                </i>
              </>
            )}
          </ul>
        </nav>
      )}

      <Routes>
        <Route path="/" exact element={<Home />} />
        <Route path="/about" exact element={<About />} />
        <Route path="/photo/:id" exact element={<Photo />} />
        <Route path="/login" exact element={<Login />} />
        <Route path="/signup" exact element={<Registration />} />
        <Route path="/user/:username" exact element={<UserProfile />} />
      </Routes>
    </div>
  );
}

export default Main;