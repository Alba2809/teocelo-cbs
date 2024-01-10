import { useExtaData } from "../context/ExtraDataContext";
import PDFViewer from "../components/PDFViewer";
import PMDTeoceloPDF from "../assets/PDFs/PMD-Teocelo-2022-2025.pdf";
import HeaderTittle from "../components/HeaderTittle";

function PMDTeoceloPage() {
  const { isMobile } = useExtaData();
  const scalePDF = isMobile ? 0.5 : 1;
  return (
    <div className="bg-white pt-6 pb-8 mt-5">
      <HeaderTittle title={"Plan Municipal de Desarrollo 2022 - 2025"} />
      <div className="h-[750px] mx-20 mt-10">
        <PDFViewer document={PMDTeoceloPDF} scale={scalePDF} />
      </div>
    </div>
  );
}

export default PMDTeoceloPage;
