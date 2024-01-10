import axios from "./axios"

export const getNatureCattleRequest = () => axios.get("/naturecattle");

export const getNatureAgriculturalRequest = () => axios.get("/natureagricultural");

export const getNatureBambooRequest = () => axios.get("/naturebamboo");

export const createNatureRequest = (data) => axios.post("/nature", data)

export const updateNatureRequest = (id, data) => axios.put(`/nature/${id}`, data)