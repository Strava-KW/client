import axios from "axios";

const instance = axios.create({
  baseURL: "http://192.168.100.43:3000",
  // baseURL: "http://192.168.43.6:3000",
});

export default instance;
