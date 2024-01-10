import { createContext, useContext, useEffect, useState } from "react";
import {
  createUpdateTeamsRequest,
  getSoccerTeamsRequest,
  deleteTeamRequest,
} from "../api/soccer";

const SoccerContext = createContext();

export const useSoccer = () => {
  const context = useContext(SoccerContext);

  if (!context) {
    throw new Error("useSoccer must be used within a PostProvider");
  }

  return context;
};

export function SoccerProvider({ children }) {
  const [teams, setTeams] = useState([]);
  const [errors, setErrors] = useState([]);

  const createSoccerTeam = async (data) => {
    try {
      const res = await createUpdateTeamsRequest(data);
      return res.data;
    } catch (error) {
      setErrors(error.response.data);
      console.log(error.response.data)
    }
  };

  const deleteSoccerTeam = async (id) => {
    try {
      const res = await deleteTeamRequest(id);
      return res.data;
    } catch (error) {
      console.log(error.response.data)
        if(typeof error.response.data === "object" && error.response.data){
          const array = Object.values(error.response.data)
          setErrors(array);
        }
        else setErrors(error.response.data);
    }
  };

  const getSoccerTeams = async () => {
    try {
      const res = await getSoccerTeamsRequest();
      setTeams(res.data);
      return res.data;
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
    <SoccerContext.Provider
      value={{
        teams,
        errors,
        createSoccerTeam,
        getSoccerTeams,
        deleteSoccerTeam,
      }}
    >
      {children}
    </SoccerContext.Provider>
  );
}
