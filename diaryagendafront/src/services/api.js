import axios from 'axios';

const api = axios.create({
  baseURL: "http://localhost/slimbolo"
});

export default api;
