import { VITE_BACKEND_URL } from "../config"
import axios from "axios";

const instance = axios.create({
  baseURL: `${VITE_BACKEND_URL}/api`,
  withCredentials: true,
  headers: { 'Content-Type': 'application/json' }
});

export default instance;
