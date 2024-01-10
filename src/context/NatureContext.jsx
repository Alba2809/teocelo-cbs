import { createContext, useContext, useEffect, useState } from "react";
import {
  getNatureAgriculturalRequest,
  getNatureBambooRequest,
  getNatureCattleRequest,
  createNatureRequest,
  updateNatureRequest,
} from "../api/nature";

const NatureContext = createContext();

export const useNature = () => {
  const context = useContext(NatureContext);

  if (!context) {
    throw new Error("useNature must be used within a PostProvider");
  }

  return context;
};

export function NatureProvider({ children }) {
  const [natureCattle, setNatureCattle] = useState([]);
  const [natureAgricultural, setNatureAgricultural] = useState([]);
  const [natureBamboo, setNatureBamboo] = useState([]);
  const [nature, setNature] = useState([]);
  const [errors, setErrors] = useState([]);

  const createNature = async (data) => {
    try {
      const res = await createNatureRequest(data);
      return res.data;
    } catch (error) {
        console.log(error.response.data)
      setErrors(error.response.data);
    }
  };

  const getNatureCattle = async () => {
    try {
      const res = await getNatureCattleRequest();
      setNatureCattle(res.data);
      setNature(res.data);
    } catch (error) {
      console.log(error);
    }
  };

  const getNatureAgricultural = async () => {
    try {
      const res = await getNatureAgriculturalRequest();
      setNatureAgricultural(res.data);
      setNature(res.data);
    } catch (error) {
      console.log(error);
    }
  };

  const getNatureBamboo = async () => {
    try {
      const res = await getNatureBambooRequest();
      setNatureBamboo(res.data);
      setNature(res.data);
    } catch (error) {
      console.log(error);
    }
  };

  const updateNature = async (id, data) => {
    try {
      const res = await updateNatureRequest(id, data);
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
    <NatureContext.Provider
      value={{
        natureCattle,
        natureAgricultural,
        natureBamboo,
        nature,
        errors,
        createNature,
        getNatureAgricultural,
        getNatureBamboo,
        getNatureCattle,
        updateNature,
      }}
    >
      {children}
    </NatureContext.Provider>
  );
}
