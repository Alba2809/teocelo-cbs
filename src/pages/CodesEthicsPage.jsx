import { useExtaData } from "../context/ExtraDataContext";
import PDFViewer from "../components/PDFViewer";
import CodigoEtica from "../assets/PDFs/Codigo de Etica_0001.pdf";
import HeaderTittle from "../components/HeaderTittle";

function CodesEthicsPage() {
  const { isMobile } = useExtaData();
  const scalePDF = isMobile ? 0.5 : 1;
  return (
    <div>
      <div className="bg-white pt-6 pb-8 mt-5">
        <HeaderTittle title={"Código de ética"} />
        <div className="h-[750px] border border-black mx-20 mt-10">
          <PDFViewer document={CodigoEtica} scale={scalePDF} />
        </div>
      </div>
    </div>
  );
}

export default CodesEthicsPage;
