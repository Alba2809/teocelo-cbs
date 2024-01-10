import { motion } from "framer-motion";
import { useRef, useState } from "react";
import IconoSubirImagen from "../assets/Icons/IconoSubirImagen.png";

function UploadImage({ onChange, defaultImage }) {
  const fileInputRef = useRef(null);
  const [previewImage, setPreviewImage] = useState(null);

  const handleButtonClick = () => {
    fileInputRef.current.click();
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      onChange(file);
      const reader = new FileReader();
      reader.onloadend = () => {
        setPreviewImage(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <div className="w-full flex justify-center">
      <motion.button
        whileTap={{ scale: 0.95 }}
        className="bg-[#EFEEEE] font-bold p-5 rounded-md shadow-md"
        type="button"
        onClick={handleButtonClick}
      >
        {previewImage ? (
          <img src={previewImage} alt="File Preview" />
        ) : (
          <img src={defaultImage ?? IconoSubirImagen} alt="File Input" />
        )}
      </motion.button>
      <input
        type="file"
        accept="image/*"
        className="hidden"
        ref={fileInputRef}
        onChange={handleFileChange}
      />
    </div>
  );
}

export default UploadImage;
