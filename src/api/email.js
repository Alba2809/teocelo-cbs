import axios from "./axios";

export const sendEmailRequest = (data) => axios.post("/send-email", data);
