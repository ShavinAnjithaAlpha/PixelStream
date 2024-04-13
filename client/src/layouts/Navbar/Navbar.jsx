import React, { useContext } from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";
import { AuthContext } from "../../contexts/auth.context";
import Popup from "reactjs-popup";
import SearchBar from "../../components/SearchBar";
import ProfileBadge from "../../components/ProfileBadge";
import { SearchContext } from "../../contexts/search.context";
import "./NavBar.css";

const Menu = styled.div`
  background-color: #111111dd;
  backdrop-filter: blur(10px);
  transition: all 0.3s ease;
  padding: 0;
  border: 1px solid #ffffff33;
  border-radius: 10px;
`;

const MenuItem = styled.div`
  background: none;
  padding: 10px;
  border-bottom: 0px solid #f1f1f1;
  text-align: left;
  cursor: pointer;
  transition: all 0.3s ease;
  font-size: 0.9rem;
  color: white;

  &:hover {
    background-color: #ffffff33;
  }

  &:nth-child(1) {
    border-radius: 10px 10px 0 0;
  }

  & > a {
    color: white;
  }
`;

const LogOutMenuItem = styled.div`
  padding: 10px;
  text-align: left;
  cursor: pointer;
  transition: all 0.3s ease;
  font-size: 0.9rem;
  color: red;
  border-top: 1px solid #ffffff33;
  border-radius: 0 0 10px 10px;

  &:hover {
    background-color: #ff0000aa;
    color: black;
  }

  & > a {
    color: red;
  }

  &:hover > a {
    color: red;
  }
`;

function Navbar() {
  const { setAuthState, authState } = useContext(AuthContext);
  const { setSearchKeyword } = useContext(SearchContext);

  // logout function
  const logout = () => {
    localStorage.removeItem("token");
    setAuthState({ status: false });
  };

  return (
    <nav className="nav">
      <div className="logo-search">
        <i className="logo">
          <Link to="/" className="logo">
            PS
          </Link>
        </i>

        <SearchBar setSearchKeyword={setSearchKeyword} />
      </div>
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
            <Popup
              trigger={
                <button
                  style={{
                    background: "none",
                    border: "none",
                    outline: "none",
                  }}
                >
                  <ProfileBadge user={authState.user} />
                </button>
              }
              position={["bottom center", "right center"]}
              contentStyle={{ background: "none", border: "none" }}
            >
              <Menu>
                <MenuItem>
                  <Link to={`/user/${authState.username}`}>Profile</Link>
                </MenuItem>
                <MenuItem>
                  <Link to="/account">Settings</Link>
                </MenuItem>
                <MenuItem>
                  <Link to="/upload">Upload Photo</Link>
                </MenuItem>
                <MenuItem>
                  <Link to={`/stat/${authState.username}`}>Stat</Link>
                </MenuItem>
                <LogOutMenuItem onClick={logout}>
                  Logout @{authState.username}
                </LogOutMenuItem>
              </Menu>
            </Popup>
          </>
        )}
      </ul>
    </nav>
  );
}

export default Navbar;
