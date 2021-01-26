import axios from "axios";

const instance = axios.create({
  baseURL: "http://192.168.8.102:3000",
});

export default instance;
