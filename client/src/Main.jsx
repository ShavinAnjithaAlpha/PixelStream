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
import { PopupContext } from "./contexts/popup.context";
import AddToCollectionBox from "./components/AddToCollectionBox/AddToCollectionBox";
import EditPhoto from "./components/EditPhoto/EditPhoto";

function Main() {
  const location = useLocation();
  const { authState } = useContext(AuthContext);
  const { popups } = useContext(PopupContext);

  return (
    <div className="App-Main">
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
        <Route
          path="/stat/:username"
          exact
          element={<UserProfile defaultTab="stat" />}
        />
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

      {popups.addToCollection && (
        <AddToCollectionBox
          show={popups.addToCollection}
          selectedPhoto={popups.selectedPhoto}
        />
      )}

      {popups.editPhoto && (
        <EditPhoto
          show={popups.editPhoto}
          selectedPhoto={popups.selectedPhoto}
        />
      )}
    </div>
  );
}

export default Main;
