import HistoriaTA from "../assets/Photos/HistoriaTA.jpg";
import HistoriaTAC from "../assets/Photos/HistoriaTAC.jpg";
import HistoriaTAI from "../assets/Photos/HistoriaTAI.jpg";
import HistoriaTAP from "../assets/Photos/HistoriaTAP.jpg";
import { useEffect, useState } from "react";
import HeaderTittle from "../components/HeaderTittle";

function HistoryPage() {
  const smallImages = [
    { id: 2, src: HistoriaTAC, alt: "Teocelo antiguo - Carro" },
    { id: 3, src: HistoriaTAP, alt: "Teocelo antiguo - Piojito" },
    { id: 4, src: HistoriaTAI, alt: "Teocelo antiguo - Iglesia" },
  ];

  const [selectedImage, setSelectedImage] = useState({
    id: 1,
    src: HistoriaTA,
    alt: "Teocelo antiguo",
  });
  const [images, setImages] = useState(smallImages);

  const [isLoading, setIsLoading] = useState(false);
  const handleThumbnailClick = (imageId) => {
    if (isLoading) return;

    const clickedImage = images.find((image) => image.id === imageId);
    const indexImage = images.findIndex((image) => image.id === imageId);
    const updateImages = [...images];
    updateImages[indexImage] = selectedImage;

    document.getElementById(imageId).classList.add("animate-moveupdisappear");
    setIsLoading(true);

    const timer = setTimeout(() => {
      document
        .getElementById(imageId)
        .classList.remove("animate-moveupdisappear");

      setImages(updateImages);
      setIsLoading(false);
      setSelectedImage(clickedImage);
    }, 1000);

    return () => clearTimeout(timer);
  };

  useEffect(() => {
    document.getElementById("bigImage").classList.add("animate-fadeapper");
    const timer = setTimeout(() => {
      document.getElementById("bigImage").classList.remove("animate-fadeapper");
    }, 1000);

    return () => clearTimeout(timer);
  }, [selectedImage]);

  return (
    <div>
      <div className="bg-[#efeeee] pt-6 pb-8 mt-5 shadow-lg">
        <HeaderTittle title={"Historia de Teocelo, Veracruz, México"} />
        <div className="w-full">
          <div className="flex items-center justify-center mt-5">
            <img
              src={selectedImage.src}
              alt={selectedImage.alt}
              className="shadow-md shadow-[#b3b2b2] w-2/3 lg:w-1/2 h-[20em] lg:h-[35em] "
              id="bigImage"
            />
          </div>
          <div className="flex items-center justify-center mx-10 mt-5 gap-10">
            {images.map((image) => (
              <img
                key={image.id}
                src={image.src}
                alt={image.alt}
                className="shadow-md shadow-[#b3b2b2] w-1/4 h-28 lg:h-64 hover:scale-105 transition ease-in-out duration-300"
                onClick={() => handleThumbnailClick(image.id)}
                id={image.id}
              />
            ))}
          </div>
        </div>
      </div>
      <div className="px-40 lg:px-72 pt-10 text-justify tracking-wide font-normal text-xl leading-loose font-montserrat">
        <article>
          <p>
            Teocelo es un antiguo pueblo de origen prehispánico cuya fecha
            exacta de fundación es incierta. Sin embargo, numerosos vestigios
            arqueológicos en su territorio indican una ocupación ancestral. Se
            sabe que grupos influenciados por la cultura olmeca habitaron la
            zona durante el período Preclásico Superior (600 a 200 a.C.), y
            durante el Clásico Tardío (600 a 900 d.C.), se establecieron
            asentamientos de culturas regionales en el estado de Veracruz.
          </p>
          <p className="mt-5">
            En el contexto de la conquista azteca, Teocelo pasó a formar parte
            del Imperio Azteca, y en los años 1480 a 1486, grupos de Santa María
            Tetetla se establecieron en Teocelo, contribuyendo a su población.
            Se observa la influencia de las culturas Teochichimeca y Nahuatlaca,
            evidenciada por restos arqueológicos y nombres en náhuatl de lugares
            en la región, incluyendo el nombre del municipio.
          </p>
          <p className="mt-5">
            Con la llegada de los españoles, Teocelo se convirtió en una aldea
            que pertenecía al Señorío de Teoizhuacan (hoy Ixhuacán de los
            Reyes), que estaba bajo la jurisdicción del Imperio Azteca. Se
            produjo un conflicto entre los habitantes de Teocelo y los de
            Ixhuacán, ya que los primeros lucharon por su independencia y el
            derecho a elegir sus propias autoridades. A pesar de los intentos,
            la solicitud de independencia no tuvo éxito.
          </p>
          <p className="mt-5">
            No fue hasta el 17 de marzo de 1673 que el Virrey Antonio Sebastián
            de Toledo Marqués de Mancera emitió una cédula concediendo a los
            habitantes de Teocelo el derecho de elegir a sus propias autoridades
            indígenas, emancipándolos de la jurisdicción de Teoizhuacan. Esto
            marcó un antecedente importante en la formación del municipio de
            Teocelo.
          </p>
          <div>
            <p className="mt-5">
              En cuanto a la religión, los frailes franciscanos jugaron un papel
              fundamental en la evangelización de la región, encomendando a
              Teocelo al patronazgo de la Asunción de Nuestra Señora. Sin
              embargo, con el tiempo, fueron reemplazados por el clero secular.
              El obispo de Puebla, Manuel Fernández de la Santa Cruz, concedió a
              Teocelo la Vicaría Fija en 1683, lo que marcó el inicio de su
              autonomía religiosa.
            </p>
            <p className="mt-5">
              En el siglo XIX, Teocelo experimentó un desarrollo en la
              agricultura y la ganadería, lo que mejoró la estabilidad económica
              de la población. En 1808, el presbítero Andrés Domínguez introdujo
              el cultivo del café en la región, lo que marcó un hito en la
              producción de café en la zona. En 1811, Teocelo fue escenario de
              uno de los primeros pronunciamientos a favor de la Independencia
              de México.
            </p>
            <p className="mt-5">
              En 1824, Teocelo se convirtió en municipio en el estado de
              Veracruz. Durante el siglo XIX, se llevaron a cabo mejoras en la
              infraestructura, como la construcción de calles empedradas, el
              servicio de agua entubada, la introducción de energía eléctrica y
              la llegada del ferrocarril.
            </p>
            <p className="mt-5">
              El 3 de enero de 1920, un terremoto de 10 grados en la escala de
              Cancani afectó gravemente a Teocelo, causando daños en edificios y
              cobrando numerosas víctimas. La reconstrucción de la ciudad fue
              supervisada por el obispo Rafael Guizar y Valencia.
            </p>
          </div>
          <div>
            <p className="mt-5">
              En 1942, se inauguró una carretera que conecta Teocelo con Xalapa,
              y en 1958, Teocelo obtuvo el título de ciudad. El ferrocarril dejó
              de funcionar en 1945, marcando el final de una era en la historia
              de Teocelo.
            </p>
            <p className="mt-5">
              En 1955, Amelia Cerecedo se convirtió en la primera mujer en
              ocupar el cargo de presidenta municipal en Teocelo. En 1958, se
              fundó la Escuela Secundaria "Mtro. Manuel C. Tello," y Rubén Darío
              visitó la localidad en 1910.
            </p>
            <p className="mt-5">
              A lo largo de los años, Teocelo ha experimentado cambios
              significativos en su infraestructura, desarrollo económico y
              avances sociales, incluyendo la iniciativa pionera de separación
              de residuos sólidos y la construcción de una planta de
              lombricomposta en 2003, que le valió un Premio Nacional.
            </p>
          </div>
        </article>
      </div>
    </div>
  );
}

export default HistoryPage;
