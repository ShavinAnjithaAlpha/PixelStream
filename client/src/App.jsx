import React, { useState, useEffect } from "react";
import { HashRouter as Router } from "react-router-dom";
import { AuthContext } from "./contexts/auth.context";
import { SearchContextProvider } from "./contexts/search.context";
import { PopupContextProvider } from "./contexts/popup.context";
import { jwtDecode } from "jwt-decode";
// import { ReactLenis, useLenis } from "@studio-freight/react-lenis";
import Main from "./Main";
import "./App.css";

function App() {
  const [authState, setAuthState] = useState({ status: false });

  useEffect(() => {
    const token = localStorage.getItem("token");
    const username = localStorage.getItem("username");
    const userId = localStorage.getItem("userId");

    if (token && username) {
      const decodedToken = jwtDecode(token);
      const currentTime = Date.now() / 1000;

      if (decodedToken.exp < currentTime) {
        // delete the token and username from the local storage
        localStorage.removeItem("token");
        localStorage.removeItem("username");
        localStorage.removeToken("userId");
        // set the auth state to false
        setAuthState({
          user: null,
          username: null,
          userId: null,
          status: false,
        });
      } else {
        setAuthState({
          user: token,
          username: username,
          userId: userId,
          status: true,
        });
      }
    }
  }, []);

  return (
    <SearchContextProvider>
      <PopupContextProvider>
        <AuthContext.Provider value={{ authState, setAuthState }}>
          <Router>
            {/* <ReactLenis root> */}
            <Main />
            {/* </ReactLenis> */}
          </Router>
        </AuthContext.Provider>
      </PopupContextProvider>
    </SearchContextProvider>
  );
}

export default App;
