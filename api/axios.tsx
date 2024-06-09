import axios from "axios";

// For common config
axios.defaults.headers.post["Content-Type"] = "application/json";

const proyectosAxios = axios.create({
    baseURL: process.env.PROYECTO_BASE_URL,
    timeout: 15000,
});

const soportesAxios = axios.create({
    baseURL: process.env.SOPORTE_BASE_URL,
    timeout: 15000,
});

export {
  proyectosAxios,
  soportesAxios
};