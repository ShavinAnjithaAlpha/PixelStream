import axios from "axios";
// import dotenv from "dotenv";

// dotenv.config();

const instance = axios.create({
  baseURL: "http://localhost:5000/api/",
});

export default instance;
