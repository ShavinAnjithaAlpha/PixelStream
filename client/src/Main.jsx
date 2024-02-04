import { Routes, Route, useLocation } from "react-router-dom";
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
} from "./pages";
import { Navbar, Footer } from "./layouts";
import "./Main.css";

function Main() {
  const location = useLocation();

  return (
    <div className="App">
      {location.pathname !== "/login" &&
        location.pathname !== "/signup" &&
        location.pathname !== "/account" && <Navbar />}

      <Routes>
        <Route path="/" exact element={<Home />} />
        <Route path="/about" exact element={<About />} />
        <Route path="/photo/:id" exact element={<Photo />} />
        <Route path="/login" exact element={<Login />} />
        <Route path="/signup" exact element={<Registration />} />
        <Route path="/user/:username" exact element={<UserProfile />} />
        <Route path="/collection/:id" exact element={<Collection />} />
        <Route path="/account" exact element={<AccountSettings />} />

        <Route path="/search" exact element={<Search />} />
      </Routes>

      {location.pathname !== "/login" &&
        location.pathname !== "/signup" &&
        location.pathname !== "/account" && <Footer />}
    </div>
  );
}

export default Main;
