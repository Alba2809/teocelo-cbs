import { createContext, useContext, useEffect, useState } from "react";
import {
  createWaterReportRequest,
  createWaterRequestRequest,
  getWaterReportsRequest,
  getWaterRequestsRequest,
  updateWaterRequest
} from "../api/water";

const WaterContext = createContext();

export const useWater = () => {
  const context = useContext(WaterContext);

  if (!context) {
    throw new Error("useWater must be used within a PostProvider");
  }

  return context;
};

export function WaterProvider({ children }) {
  const [waterRequest, setWaterRequest] = useState([]);
  const [waterReport, setWaterReport] = useState([]);
  const [errors, setErrors] = useState([]);

  const createWaterRequest = async (data) => {
    try {
      const res = await createWaterRequestRequest(data);
      return res.data;
    } catch (error) {
      setErrors(error.response.data);
    }
  };

  const createWaterReport = async (data) => {
    try {
      const res = await createWaterReportRequest(data);
      return res.data;
    } catch (error) {
      setErrors(error.response.data);
    }
  };

  const getWaterReports = async () => {
    try {
      const res = await getWaterReportsRequest();
      setWaterReport(res.data);
    } catch (error) {
      console.log(error);
    }
  };
  
  const getWaterRequests = async () => {
    try {
      const res = await getWaterRequestsRequest();
      setWaterRequest(res.data);
    } catch (error) {
      console.log(error);
    }
  };

  const updateWater = async (id, data) => {
    try {
      const res = await updateWaterRequest(id, data);
      return res.data;
    } catch (error) {
      setErrors(error.response.data);
    }
  };

  useEffect(() => {
    if (errors.length > 0) {
      const timer = setTimeout(() => {
        setErrors([]);
      }, 5000);
      return () => clearTimeout(timer);
    }
  }, [errors]);

  return <WaterContext.Provider value={{
    waterReport,
    waterRequest,
    errors,
    createWaterReport,
    createWaterRequest,
    getWaterReports,
    getWaterRequests,
    updateWater
  }}>{children}</WaterContext.Provider>;
}
