import { Routes, Route, useLocation } from "react-router-dom";
import { useContext } from "react";
import {
  Home,
  About,
  Photo,
  Login,
  Registration,
  UserProfile,
  Collection,
  Search,
  AccountSettings,
  UploadImages,
  Collections,
} from "./pages";
import { AuthContext } from "./contexts/auth.context";
import { Navbar, Footer } from "./layouts";
import "./Main.css";

function Main() {
  const location = useLocation();
  const { authState } = useContext(AuthContext);

  return (
    <div className="App">
      {location.pathname !== "/login" &&
        location.pathname !== "/signup" &&
        location.pathname !== "/account" &&
        location.pathname !== "/upload" && <Navbar />}

      <Routes>
        <Route path="/" exact element={<Home />} />
        <Route path="/collections" exact element={<Collections />} />
        <Route path="/about" exact element={<About />} />
        <Route path="/photo/:id" exact element={<Photo />} />
        <Route path="/login" exact element={<Login />} />
        <Route path="/signup" exact element={<Registration />} />
        <Route path="/user/:username" exact element={<UserProfile />} />
        <Route path="/collection/:id" exact element={<Collection />} />
        <Route path="/account" exact element={<AccountSettings />} />
        {authState.status && (
          <Route path="/upload" exact element={<UploadImages />} />
        )}

        <Route path="/search" exact element={<Search />} />
      </Routes>

      {location.pathname !== "/login" &&
        location.pathname !== "/signup" &&
        location.pathname !== "/account" &&
        location.pathname !== "/upload" && <Footer />}
    </div>
  );
}

export default Main;
