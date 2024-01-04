import React from "react";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import Home from "./pages/Home";
import About from "./pages/About";
import Photo from "./pages/Photo";
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
          </ul>
        </nav>

        <Routes>
          <Route path="/" exact element={<Home />} />
          <Route path="/about" exact element={<About />} />
          <Route path="/photo/:id" exact element={<Photo />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
