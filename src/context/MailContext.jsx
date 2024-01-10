import { createContext, useContext, useEffect, useState } from "react";
import { sendEmailRequest } from "../api/email";

const MailContext = createContext();

export const useMail = () => {
  const context = useContext(MailContext);

  if (!context) {
    throw new Error("useMail must be used within a PostProvider");
  }

  return context;
};

export function MailProvider({ children }) {
    const [errors, setErrors] = useState([]);
  
    const sendEmail = async (data) => {
      try {
        const res = await sendEmailRequest(data);
        return res;
      } catch (error) {
        console.log(error.response.data)
        if(typeof error.response.data === "object" && error.response.data){
          const array = Object.values(error.response.data)
          setErrors(array);
        }
        else setErrors(error.response.data);
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
      <MailContext.Provider
        value={{
          sendEmail,
          errors
        }}
      >
        {children}
      </MailContext.Provider>
    );
  }

export default MailContext