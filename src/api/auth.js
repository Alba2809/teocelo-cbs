import axios from "./axios";
import axiosDocument from "./axiosDocument";

export const registerRequest = (user) => axios.post("/register", user);

export const loginRequest = (user) => axios.post("/login", user);

export const verifyTokenRequest = () => axios.get("/verify");

export const updateRequest = (data) => axios.put("/update", data);

export const getUserRequest = () => axios.get("/user");

export const getHistoryRequest = () => axios.get("/history");

export const getFileRequest = (name) =>
  axiosDocument.get(`/documentos/${name}`, { responseType: "blob" });
