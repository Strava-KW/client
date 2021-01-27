import axios from "axios";

const instance = axios.create({
<<<<<<< HEAD
  baseURL: "http://192.168.43.35:3000",
=======
  baseURL: "http://192.168.43.6:3000",
>>>>>>> 90d0976c4e4f1d69e6518742e86b1fd48126d155
  // baseURL: "http://192.168.100.43:3000",
  // baseURL: "https://secret-gorge-48512.herokuapp.com",
});

export default instance;
