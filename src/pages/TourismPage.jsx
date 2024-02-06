import { useExtaData } from "../context/ExtraDataContext";
import { motion } from "framer-motion";
import TourismComponent from "../components/home/Others/TourismComponent";
import HeaderTittle from "../components/HeaderTittle";
import Matlacobatl1 from "../assets/Photos/Tourism/Matlacobatl/Matlacobatl1.jpg"
import Matlacobatl2 from "../assets/Photos/Tourism/Matlacobatl/Matlacobatl2.jpg"
import Texolo1 from "../assets/Photos/Tourism/Texolo/Texolo1.jpg"
import Texolo2 from "../assets/Photos/Tourism/Texolo/Texolo2.jpg"
import Monja1 from "../assets/Photos/Tourism/LaMonja/Monja1.jpg"
import Monja2 from "../assets/Photos/Tourism/LaMonja/Monja2.jpg"
import Tezozontla1 from "../assets/Photos/Tourism/Tezozontla/Tezozontla1.jpg"
import Tezozontla2 from "../assets/Photos/Tourism/Tezozontla/Tezozontla2.jpg"
import Tocuapan1 from "../assets/Photos/Tourism/Tocuapan/Tocuapan1.jpg"
import Tocuapan2 from "../assets/Photos/Tourism/Tocuapan/Tocuapan2.jpg"
import Juntas1 from "../assets/Photos/Tourism/LasJuntas/Juntas1.jpg"
import Juntas2 from "../assets/Photos/Tourism/LasJuntas/Juntas2.jpg"
import Revolucion1 from "../assets/Photos/Tourism/Revolucion/Parque1.jpg"
import Revolucion2 from "../assets/Photos/Tourism/Revolucion/Parque2.jpg"
import Iglesia1 from "../assets/Photos/Tourism/LaAsunciondeMaria/Iglesia1.jpg"
import Iglesia2 from "../assets/Photos/Tourism/LaAsunciondeMaria/Iglesia2.jpg"
import Museo1 from "../assets/Photos/Tourism/Museocomunitario/Museo1.jpg"
import Museo2 from "../assets/Photos/Tourism/Museocomunitario/Museo2.jpg"

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
          animate={{ x: 0, opacity: 1, transition: { delay: 0.5 } }}
          whileHover={{ scale: 1.1 }}
          className="shadow-lg shadow-gray-400"
        >
          <TourismComponent
            data={{
              images: [Matlacobatl1, Matlacobatl2],
              imageAlt: "Matlacobatl",
              imageSide: "left",
              title: "Barranca “Matlacobatl”",
              location: "Entrada a Teocelo",
              texts: [
                "Este destino mágico te espera con los brazos abiertos, ofreciendo una exuberante diversidad de flora y fauna que deleitará tus sentidos. Sumérgete en la naturaleza y emprende emocionantes caminatas por sus senderos, los cuales te conducirán a paisajes impresionantes que te dejarán sin aliento.",
                "No olvides traer tu cámara porque cada rincón de la barranca es una oportunidad para capturar su majestuosidad, desde las alturas de sus acantilados hasta los rincones más recónditos cada experiencia será única y asombrosa.",
                "Déjate envolver por la belleza natural mientras te aventuras en este destino inolvidable. Sin duda la barranca Matlacobatl es el lugar perfecto para los amantes de la aventura que buscan una conexión auténtica con el entorno.",
              ],
            }}
          />
        </motion.div>
        <motion.div
          initial={{ x: -100, opacity: 0 }}
          animate={{ x: 0, opacity: 1, transition: { delay: 0.5 } }}
          whileHover={{ scale: 1.1 }}
          className="shadow-lg shadow-gray-400"
        >
          <TourismComponent
            data={{
              images: [Texolo1, Texolo2],
              imageAlt: "Texolo",
              imageSide: "right",
              title: "Cascada “Texolo”",
              location: "Santa Rosa",
              texts: [
                "Ubicada a tan solo 3 kilómetros al sur de Xico, en el hermoso estado de Veracruz, y a unos 19 kilómetros de la pintoresca ciudad de Xalapa, esta maravilla natural te dejará sin aliento. Con una impresionante altura que oscila entre los 18 y 24 metros, la cascada de Texolo ofrece una vista espectacular que te sumerge en la belleza de la naturaleza.",
                "Disfruta de la emoción al cruzar el puente sobre el barranco, conectando ambas partes del exuberante bosque que rodea esta joya natural. Del otro lado, serás recibido por dos encantadoras cascadas más pequeñas, que se asoman tímidamente entre la vegetación, añadiendo aún más encanto al entorno. Explora los senderos que serpentean a través de la zona y admira las vistas panorámicas que te ofrece este paraíso escondido en el corazón de Veracruz.",
              ],
            }}
          />
        </motion.div>
        <motion.div
          initial={{ x: -100, opacity: 0 }}
          animate={{ x: 0, opacity: 1, transition: { delay: 0.5 } }}
          whileHover={{ scale: 1.1 }}
          className="shadow-lg shadow-gray-400"
        >
          <TourismComponent
            data={{
              images: [Monja1, Monja2],
              imageAlt: "La Monja",
              imageSide: "left",
              title: "Cascada “La Monja”",
              location: "Santa Rosa",
              texts: [
                "A tan solo 800 metros de la majestuosa Cascada de Texolo, se encuentra una joya natural que cautiva a quienes se aventuran a descubrirla. Con una altura de unos 15 metros, esta cascada crea una encantadora fosa en su caída, ofreciéndote la oportunidad perfecta para refrescarte y disfrutar de la naturaleza en su esplendor.",
                "Ubicada entre densa vegetación, esta cascada se siente como un pequeño paraíso secreto, lejos del bullicio y cerca de la tranquilidad que tanto anhelas. Al llegar, te sumergirás en la sensación de estar descubriendo un tesoro oculto, rodeado de la belleza natural que solo este lugar puede ofrecer.",
                "Es importante tener en cuenta que el río puede ser peligroso, especialmente durante la época de lluvias. De hecho, su nombre guarda una triste historia del pasado, puesto que, en el siglo XX durante un paseo con varias niñas, una de ellas cayó al río y en un acto heroico, una valiente monja se lanzó al agua para intentar salvarla, pero lamentablemente ninguna de las dos pudo sobrevivir. Aunque este trágico incidente no ocurrió precisamente en la cascada, es importante tomar precauciones y respetar las indicaciones de seguridad en todo momento.",
              ],
            }}
          />
        </motion.div>
        <motion.div
          initial={{ x: -100, opacity: 0 }}
          animate={{ x: 0, opacity: 1, transition: { delay: 0.5 } }}
          whileHover={{ scale: 1.1 }}
          className="shadow-lg shadow-gray-400"
        >
          <TourismComponent
            data={{
              images: [Tezozontla1, Tezozontla2],
              imageAlt: "Tezozontla",
              imageSide: "right",
              title: "Cascada “Tezozontla”",
              location: "Monte Blanco",
              texts: [
                "Esta majestuosa cascada está ubicada en Monte Blanco, congregación de Teocelo y lugar reconocido por su producción de muebles de bambú. A solo 1 km de distancia (aproximadamente 30 minutos a pie) partiendo desde el campo deportivo de la localidad, se encuentra esta cascada, la cual es todo un tesoro natural esperando a ser explorado.",
                "El camino hacia la cascada ofrece una experiencia inolvidable, con un paisaje natural maravilloso que te dejará sin aliento. Podrás disfrutar de una gran variedad de flora y fauna mientras te adentras en la belleza de este entorno único.",
              ],
            }}
          />
        </motion.div>
        <motion.div
          initial={{ x: -100, opacity: 0 }}
          animate={{ x: 0, opacity: 1, transition: { delay: 0.5 } }}
          whileHover={{ scale: 1.1 }}
          className="shadow-lg shadow-gray-400"
        >
          <TourismComponent
            data={{
              images: [Tocuapan1, Tocuapan2],
              imageAlt: "Tocuapan",
              imageSide: "left",
              title: "Cascada “Tocuapan”",
              location: "Tejerías",
              texts: [
                "A tan solo 14 kilómetros de la pintoresca ciudad de Coatepec y a 6 kilómetros de Mahuixtlán, se encuentra esta impresionante cascada que te dejará maravillado con su esplendor. Con una caída de agua de 30 metros de altura, la Cascada Tocuapan es una joya única en su clase. Su base presenta un área circular peculiar, rodeada de paredes naturales asombrosas, creando un escenario inolvidable.",
                "Este paraíso natural es accesible a través de un sendero que, aunque no es demasiado exigente, requiere precaución debido al clima cálido predominante en la región. Durante el recorrido, podrás disfrutar de la vista de los extensos sembradíos de caña que caracterizan el paisaje.",
              ],
            }}
          />
        </motion.div>
        <motion.div
          initial={{ x: -100, opacity: 0 }}
          animate={{ x: 0, opacity: 1, transition: { delay: 0.5 } }}
          whileHover={{ scale: 1.1 }}
          className="shadow-lg shadow-gray-400"
        >
          <TourismComponent
            data={{
              images: [Juntas1, Juntas2],
              imageAlt: "Las juntas",
              imageSide: "right",
              title: "Río “Las juntas”",
              location: "Llano Grande",
              texts: [
                'Este encantador destino es el punto de partida para adentrarse en el maravilloso entorno de "Las Juntas". Siguiendo el camino de terracería conocido como "El espinazo del diablo", los viajeros serán guiados a este mágico lugar donde convergen los ríos Chico, Texolo y los Pescados.',
                "En este lugar natural, se deleitarán con la incomparable belleza del paisaje, mientras se sumergen en la tranquilidad que ofrece la naturaleza en su estado más puro. Además, tendrán la oportunidad de degustar los exquisitos camarones de río, capturados por hábiles pescadores locales y preparados con el auténtico toque campirano que realza su sabor único.",
              ],
            }}
          />
        </motion.div>
        <motion.div
          initial={{ x: -100, opacity: 0 }}
          animate={{ x: 0, opacity: 1, transition: { delay: 0.5 } }}
          whileHover={{ scale: 1.1 }}
          className="shadow-lg shadow-gray-400"
        >
          <TourismComponent
            data={{
              images: [Revolucion1, Revolucion2],
              imageAlt: "Revolución",
              imageSide: "left",
              title: "Parque “Revolución”",
              location: "Centro de Teocelo",
              texts: [
                "Sumérgete en la historia y la belleza de Teocelo explorando este emblemático parque cuyo origen se remonta a 1906, cuando comenzó a trazarse sobre el vasto llano que alguna vez albergó la antigua Plaza Mayor. Admirarás cómo todo su perímetro está embellecido con exquisitas losas de piedra gris cincelada, mientras que en sus extremos norte y sur se encuentran dos majestuosas fuentes de cantera, que añaden un toque de serenidad y frescura al entorno.",
                "Una de las joyas arquitectónicas de este espacio es el encantador kiosco de mampostería, cuya herrería fue traída directamente desde Bélgica y quedó completamente finalizado en 1908. Este kiosco no solo es un punto de reunión para los visitantes, sino también un testimonio vivo del esplendor pasado de la ciudad.",
                'No podemos hablar del Parque "Revolución" sin mencionar la obra maestra del renombrado artista papanteco Teodoro Cano: el impresionante mural que adorna la terraza noroeste del parque. Este magnífico mural, creado en la década de los sesenta del siglo XX, representa al Ocelote Divino y es una verdadera expresión del talento y la cultura de la región.',
              ],
            }}
          />
        </motion.div>
        <motion.div
          initial={{ x: -100, opacity: 0 }}
          animate={{ x: 0, opacity: 1, transition: { delay: 0.5 } }}
          whileHover={{ scale: 1.1 }}
          className="shadow-lg shadow-gray-400"
        >
          <TourismComponent
            data={{
              images: [Iglesia1, Iglesia2],
              imageAlt: "La Asunción de María",
              imageSide: "right",
              title: "Parroquia de “La Asunción de María”",
              location: "Centro de Teocelo",
              texts: [
                "Con una portada neoclásica que irradia elegancia y una columnata toscana-renacentista que emana majestuosidad en su interior, esta parroquia de Teocelo es una obra maestra del arte religioso en el estado de Veracruz. Sus airosas bóvedas románicas, adornadas con arcos ojivales, te sumergirán en una atmósfera de asombro y espiritualidad.",
                "Esta parroquia se sitúa en la zona central de Teocelo, justo frente al pintoresco kiosco de la localidad, esta joya arquitectónica te espera para revelarte sus secretos y su belleza sin igual.",
              ],
            }}
          />
        </motion.div>
        <motion.div
          initial={{ x: -100, opacity: 0 }}
          animate={{ x: 0, opacity: 1, transition: { delay: 0.5 } }}
          whileHover={{ scale: 1.1 }}
          className="shadow-lg shadow-gray-400"
        >
          <TourismComponent
            data={{
              images: [Museo1, Museo2],
              imageAlt: "Museo comunitario",
              imageSide: "left",
              title: "Museo comunitario de la Antigua Estación Ferroviaria.",
              location: "Teocelo",
              texts: [
                "Inaugurada el 1° de mayo de 1998, esta joya arquitectónica encuentra su hogar en la antigua terminal del ferrocarril Xalapa-Teocelo, que sirvió a la comunidad entre los años 1898 y 1944. Después del cese de operaciones en el ramal de Teocelo, la estación quedó en el olvido hasta quedar reducida a ruinas. Sin embargo, en 1997 el Ayuntamiento teocelense se embarcó en una tarea de restauración, devolviendo así a este emblemático edificio su esplendor original.",
                "Actualmente sus muros albergan el museo histórico de Teocelo, en donde podrás participar en diversas actividades que te transportarán al pasado: desde la exhibición de piezas originales hasta la proyección de películas históricas, pasando por presentaciones de libros, exposiciones temporales y enriquecedoras conferencias.",
              ],
            }}
          />
        </motion.div>
      </div>
    </div>
  );
}

export default TourismPage;
