import { useExtaData } from "../context/ExtraDataContext";
import { motion } from "framer-motion";
import TourismComponent from "../components/home/Others/TourismComponent";
import Cascada from "../assets/Photos/Cascada-Tezozontla.jpg";
import HeaderTittle from "../components/HeaderTittle";

function TourismPage() {
  const { isMobile } = useExtaData();

  return (
    <div className="bg-white pt-6 pb-8 mt-5">
      <HeaderTittle title={"Atractivos turísticos"} />
      <div
        className={`my-10 flex flex-col gap-10 ${isMobile ? "mx-28" : "mx-56"}`}
      >
        <motion.div
          initial={{ x: -100, opacity: 0 }}
          animate={{ x: 0, opacity: 1, transition: {delay: 0.5} }}
          whileHover={{ scale: 1.1 }}
          className="shadow-lg shadow-gray-400"
        >
          <TourismComponent
            data={{
              images: [Cascada, Cascada, Cascada],
              imageAlt: "Imagen - Cascada",
              imageSide: "left",
              title: "Cascada de Texolo",
              location: "Santa Rosa",
              p1: "La cascada de Texolo es una cascada ubicada al oriente de Veracruz, México. Está localizada a 3 kilómetros al sur del pueblo de Xico, en el estado de Veracruz, y aproximadamente a 19 kilómetros de Xalapa.",
              p2: "La cascada principal tiene una altura aproximada de 18–24 metros. Hay un puente sobre el barranco que conecta ambas partes del bosque. Al otro lado, hay dos cascadas más pequeñas que se pueden ver a partir de algunos de los senderos en la zona.",
            }}
          />
        </motion.div>
        <motion.div
          initial={{ x: 100, opacity: 0 }}
          animate={{ x: 0, opacity: 1, transition: {delay: 0.5} }}
          whileHover={{ scale: 1.1 }}
          className="shadow-lg shadow-gray-400"
        >
          <TourismComponent
            data={{
              images: [Cascada, Cascada, Cascada],
              imageAlt: "Imagen - Cascada",
              imageSide: "right",
              title: "Parroquia de la Asunción de María",
              location: "Centro de Teocelo",
              p1: "Construida en el siglo XVI, esta iglesia es considerada un importante patrimonio histórico y cultural de la región. Su arquitectura destaca por su estilo barroco y neoclásico, con una fachada imponente y detalles ornamentales en su interior.",
              p2: "La parroquia alberga una gran cantidad de obras de arte religioso, como pinturas, esculturas y retablos, que reflejan la devoción y la fe de la comunidad. Además, es un lugar de encuentro para los fieles y un punto de referencia para los visitantes que desean conocer la riqueza cultural de Teocelo.",
            }}
          />
        </motion.div>
        <motion.div
          initial={{ x: -100, opacity: 0 }}
          animate={{ x: 0, opacity: 1, transition: {delay: 0.5} }}
          whileHover={{ scale: 1.1 }}
          className="shadow-lg shadow-gray-400"
        >
          <TourismComponent
            data={{
              images: [Cascada, Cascada, Cascada],
              imageAlt: "Imagen - Cascada",
              imageSide: "left",
              title: "Cascada de Texolo",
              location: "Santa Rosa",
              p1: "La cascada de Texolo es una cascada ubicada al oriente de Veracruz, México. Está localizada a 3 kilómetros al sur del pueblo de Xico, en el estado de Veracruz, y aproximadamente a 19 kilómetros de Xalapa.",
              p2: "La cascada principal tiene una altura aproximada de 18–24 metros. Hay un puente sobre el barranco que conecta ambas partes del bosque. Al otro lado, hay dos cascadas más pequeñas que se pueden ver a partir de algunos de los senderos en la zona.",
            }}
          />
        </motion.div>
        <motion.div
          initial={{ x: 100, opacity: 0 }}
          animate={{ x: 0, opacity: 1, transition: {delay: 0.5} }}
          whileHover={{ scale: 1.1 }}
          className="shadow-lg shadow-gray-400"
        >
          <TourismComponent
            data={{
              images: [Cascada, Cascada, Cascada],
              imageAlt: "Imagen - Cascada",
              imageSide: "right",
              title: "Parroquia de la Asunción de María",
              location: "Centro de Teocelo",
              p1: "Construida en el siglo XVI, esta iglesia es considerada un importante patrimonio histórico y cultural de la región. Su arquitectura destaca por su estilo barroco y neoclásico, con una fachada imponente y detalles ornamentales en su interior.",
              p2: "La parroquia alberga una gran cantidad de obras de arte religioso, como pinturas, esculturas y retablos, que reflejan la devoción y la fe de la comunidad. Además, es un lugar de encuentro para los fieles y un punto de referencia para los visitantes que desean conocer la riqueza cultural de Teocelo.",
            }}
          />
        </motion.div>
      </div>
    </div>
  );
}

export default TourismPage;
