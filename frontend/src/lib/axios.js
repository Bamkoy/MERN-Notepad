// instead of repeatedly inputting the url http://localhost:5000/api we  create a folder in lib called axios and create this function
import axios from "axios";

//in production, there is nothing like localhost so we have to make this dynamic
const BASE_URL = import.meta.env.MODE === "development" ? "http://localhost:5000/api" : "/api";

const api = axios.create({
  baseURL: BASE_URL,
});

export default api;
 