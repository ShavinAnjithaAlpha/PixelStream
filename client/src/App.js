import React from "react";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import Home from "./pages/Home";
import About from "./pages/About";
import Photo from "./pages/Photo";
import Login from "./pages/Login";
import Registration from "./pages/Registration";
import "./App.css";

function App() {
  return (
    <div className="App">
      <Router>
        <nav className="navbar">
          <ul className="navbar__list">
            <li className="navbar__item">
              <Link to="/">Photos</Link>
            </li>
            <li className="navbar__item">
              <Link to="/about">About</Link>
            </li>
            <li className="navbar__item">
              <Link to="/login">Login</Link>
            </li>
            <li className="navbar__item">
              <Link to="/signup">Signup</Link>
            </li>
          </ul>
        </nav>

        <Routes>
          <Route path="/" exact element={<Home />} />
          <Route path="/about" exact element={<About />} />
          <Route path="/photo/:id" exact element={<Photo />} />
          <Route path="/login" exact element={<Login />} />
          <Route path="/signup" exact element={<Registration />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
