import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useExtaData } from "../../../context/ExtraDataContext";
import CabildoAlcalde from "../../../assets/Photos/CabildoAlcalde.jpg";
import CabildoRegidora from "../../../assets/Photos/CabildoRegidora.jpg";
import CabildoSindica from "../../../assets/Photos/CabildoSindica.png";

function CabildoPC() {
  const [selectedId, setSelectedId] = useState(1);
  const [isLoading, setIsLoading] = useState(false);
  const [showComissions, setShowComissions] = useState(false);
  const { isMobile } = useExtaData();

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
      id: 3,
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
      id: 2,
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

  const handleSelect = (id) => {
    if (isLoading) return;

    if (isMobile) {
      setShowComissions(!showComissions);
      setSelectedId(id);
      return;
    }

    if (selectedId) {
      setSelectedId(null);
      setIsLoading(true);
      const timer = setTimeout(() => {
        setSelectedId(id);
        setIsLoading(false);
      }, 500);
      return () => clearTimeout(timer);
    }
    setSelectedId(id);
  };

  return (
    <div className="mt-10 mx-10">
      <div className="h-[432px] z-20">
        <AnimatePresence>
          {selectedId &&
            selectedImage.map((image) => (
              <div
                className="flex items-center justify-center gap-10"
                key={image.id}
              >
                <motion.div
                  layoutId={selectedId}
                  className="w-1/3"
                  onClick={() => {
                    setShowComissions(!showComissions);
                  }}
                >
                  <img
                    src={image.src}
                    className={`px-10 py-5 shadow-lg shadow-gray-400 bg-white${
                      showComissions ? "" : " cursor-pointer"
                    }`}
                    alt={image.alt}
                  />
                </motion.div>

                <AnimatePresence mode="popLayout">
                  {showComissions && (
                    <motion.div
                      className="bg-[#EFEFEF] shadow-lg shadow-gray-400 basis-1/2"
                      initial={{ scaleX: 0, scaleY: 0 }}
                      animate={{ scaleX: 1, scaleY: 1 }}
                      exit={{ scaleX: 0, scaleY: 0 }}
                      transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
                    >
                      <h1 className="text-center text-2xl lg:text-3xl text-[#F9B03C] font-extrabold mt-5">
                        Comisiones
                      </h1>
                      <div className="grid grid-cols-2 m-5 gap-y-2 lg:gap-y-5 pb-5 lg:pb-0">
                        {image.commissions.map((comission, index) => (
                          <div className="flex items-center gap-2" key={index}>
                            <div className="min-h-[1em] min-w-[1em] rounded-full bg-[#F9B03C]"></div>
                            <span className="font-bold text-base">
                              {comission}
                            </span>
                          </div>
                        ))}
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            ))}
        </AnimatePresence>
      </div>

      <div className="flex justify-center gap-10 z-10">
        {images
          .sort((a, b) => a.id - b.id)
          .filter((image) => image.id !== selectedId)
          .map((image) => (
            <motion.div
              layoutId={image.id}
              onClick={() => handleSelect(image.id)}
              key={image.id}
              className="px-10 py-5 shadow-lg shadow-gray-400 bg-white w-1/2 lg:w-1/4 cursor-pointer"
            >
              <motion.img src={image.src} alt={image.alt} />
            </motion.div>
          ))}
      </div>
    </div>
  );
}

export default CabildoPC;
