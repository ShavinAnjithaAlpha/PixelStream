import { Routes, Route, useLocation } from "react-router-dom";
import {
  Home,
  About,
  Photo,
  Login,
  Registration,
  UserProfile,
  Collection,
} from "./pages";
import { Navbar } from "./layouts";
import "./Main.css";

function Main() {
  const location = useLocation();

  return (
    <div className="App">
      {location.pathname !== "/login" && location.pathname !== "/signup" && (
        <Navbar />
      )}

      <Routes>
        <Route path="/" exact element={<Home />} />
        <Route path="/about" exact element={<About />} />
        <Route path="/photo/:id" exact element={<Photo />} />
        <Route path="/login" exact element={<Login />} />
        <Route path="/signup" exact element={<Registration />} />
        <Route path="/user/:username" exact element={<UserProfile />} />
        <Route path="/collection/:id" exact element={<Collection />} />
      </Routes>
    </div>
  );
}

export default Main;
