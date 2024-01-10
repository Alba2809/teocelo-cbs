import axios from "./axios";

export const getLampRequestsRequest = () => axios.get("/lamprequests");

export const getLampReportsRequest = () => axios.get("/lampreports");

export const createLampRequestRequest = (values) => axios.post("/lamprequests", values);

export const createLampReportRequest = (values) => axios.post("/lampreports", values);

export const updateLampRequest = (id, values) => axios.put(`/lamps/${id}`, values);
