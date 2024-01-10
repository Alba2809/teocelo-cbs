import { VITE_BACKEND_URL } from "../config"
import axios from "axios";

const instance = axios.create({
  baseURL: `https://teocelo-cbs-api-production-dcfd.up.railway.app/api`,
  withCredentials: true,
});

export default instance;
