import { useExtaData } from "../context/ExtraDataContext";
import PDFViewer from "../components/PDFViewer";
import EvaluationPDF from "../assets/PDFs/Evaluación de Desempeño FISM VF_TRANSPARENCIA.pdf";
import HeaderTittle from "../components/HeaderTittle";

function FISMEvaluationPage() {
  const { isMobile } = useExtaData();
  const scalePDF = isMobile ? 0.5 : 1;
  return (
    <div className="bg-white pt-6 pb-8 mt-5">
      <HeaderTittle title={"Evaluación de desempeño FISM"} />
      <div className="h-[750px] mx-20 mt-10">
        <PDFViewer document={EvaluationPDF} scale={scalePDF} />
      </div>
    </div>
  );
}

export default FISMEvaluationPage;
