import { useState, createContext } from "react";

const initialState = {
  addToCollection: false,
};

export const PopupContext = createContext(null);

export function PopupContextProvider({ children }) {
  const [popups, setPopups] = useState(initialState);

  return (
    <PopupContext.Provider value={{ popups, setPopups }}>
      {children}
    </PopupContext.Provider>
  );
}
