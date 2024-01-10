import axios from "./axios";

export const createComplaintRequest = (data) => axios.post("/complaints", data);

export const getComplaintsRequest = () => axios.get("/complaints");