import { useExtaData } from "../context/ExtraDataContext";
import PDFViewer from "../components/PDFViewer";
import PAETeoceloPDF from "../assets/PDFs/PAE-2023-Teocelo.pdf";
import HeaderTittle from "../components/HeaderTittle";

function PAETeoceloPage() {
  const { isMobile } = useExtaData();
  const scalePDF = isMobile ? 0.5 : 1;
  return (
    <div className="bg-white pt-6 pb-8 mt-5">
      <HeaderTittle title={"Programa Anual de Evaluación 2023"} />
      <div className="h-[750px] mx-20 mt-10">
        <PDFViewer document={PAETeoceloPDF} scale={scalePDF} />
      </div>
    </div>
  );
}

export default PAETeoceloPage;
