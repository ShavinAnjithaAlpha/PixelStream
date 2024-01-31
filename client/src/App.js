import React, { useState, useEffect } from "react";
import { BrowserRouter as Router } from "react-router-dom";
import Main from "./Main";
import "./App.css";
import { AuthContext } from "./helpers/AuthContext";
import { SearchContextProvider } from "./contexts/search.context";

function App() {
  const [authState, setAuthState] = useState({ status: false });

  useEffect(() => {
    console.log(localStorage.getItem("token"));
    if (localStorage.getItem("token")) {
      setAuthState({
        user: localStorage.getItem("token"),
        status: true,
      });
    }
  }, []);

  return (
    <SearchContextProvider>
      <AuthContext.Provider value={{ authState, setAuthState }}>
        <Router>
          <Main />
        </Router>
      </AuthContext.Provider>
    </SearchContextProvider>
  );
}

export default App;
