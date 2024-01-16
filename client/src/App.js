import React from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Link,
  useLocation,
} from "react-router-dom";
import Home from "./pages/Home";
import About from "./pages/About";
import Photo from "./pages/Photo";
import Login from "./pages/Login";
import Registration from "./pages/Registration";
import "./App.css";
import { useEffect } from "react";

function App() {
  // useEffect(() => {
  //   // Your script here. For example:
  //   const script = document.createElement("script");
  //   script.src = "./scripts/app.js";
  //   script.async = true;
  //   document.body.appendChild(script);

  //   // Remember to remove the script on component unmount
  //   return () => {
  //     document.body.removeChild(script);
  //   };
  // });

  // let location = useLocation();

  return (
    <Router>
      <div className="App">
        {/* {location.pathname !== "/login" && location.pathname !== "/signup" && ( */}
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

            <i className="login">
              <Link to="/login">Login</Link>
            </i>
          </ul>
        </nav>
        {/* )} */}

        <Routes>
          <Route path="/" exact element={<Home />} />
          <Route path="/about" exact element={<About />} />
          <Route path="/photo/:id" exact element={<Photo />} />
          <Route path="/login" exact element={<Login />} />
          <Route path="/signup" exact element={<Registration />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
