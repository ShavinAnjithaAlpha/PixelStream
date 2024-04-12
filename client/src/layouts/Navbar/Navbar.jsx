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
  background-color: white;
  transition: all 0.3s ease;
  padding: 0;
`;

const MenuItem = styled.div`
  padding: 10px;
  border-bottom: 0px solid #f1f1f1;
  text-align: left;
  cursor: pointer;
  transition: all 0.3s ease;
  font-size: 0.9rem;
  color: black;

  &:hover {
    background-color: #dddddd;
  }

  & > a {
    color: black;
  }
`;

const LogOutMenuItem = styled.div`
  padding: 10px;
  border-bottom: 1px solid #f1f1f1;
  text-align: left;
  cursor: pointer;
  transition: all 0.3s ease;
  font-size: 0.9rem;
  color: black;
  border-top: 1px solid #f1f1f1;

  &:hover {
    background-color: red;
  }

  & > a {
    color: black;
  }

  &:hover > a {
    color: white;
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
