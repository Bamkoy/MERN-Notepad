// instead of repeatedly inputting the url http://localhost:5000/api we  create a folder in lib called axios and create this function
import axios from "axios";

const api = axios.create({
  baseURL: "http://localhost:5000/api",
});

export default api;
