import React, { useState, useEffect } from "react";
import { BrowserRouter as Router } from "react-router-dom";
import Main from "./Main";
import "./App.css";
import { AuthContext } from "./helpers/AuthContext";

function App() {
  const [authState, setAuthState] = useState({ status: false });

  useEffect(() => {
    if (sessionStorage.getItem("token")) {
      setAuthState({
        user: sessionStorage.getItem("token"),
        status: true,
      });
    }
  }, []);

  return (
    <AuthContext.Provider value={{ authState, setAuthState }}>
      <Router>
        <Main />
      </Router>
    </AuthContext.Provider>
  );
}

export default App;
