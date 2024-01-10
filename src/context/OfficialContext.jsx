import { createContext, useContext, useEffect, useState } from "react";
import {
  getOfficialRequest,
  createOfficialRequest,
  updateOfficialRequest,
} from "../api/official";

const OfficialContext = createContext();

export const useOfficial = () => {
  const context = useContext(OfficialContext);

  if (!context) {
    throw new Error("useOfficial must be used within a PostProvider");
  }

  return context;
};

export function OfficialProvider({ children }) {
  const [officials, setOfficials] = useState([]);
  const [errors, setErrors] = useState([]);

  const createOfficial = async (data) => {
    try {
      const res = await createOfficialRequest(data);
      return res.data;
    } catch (error) {
      setErrors(error.response.data);
    }
  };

  const getOfficial = async () => {
    try {
      const res = await getOfficialRequest();
      setOfficials(res.data);
    } catch (error) {
      console.log(error);
    }
  };

  const updateOfficial = async (id, data) => {
    try {
      const res = await updateOfficialRequest(id, data);
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

  return (
    <OfficialContext.Provider
      value={{
        officials,
        errors,
        createOfficial,
        updateOfficial,
        getOfficial,
      }}
    >
      {children}
    </OfficialContext.Provider>
  );
}
