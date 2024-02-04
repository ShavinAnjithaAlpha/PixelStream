import { useNavigate } from "react-router-dom";
import { SearchContext } from "../contexts/search.context";
import { useContext } from "react";

function TagSearch() {
  // create a navigate function using the useNavigate hook
  const navigate = useNavigate();
  // get the setSearchKeyword function from the SearchContext
  const { setSearchKeyword } = useContext(SearchContext);

  // create a function to handle the tag search
  const handleTagSearch = (tag) => {
    // first navigate to the search page
    navigate("/search");
    // then set the search keyword so it will trigger the search end points
    setSearchKeyword(tag);
  };

  return handleTagSearch();
}

export default TagSearch;
