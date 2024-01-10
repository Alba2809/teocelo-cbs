import { useExtaData } from "../context/ExtraDataContext";
import PDFViewer from "../components/PDFViewer";
import VersionPublicaPDF from "../assets/PDFs/VERSION PUBLICA.pdf";
import HeaderTittle from "../components/HeaderTittle";

function CircumstantialActPage() {
  const { isMobile } = useExtaData();
  const scalePDF = isMobile ? 0.5 : 1;
  return (
    <div className="bg-white pt-6 pb-8 mt-5 font-montserrat">
      <HeaderTittle title={"Acta circunstanciada de entrega y recepción"} />
      <div className="mx-10 lg:mx-52 mt-16">
        <h1 className="font-extrabold text-2xl">
          Con fundamento en el art. 25 de la ley 336 para la entrega y recepción
          del poder ejecutivo así como la administración publica y municipal que
          a la vista dice:
        </h1>
        <p className="font-bold text-xl text-[#6D1610] my-16 text-justify">
          El contenido del acta circunstanciada deberá ser difundido en los
          medios de comunicación disponibles, así como a través del portal de
          internet correspondiente, para su consulta por parte de cualquier
          interesado, sin mediar petición de por medio como lo establece la Ley
          de Transparencia y Acceso a la Información Pública para el Estado de
          Veracruz de Ignacio de la Llave.
        </p>
      </div>
      <div className="h-[750px] mx-20 mt-10">
        <PDFViewer document={VersionPublicaPDF} scale={scalePDF} />
      </div>
    </div>
  );
}

export default CircumstantialActPage;
