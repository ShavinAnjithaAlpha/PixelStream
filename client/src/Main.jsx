import React, { useEffect, useState } from "react";
import { Routes, Route, Link, useLocation } from "react-router-dom";
import Home from "./pages/Home";
import About from "./pages/About";
import Photo from "./pages/Photo";
import Login from "./pages/Login";
import UserProfile from "./pages/UserProfile";
import ProfileBadge from "./components/ProfileBadge";
import Registration from "./pages/Registration";
import "./Main.css";

function Main() {
  const location = useLocation();
  const [loggedIn, setLoggedIn] = useState(false);
  const user = {
    username: "shavin",
    photoUrl: "https://picsum.photos/200",
  };

  useEffect(() => {
    if (sessionStorage.getItem("token")) {
      setLoggedIn(true);
    }
  }, [location.pathname, setLoggedIn]);

  // logout function
  const logout = () => {
    sessionStorage.removeItem("token");
    setLoggedIn(false);
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

            {!loggedIn ? (
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
