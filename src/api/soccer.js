import axios from "./axios";

export const getSoccerTeamsRequest = () => axios.get("/soccerteams");

export const createUpdateTeamsRequest = (data) => axios.post("/soccerteams", data);

export const deleteTeamRequest = (id) => axios.delete(`/soccerteams/${id}`);
