import { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "../axios";
import { SearchContext } from "../contexts/search.context";
import defaultImage from "../assets/img/fallback.jpg";

const PAGE_LIMIT = 18;

function useGetPhotos() {
  const navigate = useNavigate();
  const [photos, setPhotos] = useState([]);
  const [status, setStatus] = useState(false);
  const [randomPhoto, setRandomPhoto] = useState(null);
  const { setSearchKeyword } = useContext(SearchContext);

  useEffect(() => {
    setStatus(false);
    // load the loclal storage data for paging the photos
    let page = 1;
    if (localStorage.getItem("page-photo")) {
      page = parseInt(localStorage.getItem("page-photo"));
    }

    axios
      .get(`/photos?limit=${PAGE_LIMIT}&page=${page}`)
      .then((res) => {
        setPhotos(res.data);
        setStatus(true);
      })
      .catch((err) => {
        console.log(err);
        setStatus(true);
      });

    // get the random photo to be included in the home page
    axios
      .get("/photos/random?count=1")
      .then((res) => {
        setRandomPhoto(res.data.photos[0].resizedPhotoUrl);
      })
      .catch((e) => {
        //  set the default image if the random photo is not available
        setRandomPhoto(defaultImage);
      });
  }, []);

  const handlePageChange = (page) => {
    axios
      .get(`/photos?limit=18&page=${page}`)
      .then((res) => {
        setPhotos(res.data);
        // save the page to the local storage
        localStorage.setItem("page-photo", page);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const handleSearch = (e) => {
    if (e.key === "Enter") {
      // first navigate to the search page
      navigate("/search");
      // then set the search keyword so it will triger the search end points
      setSearchKeyword(e.target.value);
    }
  };

  return { photos, status, handlePageChange, handleSearch, randomPhoto };
}

export default useGetPhotos;
