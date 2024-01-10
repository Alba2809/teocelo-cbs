import { createContext, useState, useEffect, useContext } from "react";

export const ExtraDataContext = createContext();

export const useExtaData = () => {
  const context = useContext(ExtraDataContext);
  if (!context) {
    throw new Error("useExtraData must be used within an AuthProvider");
  }
  return context;
};

export function ExtraDataContextProvider(props) {
  const [isLogin, setIsLogin, ] = useState(true);
  const imageUrl = "http://localhost:4000/public/images/"
  const documentUrl = "http://localhost:4000/public/documentos/"
  const expLettersNumbers = /^[a-zA-Z0-9]+$/
  const expTextGeneral = /^[a-zA-Z0-9\s.,áéíóúÁÉÍÓÚ]+$/
  const expJustLetters = /^[a-zA-Z\sáéíóúÁÉÍÓÚ]+$/
  const expNumLettExtended = /^[a-zA-Z0-9\s.,¿?-_!¡"áéíóúÁÉÍÓÚ]+$/
  const expJustNumbers = /^[0-9]+$/

  function changeIsLogin(value) {
    setIsLogin(value);
  }

  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth <= 890);
    };

    window.addEventListener("resize", handleResize);

    handleResize();

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  return (
    <ExtraDataContext.Provider
      value={{
        isLogin,
        isMobile,
        imageUrl,
        documentUrl,
        expLettersNumbers,
        expTextGeneral,
        expJustLetters,
        expJustNumbers,
        expNumLettExtended,
        changeIsLogin,
      }}
    >
      {props.children}
    </ExtraDataContext.Provider>
  );
}
