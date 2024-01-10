import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { IoMdClose } from "react-icons/io";
import { Dialog, DialogBody, DialogHeader } from "@material-tailwind/react";
import CabildoAlcalde from "../../../assets/Photos/CabildoAlcalde.jpg";
import CabildoRegidora from "../../../assets/Photos/CabildoRegidora.jpg";
import CabildoSindica from "../../../assets/Photos/CabildoSindica.png";

function CabildoMobile() {
  const [selectedId, setSelectedId] = useState(1);

  useEffect(() => {
    setSelectedImage(images.filter((value) => value.id == selectedId));
  }, [selectedId]);

  const [selectedImage, setSelectedImage] = useState([
    {
      id: 1,
      src: CabildoAlcalde,
      alt: "Cabildo - Alcalde",
      commissions: [
        "Policía y prevención del delito",
        "Educación, recreación, cultura, actos cívicos y fomento deportivo",
        "Salud y asistencia pública",
        "Comunicación y obras públicas",
        "Participación ciudadana y vecinal",
        "Comercios,  centrales de abastos, mercados y rastros",
        "Fomento forestal, ecología y medio ambiente",
        "Turismo",
        "Desarrollo económico",
        "Planeación de Desarrollo Municipal",
      ],
    },
  ]);

  const [images, setImages] = useState([
    {
      id: 1,
      src: CabildoAlcalde,
      alt: "Cabildo - Alcalde",
      commissions: [
        "Policía y prevención del delito",
        "Educación, recreación, cultura, actos cívicos y fomento deportivo",
        "Salud y asistencia pública",
        "Comunicación y obras públicas",
        "Participación ciudadana y vecinal",
        "Comercios,  centrales de abastos, mercados y rastros",
        "Fomento forestal, ecología y medio ambiente",
        "Turismo",
        "Desarrollo económico",
        "Planeación de Desarrollo Municipal",
      ],
    },
    {
      id: 2,
      src: CabildoRegidora,
      alt: "Cabildo - Regidora",
      commissions: [
        "Hacienda y patrimonio municipal",
        "Tránsito y vialidad",
        "Limpia pública",
        "Para la igualdad de género",
        "Bibliotecas, fomento a la lectura y alfabetización",
        "Ornato, parques, jardines y alumbrado",
        "Ciencia y tecnología",
        "Impulso de la juventud",
        "Protección civil",
        "Población",
      ],
    },
    {
      id: 3,
      src: CabildoSindica,
      alt: "Cabildo - Sindica",
      commissions: [
        "Hacienda y patrimonio municipal",
        "Fomento agropecuario",
        "Asentamientos humanos, fraccionamientos, licencias y regularización de la tierra",
        "Agua potable, alcantarillado, tratamiento y disposiciones de aguas residuales",
        "Desempeño",
        "Transparencia y acceso a la información",
        "Registro civil, panteones y reclutamiento",
        "Gobernación, reglamento y circulares",
        "Para la igualdad de género",
        "Promoción y defensa de los derechos humanos",
        "Desarrollo social, humano y regional",
        "De la niñez y la familia",
      ],
    },
  ]);

  const container = {
    hidden: { opacity: 1, scale: 0 },
    visible: {
      opacity: 1,
      scale: 1,
      transition: {
        delayChildren: 0.2,
        staggerChildren: 0.2,
      },
    },
  };

  const item = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
    },
  };

  const handleOpenSelect = (id) => {
    setSelectedId(id);
    handleOpenDialog();
  };

  const [openDialog, setOpenDialog] = useState(false);
  const handleOpenDialog = () => setOpenDialog(!openDialog);

  return (
    <div className="mt-10 mx-10">
      <div className="grid grid-cols-2 justify-items-center justify-center gap-10 z-10">
        {images.map((image) => (
          <motion.div
            whileTap={{ scale: 0.95 }}
            onClick={() => handleOpenSelect(image.id)}
            key={image.id}
            className={`px-10 py-5 shadow-lg shadow-gray-400 bg-white lg:w-1/4 cursor-pointer ${
              image.id === 1 ? "col-span-2 w-1/2" : "w-full"
            }`}
          >
            <motion.img src={image.src} alt={image.alt} />
          </motion.div>
        ))}
      </div>

      <Dialog
        open={openDialog}
        handler={handleOpenDialog}
        size="lg"
        animate={{
          mount: { scale: 1, y: 0 },
          unmount: { scale: 0.9, y: -100 },
        }}
        className="bg-[#EFEFEF]"
      >
        <DialogHeader>
          <div className="grid grid-cols-2 w-full items-center">
            <motion.div
              className="justify-self-start ml-5 text-center text-2xl text-[#F9B03C] font-extrabold mt-5"
              initial={{ scaleX: 0, scaleY: 0 }}
              animate={{ scaleX: 1, scaleY: 1 }}
              transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
            >
              Comisiones
            </motion.div>
            <button
              className="justify-self-end mr-5 mt-2"
              onClick={handleOpenDialog}
            >
              <IoMdClose size="2em" />
            </button>
          </div>
        </DialogHeader>
        <DialogBody>
          <motion.div
            className="grid grid-cols-2 mx-5 gap-y-2 pb-5 overflow-hidden"
            initial="hidden"
            animate="visible"
            variants={container}
          >
            {selectedImage[0].commissions.map((comission, index) => (
              <motion.div
                variants={item}
                className="flex items-center gap-2"
                key={index}
              >
                <div className="min-h-[1em] min-w-[1em] rounded-full bg-[#F9B03C]"></div>
                <p className="font-bold text-base">{comission}</p>
              </motion.div>
            ))}
          </motion.div>
        </DialogBody>
      </Dialog>
    </div>
  );
}

export default CabildoMobile;
