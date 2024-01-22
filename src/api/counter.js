import axios from "./axios";

export const getUpdateVisitsRequest = () => axios.post("/counter-visits");
export const getVisitsRequest = () => axios.get("/counter-visits");