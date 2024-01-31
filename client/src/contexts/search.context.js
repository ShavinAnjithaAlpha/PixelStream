import { useState, createContext } from "react";

// create the search contect that maintaint the search keyword throughout the app
export const SearchContext = createContext(null);

// function to provide search contetx provider wrapper
export function SearchContextProvider({ children }) {
  const [searchKeyword, setSearchKeyword] = useState("");

  return <SearchContext.Provider>{children}</SearchContext.Provider>;
}
