import { useExtaData } from "../context/ExtraDataContext";
import PDFViewer from "../components/PDFViewer";
import CodigoConducta from "../assets/PDFs/Codigo de Conducta_0001.pdf";
import HeaderTittle from "../components/HeaderTittle";

function CodesConductPage() {
  const { isMobile } = useExtaData();
  const scalePDF = isMobile ? 0.5 : 1;
  return (
    <div className="bg-white pt-6 pb-8 mt-5">
      <HeaderTittle title={"Código de conducta"} />
      <div className="h-[750px] border border-black mx-20 mt-10">
        <PDFViewer document={CodigoConducta} scale={scalePDF} />
      </div>
    </div>
  );
}

export default CodesConductPage;
