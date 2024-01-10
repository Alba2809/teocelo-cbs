import { createContext, useContext, useEffect, useState } from "react";
import { createComplaintRequest, getComplaintsRequest } from "../api/complaint";

const ComplaintContext = createContext();

export const useComplaint = () => {
  const context = useContext(ComplaintContext);

  if (!context) {
    throw new Error("useComplaint must be used within a PostProvider");
  }

  return context;
};

export function ComplaintProvider({ children }) {
  const [complaints, setComplaints] = useState([]);
  const [errors, setErrors] = useState([]);

  const createComplaint = async (data) => {
    try {
      const res = await createComplaintRequest(data);
      return res.data;
    } catch (error) {
      setErrors(error.response.data);
      console.log(error.response.data)
    }
  };

  const getComplaints = async () => {
    try {
      const res = await getComplaintsRequest();
      setComplaints(res.data);
    } catch (error) {
      console.log(error);
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
    <ComplaintContext.Provider
      value={{
        complaints,
        errors,
        createComplaint,
        getComplaints,
      }}
    >
      {children}
    </ComplaintContext.Provider>
  );
}

export default ComplaintContext;
