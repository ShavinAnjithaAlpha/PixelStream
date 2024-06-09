import axios from "axios";

async function getLocations(query) {
  try {
    const response = await axios.get(
      `${
        import.meta.env.VITE_LOCATION_API_URL
      }?text=${query}&format=json&apiKey=${
        import.meta.env.VITE_LOCATION_API_KEY
      }`,
      {
        headers: {
          "Content-Type": "application/json",
        },
      }
    );

    return response.data.results;
  } catch (err) {
    return {};
  }
}

export default getLocations;
