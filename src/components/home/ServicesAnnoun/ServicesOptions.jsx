import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import IconoRecoBasura from "../../../assets/Icons/IconoRecoBasura.png";
import IconoTabClasif from "../../../assets/Icons/IconoTabClasif.png";
import IconoActaNacimiento from "../../../assets/Icons/IconoActaNacimiento.png";
import IconoOficialia from "../../../assets/Icons/IconoOficialia.png";

function ServicesOptions() {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };
  return (
    <div>
      <div>
        <h1 className="font-extrabold text-center text-2xl lg:text-4xl pt-5 pb-28">
          SITIOS DE INTERES
        </h1>
      </div>
      <div className="flex flex-wrap items-center justify-center gap-5 gap-y-16 text-center w-full">
        <Link
          className="w-1/3 flex flex-col items-center"
          to="/garbage-collection-routes"
          onClick={scrollToTop}
        >
          <motion.div whileHover={{ scale: 1.1 }} className="relative">
            <div className="rounded-full bg-[#6D1610] h-[5em] w-[5em] lg:h-[8em] lg:w-[8em]"></div>
            <img
              src={IconoRecoBasura}
              alt="Icono de gotas de agua"
              className="absolute top-0 p-4"
            />
          </motion.div>
          <div className="font-extrabold">Rutas de recolección de basura</div>
        </Link>
        <Link to="/soccer-teams" className="w-1/3 flex flex-col items-center">
          <motion.div whileHover={{ scale: 1.1 }} className="relative">
            <div className="rounded-full bg-[#6D1610] h-[5em] w-[5em] lg:h-[8em] lg:w-[8em]"></div>
            <img
              src={IconoTabClasif}
              alt="Icono de gotas de agua"
              className="absolute top-[0.2rem] p-3"
            />
          </motion.div>
          <div className="font-extrabold">Tablas de posiciones</div>
        </Link>
        <a
          href="https://www.gob.mx/ActaNacimiento/"
          target="_blank"
          rel="noopener noreferrer"
          className="w-1/3 flex flex-col items-center"
        >
          <motion.div whileHover={{ scale: 1.1 }} className="relative">
            <div className="rounded-full bg-[#6D1610] h-[5em] w-[5em] lg:h-[8em] lg:w-[8em]"></div>
            <img
              src={IconoActaNacimiento}
              alt="Icono de gotas de agua"
              className="absolute top-[15%] left-[0.15rem]"
            />
          </motion.div>
          <div className="font-extrabold">Acta de nacimiento en línea</div>
        </a>
        <div className="w-1/3 flex justify-center">
          <Link
            className="w-1/3 flex flex-col items-center"
            to="/official-request"
            onClick={scrollToTop}
          >
            <motion.div whileHover={{ scale: 1.1 }} className="relative">
              <div className="rounded-full bg-[#6D1610] h-[5em] w-[5em] lg:h-[8em] lg:w-[8em]"></div>
              <img
                src={IconoOficialia}
                alt="Icono de gotas de agua"
                className="absolute top-[15%]"
              />
            </motion.div>
            <div className="font-extrabold">Oficialía de partes</div>
          </Link>
        </div>
      </div>
    </div>
  );
}

export default ServicesOptions;
