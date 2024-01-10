import axios from "./axios"

export const getOfficialRequest = () => axios.get("/officialrequests");

export const createOfficialRequest = (data) => axios.post("/official", data)

export const updateOfficialRequest = (id, data) => axios.put(`/official/${id}`, data)