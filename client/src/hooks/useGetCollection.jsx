import { useState, useEffect } from "react";
import axios from "../axios";

function useGetCollection(id) {
  const [collection, setCollection] = useState({});
  const [photos, setPhotos] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(true);
    // fetch the colection data from the API endpoints
    axios
      .get(`collections/${id}`)
      .then((res) => {
        setCollection(res.data);
      })
      .catch((err) => {
        console.log(err);
      });

    // fetch the photos from the API endpoints
    axios
      .get(`collections/${id}/photo`)
      .then((res) => {
        setPhotos(res.data);
        setLoading(false);
      })
      .catch((err) => {
        console.log(err);
        setLoading(false);
      });
  }, [id]);

  return { collection, photos, loading };
}

export default useGetCollection;
