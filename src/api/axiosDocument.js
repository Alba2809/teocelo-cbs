import { VITE_BACKEND_URL } from "../config"
import axios from "axios";

const instance = axios.create({
  baseURL: `${VITE_BACKEND_URL}/public`,
  withCredentials: true,
});

export default instance;
