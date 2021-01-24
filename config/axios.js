import axios from "axios";

const instance = axios.create({
  baseURL: "https://secret-gorge-48512.herokuapp.com",
});

export default instance;
