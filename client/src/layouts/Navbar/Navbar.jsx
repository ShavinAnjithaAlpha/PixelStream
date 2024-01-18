import React from "react";
import { Link } from "react-router-dom";
import SearchBar from "../../components/SearchBar";
import ProfileBadge from "../../components/ProfileBadge";
import { useContext } from "react";
import { AuthContext } from "../../helpers/AuthContext";

function Navbar() {
  const { setAuthState, authState } = useContext(AuthContext);

  // logout function
  const logout = () => {
    localStorage.removeItem("token");
    setAuthState({ status: false });
  };

  return (
    <nav className="nav">
      <i className="logo">
        <Link to="/" className="logo">
          PhotoShav
        </Link>
      </i>

      <SearchBar />
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
            <ProfileBadge user={authState.user} />
            <i className="logout" onClick={logout}>
              Logout
            </i>
          </>
        )}
      </ul>
    </nav>
  );
}

export default Navbar;
