import { REACT_APP_BACKEND_URL } from "../config"
import axios from "axios";

const instance = axios.create({
  baseURL: `${REACT_APP_BACKEND_URL}/public`,
  withCredentials: true,
});

export default instance;
