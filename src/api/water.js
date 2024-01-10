import axios from "./axios";

export const getWaterRequestsRequest = () => axios.get("/waterrequests");

export const getWaterReportsRequest = () => axios.get("/waterreports");

export const createWaterRequestRequest = (values) => axios.post("/waterrequests", values);

export const createWaterReportRequest = (values) => axios.post("/waterreports", values);

export const updateWaterRequest = (id, values) => axios.put(`/water/${id}`, values);
