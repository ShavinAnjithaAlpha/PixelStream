import { useState, useEffect } from "react";
import axios from "../axios";

const LIMIT = 12;

function useGetCollection(id, options) {
  const [collection, setCollection] = useState({});
  const [relatedCollections, setRelatedCollections] = useState([]);
  const [photos, setPhotos] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchRelatedCollectionsFromAPI = (id) => {
    axios
      .get(`/collections/${id}/related?limit=10&page=1`)
      .then((res) => {
        setRelatedCollections(res.data.collections);
      })
      .catch((err) => {});
  };

  const getPhotosOfCollectionFromAPI = (id, options, page) => {
    // fetch the colection data from the API endpoints
    axios
      .get(`collections/${id}`)
      .then((res) => {
        setCollection(res.data);
        // get the tags of the collection
        axios
          .get(`/collections/${id}/tags`)
          .then((res) => {
            setCollection((prev) => ({
              ...prev,
              tags: res.data,
            }));
          })
          .catch((err) => {
            console.log(err);
          });
      })
      .catch((err) => {
        console.log(err);
      });

    // fetch the photos from the API endpoints
    axios
      .get(
        `collections/${id}/photo?sortBy=${
          options.sortBy || "latest"
        }&orientation=${options.orientation || "all"}&query=${
          options.search || ""
        }&page=${page || 1}&limit=${LIMIT}`
      )
      .then((res) => {
        setPhotos(res.data);
        setLoading(false);
      })
      .catch((err) => {
        console.log(err);
        setLoading(false);
      });
  };

  const handlePageChange = (page) => {
    setLoading(true);
    getPhotosOfCollectionFromAPI(id, options, page);
  };

  useEffect(() => {
    setLoading(true);
    getPhotosOfCollectionFromAPI(id, options, 1);
    fetchRelatedCollectionsFromAPI(id);
  }, [id, options]);

  return { collection, relatedCollections, photos, loading, handlePageChange };
}

export default useGetCollection;
