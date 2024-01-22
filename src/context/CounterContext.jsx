import { createContext, useContext, useEffect, useState } from "react";
import { getUpdateVisitsRequest, getVisitsRequest } from "../api/counter";
import Cookies from "js-cookie";

const CounterContext = createContext();

export const useCounter = () => {
  const context = useContext(CounterContext);

  if (!context) {
    throw new Error("useCounter must be used within a CounterProvider");
  }

  return context;
};

export function CounterProvider({ children }) {
  const [errors, setErrors] = useState([]);
  const [counterVisits, setCounterVisits] = useState(0);

  const createCookie = () => {
    return new Promise((resolve, reject) => {
      try {
        const res = getUpdateVisitsRequest();
        const expirationDate = new Date();
        expirationDate.setDate(expirationDate.getDate() + 1); /* exp: 1day */
        Cookies.set("visited", "true", {
          expires: expirationDate,
          path: "/",
          secure: true,
          sameSite: "None",
        });
        resolve(res.data?.count);
      } catch (error) {
        reject(error);
      }
    });
  };

  const getUpdateVisits = async () => {
    try {
      const visitedCookie = Cookies.get("visited");

      if (!visitedCookie) {
        const count = await createCookie();
        setCounterVisits(count);
      } else {
        const res = await getVisitsRequest();
        setCounterVisits(res.data.count);
      }
    } catch (error) {}
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
    <CounterContext.Provider
      value={{
        getUpdateVisits,
        counterVisits,
        errors,
      }}
    >
      {children}
    </CounterContext.Provider>
  );
}

export default CounterContext;
