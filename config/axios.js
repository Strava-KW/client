import axios from "axios";

const instance = axios.create({
  // baseURL: "http://192.168.43.6:3000",
  // baseURL: "http://192.168.100.43:3000",
  baseURL: "https://secret-gorge-48512.herokuapp.com",
  // baseURL: "http://192.168.43.35:3000"
  
});

export default instance;
