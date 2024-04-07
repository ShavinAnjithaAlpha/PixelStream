import React, { useState, useEffect } from "react";
import { BrowserRouter as Router } from "react-router-dom";
import { AuthContext } from "./contexts/auth.context";
import { SearchContextProvider } from "./contexts/search.context";
import { ReactLenis, useLenis } from "@studio-freight/react-lenis";
import Main from "./Main";
import "./App.css";

function App() {
  const [authState, setAuthState] = useState({ status: false });

  useEffect(() => {
    if (localStorage.getItem("token") && localStorage.getItem("username")) {
      setAuthState({
        user: localStorage.getItem("token"),
        username: localStorage.getItem("username"),
        status: true,
      });
    }
  }, []);

  return (
    <SearchContextProvider>
      <AuthContext.Provider value={{ authState, setAuthState }}>
        <Router>
          {/* <ReactLenis root> */}
          <Main />
          {/* </ReactLenis> */}
        </Router>
      </AuthContext.Provider>
    </SearchContextProvider>
  );
}

export default App;
