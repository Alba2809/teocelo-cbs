import { AnimatePresence, motion } from "framer-motion";
import { useRef, useState } from "react";
import { FaCheck } from "react-icons/fa";
import IconoSubirDocumento from "../assets/Icons/IconoSubirDocumento.png";

function UploadDocument({ onChange, defaultImage }) {
  const fileInputRef = useRef(null);
  const [doc, setDoc] = useState(false);

  const handleButtonClick = () => fileInputRef.current.click();

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file && file.type === "application/pdf") {
      setDoc(true);
      if (onChange) onChange(file);
    }
  };

  return (
    <div className="w-full min-h-[255px] min-w-[200px] flex justify-center">
      <motion.button
        whileTap={{ scale: 0.95 }}
        className="bg-[#EFEEEE] font-bold p-5 rounded-md shadow-md w-full flex items-center justify-center"
        type="button"
        onClick={handleButtonClick}
      >
        {doc ? (
          <AnimatePresence>
            <motion.div
              initial={{ scale: 0.5, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ type: "spring"}}
            >
              <FaCheck size="7em" />
            </motion.div>
          </AnimatePresence>
        ) : (
          <img src={defaultImage ?? IconoSubirDocumento} alt="File Input" />
        )}
      </motion.button>
      <input
        type="file"
        accept=".pdf"
        className="hidden"
        ref={fileInputRef}
        onChange={handleFileChange}
      />
    </div>
  );
}

export default UploadDocument;
